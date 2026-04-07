"use client"

import { useRouter } from "next/navigation"
import { DataTable, type Column } from "@/components/app/data-table"
import { Badge } from "@/components/ui/badge"
import type { Projeto, ProjetoTipo, ProjetoStatus } from "@/types/database"

const tipoLabel: Record<ProjetoTipo, string> = {
  social: "Social",
  esportivo: "Esportivo",
  educacional: "Educacional",
  outro: "Outro",
}

const statusLabel: Record<ProjetoStatus, string> = {
  planejamento: "Planejamento",
  ativo: "Ativo",
  concluido: "Concluído",
  cancelado: "Cancelado",
}

const statusClass: Record<ProjetoStatus, string> = {
  planejamento: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ativo: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  concluido: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

interface ProjetosClientProps {
  projetos: Projeto[]
}

export function ProjetosClient({ projetos }: ProjetosClientProps) {
  const router = useRouter()

  const columns: Column<Projeto>[] = [
    { key: "nome", header: "Nome", cell: (row) => row.nome },
    {
      key: "tipo",
      header: "Tipo",
      cell: (row) => <Badge variant="secondary">{tipoLabel[row.tipo]}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <Badge className={statusClass[row.status]}>{statusLabel[row.status]}</Badge>,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={projetos}
      onRowClick={(row) => router.push(`/app/projetos/${row.id}`)}
      emptyMessage="Nenhum projeto encontrado."
    />
  )
}
