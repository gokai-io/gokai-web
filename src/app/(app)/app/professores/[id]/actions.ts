"use server"

import { z } from "zod/v4"
import { createAdminClient } from "@/lib/supabase/admin"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"

const vincularSchema = z.object({
  professorPessoaId: z.uuid(),
  usuarioInternoId: z.uuid(),
})

interface ActionResult {
  success: boolean
  error?: string
}

export async function vincularUsuarioAoProfessor(
  input: z.input<typeof vincularSchema>
): Promise<ActionResult> {
  const me = await getServerUser()
  if (!me) return { success: false, error: "Não autenticado." }
  if (!isAdmin(me.role)) return { success: false, error: "Sem permissão." }

  const parsed = vincularSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: "Dados inválidos." }

  const { professorPessoaId, usuarioInternoId } = parsed.data
  const admin = createAdminClient()

  // 1. Carrega o usuario_interno alvo (com pessoa_id atual)
  const { data: ui, error: uiErr } = await admin
    .from("usuario_interno")
    .select("id, pessoa_id")
    .eq("id", usuarioInternoId)
    .maybeSingle()

  if (uiErr || !ui) {
    return { success: false, error: "Usuário interno não encontrado." }
  }

  // Já está vinculado? Nada a fazer.
  if (ui.pessoa_id === professorPessoaId) {
    return { success: true }
  }

  // 2. Garante que a pessoa do professor ainda não tem outro usuario_interno
  const { data: existing } = await admin
    .from("usuario_interno")
    .select("id")
    .eq("pessoa_id", professorPessoaId)
    .maybeSingle()

  if (existing) {
    return { success: false, error: "Este professor já tem um acesso vinculado." }
  }

  const oldPessoaId = ui.pessoa_id

  // 3. Aponta o usuario_interno para a pessoa do professor
  const { error: updateErr } = await admin
    .from("usuario_interno")
    .update({ pessoa_id: professorPessoaId })
    .eq("id", usuarioInternoId)

  if (updateErr) {
    return { success: false, error: `Erro ao vincular: ${updateErr.message}` }
  }

  // 4. Se a pessoa antiga ficou órfã (sem professor/aluno), remove
  const [{ data: orphanProf }, { data: orphanAluno }] = await Promise.all([
    admin.from("professor").select("id").eq("pessoa_id", oldPessoaId).maybeSingle(),
    admin.from("aluno").select("id").eq("pessoa_id", oldPessoaId).maybeSingle(),
  ])

  if (!orphanProf && !orphanAluno) {
    await admin.from("pessoa").delete().eq("id", oldPessoaId)
  }

  return { success: true }
}

const desvincularSchema = z.object({
  usuarioInternoId: z.uuid(),
  apagarAuthUser: z.boolean(),
})

export async function desvincularAcesso(
  input: z.input<typeof desvincularSchema>
): Promise<ActionResult> {
  const me = await getServerUser()
  if (!me) return { success: false, error: "Não autenticado." }
  if (!isAdmin(me.role)) return { success: false, error: "Sem permissão." }

  const parsed = desvincularSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: "Dados inválidos." }

  const { usuarioInternoId, apagarAuthUser } = parsed.data
  const admin = createAdminClient()

  const { data: ui } = await admin
    .from("usuario_interno")
    .select("id, auth_user_id")
    .eq("id", usuarioInternoId)
    .maybeSingle()

  if (!ui) return { success: false, error: "Usuário interno não encontrado." }

  const { error: delErr } = await admin
    .from("usuario_interno")
    .delete()
    .eq("id", usuarioInternoId)

  if (delErr) {
    return { success: false, error: `Erro ao desvincular: ${delErr.message}` }
  }

  if (apagarAuthUser && ui.auth_user_id) {
    // Também remove o auth user (senão fica órfão em auth.users)
    const { error: authErr } = await admin.auth.admin.deleteUser(ui.auth_user_id)
    if (authErr) {
      console.error("desvincularAcesso: auth delete failed", authErr)
      // Não retorna erro — o desvínculo principal funcionou
    }
  }

  return { success: true }
}
