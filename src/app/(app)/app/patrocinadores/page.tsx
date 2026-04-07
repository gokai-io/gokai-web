import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { PatrocinadoresClient } from "./patrocinadores-client"
import type { Patrocinador } from "@/types/database"

export default async function PatrocinadoresPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: patrocinadores } = await supabase
    .from("patrocinador")
    .select("*")
    .order("nivel", { ascending: true })
    .order("nome", { ascending: true })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Patrocinadores"
        description="Gerencie os patrocinadores da associação."
      >
        <Button render={<Link href="/app/patrocinadores/novo" />}>
          Novo Patrocinador
        </Button>
      </PageHeader>

      <PatrocinadoresClient patrocinadores={(patrocinadores ?? []) as Patrocinador[]} />
    </div>
  )
}
