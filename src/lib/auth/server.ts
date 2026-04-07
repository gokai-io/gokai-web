import { createClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import type { UserRole } from "@/types/database"

export interface ServerUser {
  id: string
  email: string
  role: UserRole
  pessoa_id: string
  nome_completo: string
}

const MOCK_USER: ServerUser = {
  id: "mock-dev-user",
  email: "dev@gokai.local",
  role: "presidente",
  pessoa_id: "mock-pessoa-id",
  nome_completo: "Dev Local (Presidente)",
}

export async function getServerUser(): Promise<ServerUser | null> {
  // Return mock user when Supabase is not configured (local dev)
  if (!isSupabaseConfigured()) {
    return MOCK_USER
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: usuario } = await supabase
    .from("usuario_interno")
    .select("*, pessoa(nome_completo)")
    .eq("auth_user_id", user.id)
    .eq("ativo", true)
    .single()

  if (!usuario) return null

  return {
    id: user.id,
    email: user.email!,
    role: usuario.role as UserRole,
    pessoa_id: usuario.pessoa_id,
    nome_completo: (usuario.pessoa as { nome_completo: string }).nome_completo,
  }
}
