import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { NovoEventoForm } from "./novo-evento-form"
import type { Modalidade } from "@/types/database"

export default async function NovoEventoPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: modalidades } = await supabase
    .from("modalidade")
    .select("*")
    .eq("ativa", true)
    .order("nome")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Evento"
        description="Cadastre um novo evento na associação."
      />
      <NovoEventoForm modalidades={(modalidades ?? []) as Modalidade[]} />
    </div>
  )
}
