"use server"

import { z } from "zod/v4"
import { createAdminClient } from "@/lib/supabase/admin"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"
import { SITE_URL } from "@/lib/seo"

const criarUsuarioSchema = z.object({
  nome_completo: z.string().min(3, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  role: z.enum([
    "presidente",
    "vice_presidente",
    "diretor_administrativo",
    "diretor_financeiro",
    "diretor_tecnico_esportivo",
    "professor",
  ]),
  password: z
    .string()
    .min(8, "Senha deve ter ao menos 8 caracteres")
    .optional()
    .or(z.literal("")),
})

interface ActionResult {
  success: boolean
  error?: string
  mode?: "invite" | "password"
}

export async function criarUsuarioComInvite(
  input: z.input<typeof criarUsuarioSchema>
): Promise<ActionResult> {
  // C1: Auth + RBAC check
  const user = await getServerUser()
  if (!user) {
    return { success: false, error: "Usuário não autenticado." }
  }
  if (!isAdmin(user.role)) {
    return { success: false, error: "Permissão insuficiente." }
  }

  // C2: Server-side Zod validation
  const parsed = criarUsuarioSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." }
  }

  const { nome_completo, email, role, password } = parsed.data
  const useManualPassword = typeof password === "string" && password.length >= 8
  const admin = createAdminClient()

  try {
    // 1. Check if usuario_interno already exists for this email
    const { data: existingPessoa } = await admin
      .from("pessoa")
      .select("id, usuario_interno:usuario_interno!inner(id)")
      .eq("email", email)
      .maybeSingle()

    if (existingPessoa?.usuario_interno) {
      return { success: false, error: "Já existe um usuário interno vinculado a este e-mail." }
    }

    // 2. Provisiona auth user — com recovery para órfãos:
    //    Se auth.users já tem esse e-mail (sem usuario_interno ligado),
    //    reusa o auth user em vez de falhar com "email already registered".
    let authUserId: string
    let reusedAuthUser = false

    const { data: listResult } = await admin.auth.admin.listUsers({
      perPage: 1000,
    })
    const existingAuth = listResult?.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    )

    if (existingAuth) {
      authUserId = existingAuth.id
      reusedAuthUser = true
      if (useManualPassword) {
        // Atualiza senha do auth user existente
        const { error: updErr } = await admin.auth.admin.updateUserById(
          existingAuth.id,
          { password, user_metadata: { nome_completo, role } }
        )
        if (updErr) {
          return {
            success: false,
            error: `Erro ao atualizar senha do usuário existente: ${updErr.message}`,
          }
        }
      }
      // Se for invite e o auth user já existe, pula o envio — ele já tem
      // login. Admin pode usar "esqueci a senha" no /login se precisar.
    } else if (useManualPassword) {
      const { data: authData, error: authError } =
        await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { nome_completo, role },
        })

      if (authError || !authData.user) {
        console.error("criarUsuarioComInvite: createUser failed", authError)
        return {
          success: false,
          error: `Erro ao criar usuário: ${authError?.message ?? "desconhecido"}`,
        }
      }
      authUserId = authData.user.id
    } else {
      const { data: authData, error: authError } =
        await admin.auth.admin.inviteUserByEmail(email, {
          redirectTo: `${SITE_URL}/api/auth/callback?next=/redefinir-senha`,
          data: { nome_completo, role },
        })

      if (authError) {
        console.error("criarUsuarioComInvite: auth invite failed", authError)
        return {
          success: false,
          error: `Erro ao enviar convite: ${authError.message}`,
        }
      }
      authUserId = authData.user.id
    }

    // 3. Create or reuse pessoa
    let pessoaId: string

    const { data: pessoa } = await admin
      .from("pessoa")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (pessoa) {
      pessoaId = pessoa.id
    } else {
      const { data: newPessoa, error: pessoaError } = await admin
        .from("pessoa")
        .insert({ nome_completo, email })
        .select("id")
        .single()

      if (pessoaError) {
        console.error("criarUsuarioComInvite: pessoa insert failed", pessoaError)
        if (!reusedAuthUser) await admin.auth.admin.deleteUser(authUserId)
        return { success: false, error: "Erro ao criar registro de pessoa." }
      }
      pessoaId = newPessoa.id
    }

    // 4. Create usuario_interno
    const { error: userError } = await admin.from("usuario_interno").insert({
      pessoa_id: pessoaId,
      auth_user_id: authUserId,
      role,
      ativo: true,
    })

    if (userError) {
      console.error("criarUsuarioComInvite: usuario_interno insert failed", userError)
      await admin.auth.admin.deleteUser(authUserId)
      return { success: false, error: "Erro ao criar usuário interno." }
    }

    return { success: true, mode: useManualPassword ? "password" : "invite" }
  } catch (err) {
    console.error("criarUsuarioComInvite: unexpected error", err)
    return { success: false, error: "Erro interno ao criar usuário." }
  }
}
