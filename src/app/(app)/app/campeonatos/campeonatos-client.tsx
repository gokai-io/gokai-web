"use client"

import { useRouter } from "next/navigation"

import { DataTable, type Column } from "@/components/app/data-table"
import { Badge } from "@/components/ui/badge"
import type { CampeonatoWithRelations } from "@/types/database"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr))
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CampeonatosClientProps {
  campeonatos: CampeonatoWithRelations[]
}

export function CampeonatosClient({ campeonatos }: CampeonatosClientProps) {
  const router = useRouter()

  const columns: Column<CampeonatoWithRelations>[] = [
    {
      key: "titulo",
      header: "Título",
      cell: (item) => (
        <span className="font-medium">{item.evento?.titulo ?? item.nome}</span>
      ),
    },
    {
      key: "modalidade",
      header: "Modalidade",
      cell: (item) => item.modalidade?.nome ?? "—",
    },
    {
      key: "data",
      header: "Data",
      cell: (item) => formatDate(item.evento?.data_inicio ?? item.data),
    },
    {
      key: "local",
      header: "Local",
      cell: (item) => item.evento?.local ?? item.local ?? "—",
    },
    {
      key: "publicado",
      header: "Publicado",
      cell: (item) => (
        <Badge variant={item.evento?.publicado ? "default" : "outline"}>
          {item.evento?.publicado ? "Sim" : "Não"}
        </Badge>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={campeonatos}
      emptyMessage="Nenhum campeonato cadastrado."
      onRowClick={(item) => router.push(`/app/campeonatos/${item.id}`)}
    />
  )
}
