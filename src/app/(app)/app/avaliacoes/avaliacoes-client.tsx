"use client"

import { useRouter } from "next/navigation"
import { DataTable, type Column } from "@/components/app/data-table"

interface AvaliacaoRow {
  id: string
  periodo: string
  comportamento: number | null
  disciplina: number | null
  frequencia: number | null
  desempenho: number | null
  aluno?: { id: string; pessoa?: { nome_completo: string } }
}

interface AvaliacoesClientProps {
  avaliacoes: AvaliacaoRow[]
}

function formatNota(n: number | null): string {
  return n != null ? String(n) : "—"
}

export function AvaliacoesClient({ avaliacoes }: AvaliacoesClientProps) {
  const router = useRouter()

  const columns: Column<AvaliacaoRow>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (row) => row.aluno?.pessoa?.nome_completo ?? "—",
    },
    { key: "periodo", header: "Período", cell: (row) => row.periodo },
    { key: "comportamento", header: "Comport.", cell: (row) => formatNota(row.comportamento) },
    { key: "disciplina", header: "Disciplina", cell: (row) => formatNota(row.disciplina) },
    { key: "frequencia", header: "Frequência", cell: (row) => formatNota(row.frequencia) },
    { key: "desempenho", header: "Desempenho", cell: (row) => formatNota(row.desempenho) },
  ]

  return (
    <DataTable
      columns={columns}
      data={avaliacoes}
      onRowClick={(row) => router.push(`/app/avaliacoes/${row.id}`)}
      emptyMessage="Nenhuma avaliação registrada."
    />
  )
}
