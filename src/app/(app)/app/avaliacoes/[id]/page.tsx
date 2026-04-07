import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import type { AvaliacaoEvolucao } from "@/types/database"

interface Props {
  params: Promise<{ id: string }>
}

export default async function AvaliacaoDetailPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: avaliacao } = await supabase
    .from("avaliacao_evolucao")
    .select("*, aluno(id, pessoa(nome_completo))")
    .eq("id", id)
    .single()

  if (!avaliacao) notFound()

  const av = avaliacao as AvaliacaoEvolucao & { aluno?: { pessoa?: { nome_completo: string } } }
  const nomeAluno = (av as any).aluno?.pessoa?.nome_completo ?? "Aluno"

  function renderNota(label: string, value: number | null) {
    return (
      <div className="flex justify-between border-b border-border py-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value != null ? value : "—"}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Avaliação — ${nomeAluno}`}
        description={`Período: ${av.periodo}`}
      >
        <Button variant="outline" render={<Link href="/app/avaliacoes" />}>
          Voltar
        </Button>
      </PageHeader>

      <div className="max-w-md rounded-lg border border-border p-6">
        {renderNota("Comportamento", av.comportamento)}
        {renderNota("Disciplina", av.disciplina)}
        {renderNota("Frequência", av.frequencia)}
        {renderNota("Desempenho", av.desempenho)}
        {av.observacoes && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Observações</p>
            <p className="mt-1 text-sm">{av.observacoes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
