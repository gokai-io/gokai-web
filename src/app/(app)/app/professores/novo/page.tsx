import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { NovoProfessorForm } from "./novo-professor-form"
import type { Modalidade } from "@/types/database"

export default async function NovoProfessorPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: modalidades } = await supabase
    .from("modalidade")
    .select("id, nome, slug")
    .eq("ativa", true)
    .order("ordem", { ascending: true })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Professor"
        description="Cadastre um novo professor na associação."
      />
      <NovoProfessorForm modalidades={(modalidades ?? []) as Modalidade[]} />
    </div>
  )
}
