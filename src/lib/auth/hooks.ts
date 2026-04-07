"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { UserRole } from "@/types/database"

interface AuthUser {
  id: string
  email: string
  role: UserRole
  pessoa_id: string
  nome_completo: string
  foto_url: string | null
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setUser(null)
          setLoading(false)
          return
        }

        const { data: usuario } = await supabase
          .from("usuario_interno")
          .select("*, pessoa(*)")
          .eq("auth_user_id", authUser.id)
          .eq("ativo", true)
          .single()

        if (usuario) {
          setUser({
            id: authUser.id,
            email: authUser.email!,
            role: usuario.role as UserRole,
            pessoa_id: usuario.pessoa_id,
            nome_completo: (usuario.pessoa as { nome_completo: string }).nome_completo,
            foto_url: (usuario.pessoa as { foto_url: string | null }).foto_url ?? null,
          })
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // supabase client is stable from createBrowserClient

  return { user, loading }
}
