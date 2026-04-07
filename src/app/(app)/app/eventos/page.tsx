import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { EventosClient } from "./eventos-client"
import type { Evento } from "@/types/database"

export default async function EventosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: eventos } = await supabase
    .from("evento")
    .select("*")
    .order("data_inicio", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Eventos"
        description="Gerencie os eventos da associação."
      >
        <Button render={<Link href="/app/eventos/novo" />}>
          Novo Evento
        </Button>
      </PageHeader>
      <EventosClient eventos={(eventos ?? []) as Evento[]} />
    </div>
  )
}
