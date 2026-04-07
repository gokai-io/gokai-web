"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import type { UserRole } from "@/types/database"

interface CriarUsuarioInput {
  nome_completo: string
  email: string
  role: UserRole
}

interface ActionResult {
  success: boolean
  error?: string
}

export async function criarUsuarioComInvite(
  input: CriarUsuarioInput
): Promise<ActionResult> {
  const { nome_completo, email, role } = input
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
    const { data: authData, error: authError } =
      await admin.auth.admin.inviteUserByEmail(email)

    if (authError) {
      return { success: false, error: `Erro ao enviar convite: ${authError.message}` }
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
        // Rollback auth user
        await admin.auth.admin.deleteUser(authData.user.id)
        return { success: false, error: `Erro ao criar pessoa: ${pessoaError.message}` }
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
      // Rollback
      await admin.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: `Erro ao criar usuário interno: ${userError.message}` }
    }

    return { success: true }
  } catch {
    return { success: false, error: "Erro interno ao criar usuário" }
  }
}
