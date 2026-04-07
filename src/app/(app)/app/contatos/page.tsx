import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { canAccess } from "@/lib/auth/permissions"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { ContatosClient } from "./contatos-client"
import type { Contato } from "@/types/database"

export default async function ContatosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")
  if (!canAccess(user.role, "contatos")) redirect("/app/dashboard")

  const supabase = await createClient()
  const { data: contatos } = await supabase
    .from("contato")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Contatos"
        description="Mensagens recebidas pelo formulário de contato do site."
      />
      <ContatosClient contatos={(contatos ?? []) as Contato[]} />
    </div>
  )
}
