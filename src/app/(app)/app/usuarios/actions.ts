"use server"

import { z } from "zod/v4"
import { createAdminClient } from "@/lib/supabase/admin"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"

const excluirSchema = z.object({
  usuarioInternoId: z.uuid(),
})

interface ActionResult {
  success: boolean
  error?: string
}

/**
 * Remove usuario_interno E o auth.users correspondente.
 * Sem isso, o e-mail fica "preso" no Supabase Auth e não dá pra
 * recriar o usuário com o mesmo endereço.
 */
export async function excluirUsuarioCompleto(
  input: z.input<typeof excluirSchema>
): Promise<ActionResult> {
  const me = await getServerUser()
  if (!me) return { success: false, error: "Não autenticado." }
  if (!isAdmin(me.role)) return { success: false, error: "Sem permissão." }

  const parsed = excluirSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: "Dados inválidos." }

  const admin = createAdminClient()

  const { data: ui } = await admin
    .from("usuario_interno")
    .select("id, auth_user_id")
    .eq("id", parsed.data.usuarioInternoId)
    .maybeSingle()

  if (!ui) return { success: false, error: "Usuário não encontrado." }

  const { error: delErr } = await admin
    .from("usuario_interno")
    .delete()
    .eq("id", parsed.data.usuarioInternoId)

  if (delErr) {
    return { success: false, error: `Erro ao excluir: ${delErr.message}` }
  }

  if (ui.auth_user_id) {
    // shouldSoftDelete=false (hard delete) para liberar o e-mail
    const { error: authErr } = await admin.auth.admin.deleteUser(
      ui.auth_user_id,
      false
    )
    if (authErr) {
      console.error("excluirUsuarioCompleto: auth delete failed", authErr)
    }
  }

  return { success: true }
}
