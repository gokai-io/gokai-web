import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { TurmaForm } from "../[id]/turma-form"
import type { Modalidade, ProfessorWithPessoa } from "@/types/database"

export default async function NovaTurmaPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()

  const [{ data: modalidades }, { data: professores }] = await Promise.all([
    supabase.from("modalidade").select("*").eq("ativa", true).order("nome"),
    supabase.from("professor").select("*, pessoa(nome_completo)").eq("status", "ativo").order("id"),
  ])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Nova Turma" description="Preencha os dados para criar uma nova turma.">
        <Button variant="outline" render={<Link href="/app/turmas" />}>
          Voltar
        </Button>
      </PageHeader>
      <TurmaForm
        modalidades={(modalidades ?? []) as Modalidade[]}
        professores={(professores ?? []) as unknown as ProfessorWithPessoa[]}
      />
    </div>
  )
}
