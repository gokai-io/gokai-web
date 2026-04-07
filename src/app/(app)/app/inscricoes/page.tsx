import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { InscricoesClient } from "./inscricoes-client"
import type { Inscricao } from "@/types/database"

export default async function InscricoesPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: inscricoes } = await supabase
    .from("inscricao")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inscrições"
        description="Gerencie as solicitações de inscrição recebidas."
      />
      <InscricoesClient inscricoes={(inscricoes ?? []) as Inscricao[]} />
    </div>
  )
}
