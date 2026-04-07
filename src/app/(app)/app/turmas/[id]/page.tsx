import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TurmaForm } from "./turma-form"
import { TurmaAlunosSection } from "./turma-alunos-section"
import type { Modalidade, ProfessorWithPessoa, TurmaWithRelations } from "@/types/database"

interface Props {
  params: Promise<{ id: string }>
}

export default async function TurmaDetailPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()

  const [{ data: turma }, { data: modalidades }, { data: professores }, { data: alunoTurmas }] =
    await Promise.all([
      supabase
        .from("turma")
        .select("*, modalidade(nome), professor(*, pessoa(nome_completo))")
        .eq("id", id)
        .single(),
      supabase.from("modalidade").select("*").eq("ativa", true).order("nome"),
      supabase
        .from("professor")
        .select("*, pessoa(nome_completo)")
        .eq("status", "ativo")
        .order("id"),
      supabase
        .from("aluno_turma")
        .select("*, aluno(*, pessoa(nome_completo, email))")
        .eq("turma_id", id)
        .order("created_at", { ascending: false }),
    ])

  if (!turma) notFound()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={turma.nome}
        description="Edite os dados da turma ou gerencie os alunos matriculados."
      >
        <Button variant="outline" render={<Link href="/app/turmas" />}>
          Voltar
        </Button>
      </PageHeader>

      <TurmaForm
        turma={turma as unknown as TurmaWithRelations}
        modalidades={(modalidades ?? []) as Modalidade[]}
        professores={(professores ?? []) as unknown as ProfessorWithPessoa[]}
      />

      <Separator />

      <TurmaAlunosSection
        turmaId={id}
        alunoTurmas={(alunoTurmas ?? []) as unknown as any[]}
      />
    </div>
  )
}
