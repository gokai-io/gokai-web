"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2Icon, FileTextIcon } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Transparencia } from "@/types/database"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tipoLabel: Record<Transparencia["tipo"], string> = {
  ata: "Ata",
  balanco: "Balanço",
  relatorio: "Relatório",
  estatuto: "Estatuto",
  outro: "Outro",
}

function TipoBadge({ tipo }: { tipo: Transparencia["tipo"] }) {
  const classMap: Record<Transparencia["tipo"], string> = {
    ata: "border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    balanco: "border-green-400 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    relatorio: "border-purple-400 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    estatuto: "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    outro: "border-gray-400 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
  }

  return (
    <Badge variant="outline" className={classMap[tipo]}>
      {tipoLabel[tipo]}
    </Badge>
  )
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "long",
})

// ─── Props ────────────────────────────────────────────────────────────────────

interface TransparenciaClientProps {
  registros: Transparencia[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TransparenciaClient({ registros }: TransparenciaClientProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<Transparencia | null>(null)

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("transparencia")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao excluir documento: ${error.message}`)
    } else {
      toast.success("Documento excluído com sucesso.")
      router.refresh()
    }
  }

  const columns: Column<Transparencia>[] = [
    {
      key: "titulo",
      header: "Título",
    },
    {
      key: "tipo",
      header: "Tipo",
      cell: (item) => <TipoBadge tipo={item.tipo} />,
    },
    {
      key: "origem",
      header: "Disponível",
      cell: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.conteudo && <Badge variant="outline">Texto</Badge>}
          {item.arquivo_url && <Badge variant="secondary">Arquivo</Badge>}
        </div>
      ),
    },
    {
      key: "data_referencia",
      header: "Data de Referência",
      cell: (item) => {
        try {
          // data_referencia is a date string like "2024-01-01"; append T00:00 to avoid TZ shift
          const date = new Date(`${item.data_referencia}T00:00:00`)
          return dateFormatter.format(date)
        } catch {
          return item.data_referencia
        }
      },
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
      key: "actions",
      header: "Ações",
      cell: (item) => (
        <div className="flex items-center gap-1">
          {item.arquivo_url && (
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                window.open(item.arquivo_url!, "_blank", "noopener,noreferrer")
              }}
            >
              <FileTextIcon className="size-4" />
              <span className="sr-only">Ver arquivo</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setDeleteTarget(item)
            }}
          >
            <Trash2Icon className="size-4 text-destructive" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={registros}
        emptyMessage="Nenhum documento cadastrado."
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Excluir Documento"
        description={`Tem certeza que deseja excluir o documento "${deleteTarget?.titulo}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
