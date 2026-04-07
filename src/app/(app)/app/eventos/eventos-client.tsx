"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Evento, EventoTipo } from "@/types/database"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr))
}

const tipoLabel: Record<EventoTipo, string> = {
  campeonato: "Campeonato",
  seminario: "Seminário",
  treino_especial: "Treino Especial",
  social: "Social",
  outro: "Outro",
}

const tipoClassName: Record<EventoTipo, string> = {
  campeonato: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  seminario: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  treino_especial:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  social: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  outro: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

// ─── Component ────────────────────────────────────────────────────────────────

interface EventosClientProps {
  eventos: Evento[]
}

export function EventosClient({ eventos }: EventosClientProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<Evento | null>(null)

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("evento")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao excluir evento: ${error.message}`)
    } else {
      toast.success("Evento excluído com sucesso.")
      router.refresh()
    }
  }

  const columns: Column<Evento>[] = [
    {
      key: "titulo",
      header: "Título",
      cell: (item) => (
        <span className="font-medium">{item.titulo}</span>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      cell: (item) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tipoClassName[item.tipo]}`}
        >
          {tipoLabel[item.tipo]}
        </span>
      ),
    },
    {
      key: "data_inicio",
      header: "Data Início",
      cell: (item) => formatDate(item.data_inicio),
    },
    {
      key: "local",
      header: "Local",
      cell: (item) => item.local ?? "—",
    },
    {
      key: "publicado",
      header: "Publicado",
      cell: (item) => (
        <Badge variant={item.publicado ? "default" : "outline"}>
          {item.publicado ? "Sim" : "Não"}
        </Badge>
      ),
    },
    {
      key: "destaque",
      header: "Destaque",
      cell: (item) => (
        <Badge variant={item.destaque ? "default" : "outline"}>
          {item.destaque ? "Sim" : "Não"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      cell: (item) => (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation()
            setDeleteTarget(item)
          }}
        >
          <Trash2Icon className="text-destructive" />
          <span className="sr-only">Excluir</span>
        </Button>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={eventos}
        emptyMessage="Nenhum evento cadastrado."
        onRowClick={(item) => router.push(`/app/eventos/${item.id}`)}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Excluir Evento"
        description={`Tem certeza que deseja excluir o evento "${deleteTarget?.titulo}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
