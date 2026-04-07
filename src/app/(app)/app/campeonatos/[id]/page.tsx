import { notFound, redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { CampeonatoDetail } from "./campeonato-detail"
import type { CampeonatoWithRelations, AlunoWithPessoa } from "@/types/database"

interface CampeonatoDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CampeonatoDetailPage({
  params,
}: CampeonatoDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params
  const supabase = await createClient()

  const [{ data: campeonato }, { data: alunos }] = await Promise.all([
    supabase
      .from("campeonato")
      .select(
        "*, evento(*), modalidade(*), campeonato_participante(*, aluno(*, pessoa(*)))"
      )
      .eq("id", id)
      .single(),
    supabase
      .from("aluno")
      .select("*, pessoa(*)")
      .eq("status", "ativo")
      .order("id"),
  ])

  if (!campeonato) notFound()

  // Normalize participantes key from supabase join name
  const campeonatoNormalized = {
    ...campeonato,
    participantes: (campeonato as Record<string, unknown>)["campeonato_participante"] ?? [],
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={campeonato.evento?.titulo ?? campeonato.nome}
        description="Detalhes e participantes do campeonato."
      />
      <CampeonatoDetail
        campeonato={campeonatoNormalized as unknown as CampeonatoWithRelations}
        alunosDisponiveis={(alunos ?? []) as unknown as AlunoWithPessoa[]}
      />
    </div>
  )
}
