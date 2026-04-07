import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { ModalidadesClient } from "./modalidades-client"
import type { Modalidade } from "@/types/database"

export default async function ModalidadesPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: modalidades } = await supabase
    .from("modalidade")
    .select("*")
    .order("ordem", { ascending: true })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Modalidades" description="Gerencie as modalidades oferecidas pela associação." />
      <ModalidadesClient modalidades={(modalidades ?? []) as Modalidade[]} />
    </div>
  )
}
