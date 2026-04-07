import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { CampeonatosClient } from "./campeonatos-client"
import type { CampeonatoWithRelations } from "@/types/database"

export default async function CampeonatosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: campeonatos } = await supabase
    .from("campeonato")
    .select("*, evento(*), modalidade(*)")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Campeonatos"
        description="Visualize e gerencie os campeonatos da associação."
      />
      <CampeonatosClient
        campeonatos={(campeonatos ?? []) as unknown as CampeonatoWithRelations[]}
      />
    </div>
  )
}
