"use client"

import { useRouter } from "next/navigation"
import { DataTable, type Column } from "@/components/app/data-table"
import { Badge } from "@/components/ui/badge"
import type { TurmaWithRelations, TurmaStatus } from "@/types/database"

const DAY_NAMES: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
}

function formatDays(days: number[] | null): string {
  if (!days || days.length === 0) return "—"
  return days
    .slice()
    .sort((a, b) => a - b)
    .map((d) => DAY_NAMES[d] ?? d)
    .join(", ")
}

function formatTime(time: string | null): string {
  if (!time) return "—"
  return time.slice(0, 5)
}

function formatSchedule(inicio: string | null, fim: string | null): string {
  if (!inicio) return "—"
  if (!fim) return formatTime(inicio)
  return `${formatTime(inicio)} – ${formatTime(fim)}`
}

const statusVariant: Record<TurmaStatus, "default" | "secondary" | "destructive" | "outline"> = {
  ativa: "default",
  inativa: "secondary",
  encerrada: "destructive",
}

const statusLabel: Record<TurmaStatus, string> = {
  ativa: "Ativa",
  inativa: "Inativa",
  encerrada: "Encerrada",
}

interface Props {
  turmas: TurmaWithRelations[]
}

export function TurmasClient({ turmas }: Props) {
  const router = useRouter()

  const columns: Column<TurmaWithRelations>[] = [
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "modalidade",
      header: "Modalidade",
      cell: (item) => item.modalidade?.nome ?? "—",
    },
    {
      key: "professor",
      header: "Professor",
      cell: (item) => item.professor?.pessoa?.nome_completo ?? "—",
    },
    {
      key: "dia_semana",
      header: "Dias da Semana",
      cell: (item) => formatDays(item.dia_semana),
    },
    {
      key: "horario",
      header: "Horário",
      cell: (item) => formatSchedule(item.horario_inicio, item.horario_fim),
    },
    {
      key: "vagas",
      header: "Vagas",
      cell: (item) => item.vagas != null ? String(item.vagas) : "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <Badge variant={statusVariant[item.status]}>
          {statusLabel[item.status]}
        </Badge>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={turmas}
      onRowClick={(item) => router.push(`/app/turmas/${item.id}`)}
      emptyMessage="Nenhuma turma cadastrada."
    />
  )
}
