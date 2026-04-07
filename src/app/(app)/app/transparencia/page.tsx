import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { TransparenciaClient } from "./transparencia-client"
import type { Transparencia } from "@/types/database"

export default async function TransparenciaPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: registros } = await supabase
    .from("transparencia")
    .select("*")
    .order("data_referencia", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transparência"
        description="Documentos públicos da associação para consulta dos associados."
      >
        <Button render={<Link href="/app/transparencia/novo" />}>
          Novo Documento
        </Button>
      </PageHeader>

      <TransparenciaClient registros={(registros ?? []) as Transparencia[]} />
    </div>
  )
}
