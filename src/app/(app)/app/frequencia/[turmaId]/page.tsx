import { redirect, notFound } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { FrequenciaClient } from "./frequencia-client"
import type { TurmaWithRelations, AlunoWithPessoa } from "@/types/database"

interface PageProps {
  params: Promise<{ turmaId: string }>
}

export default async function FrequenciaTurmaPage({ params }: PageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { turmaId } = await params
  const supabase = await createClient()

  // Fetch turma with relations
  const { data: turma } = await supabase
    .from("turma")
    .select("*, modalidade(*), professor(*, pessoa(*))")
    .eq("id", turmaId)
    .single()

  if (!turma) notFound()

  // Fetch enrolled active students
  const { data: alunoTurmas } = await supabase
    .from("aluno_turma")
    .select("*, aluno(*, pessoa(*))")
    .eq("turma_id", turmaId)
    .eq("status", "ativo")
    .order("aluno(pessoa(nome_completo))", { ascending: true })

  const alunos: AlunoWithPessoa[] = (alunoTurmas ?? []).map(
    (at: { aluno: AlunoWithPessoa }) => at.aluno
  )

  return (
    <FrequenciaClient
      turma={turma as unknown as TurmaWithRelations}
      alunos={alunos}
    />
  )
}
