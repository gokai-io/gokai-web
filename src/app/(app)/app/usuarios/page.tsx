import { redirect } from "next/navigation"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { UsuariosClient } from "./usuarios-client"
import type { UsuarioInternoWithPessoa } from "@/types/database"

export default async function UsuariosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")
  if (!isAdmin(user.role)) redirect("/app/dashboard")

  const supabase = await createClient()
  const { data: usuarios } = await supabase
    .from("usuario_interno")
    .select("*, pessoa(*)")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários internos do sistema."
      >
        <Button render={<Link href="/app/usuarios/novo" />}>
          <PlusIcon />
          Novo Usuário
        </Button>
      </PageHeader>
      <UsuariosClient usuarios={(usuarios ?? []) as UsuarioInternoWithPessoa[]} />
    </div>
  )
}
