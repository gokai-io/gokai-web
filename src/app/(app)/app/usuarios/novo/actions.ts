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
})

interface ActionResult {
  success: boolean
  error?: string
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

  const { nome_completo, email, role } = parsed.data
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

    // 2. Invite user by email (sends magic link automatically)
    //    redirectTo precisa ser uma URL whitelisted em Supabase → Authentication
    //    → URL Configuration → Redirect URLs. Após clicar no link, o usuário
    //    passa pelo callback (troca code por session) e é levado a /redefinir-senha.
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
        await admin.auth.admin.deleteUser(authData.user.id)
        return { success: false, error: "Erro ao criar registro de pessoa." }
      }
      pessoaId = newPessoa.id
    }

    // 4. Create usuario_interno
    const { error: userError } = await admin.from("usuario_interno").insert({
      pessoa_id: pessoaId,
      auth_user_id: authData.user.id,
      role,
      ativo: true,
    })

    if (userError) {
      console.error("criarUsuarioComInvite: usuario_interno insert failed", userError)
      await admin.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: "Erro ao criar usuário interno." }
    }

    return { success: true }
  } catch (err) {
    console.error("criarUsuarioComInvite: unexpected error", err)
    return { success: false, error: "Erro interno ao criar usuário." }
  }
}
