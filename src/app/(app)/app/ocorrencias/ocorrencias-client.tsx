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
import type { OcorrenciaTipo } from "@/types/database"

const tipoLabel: Record<OcorrenciaTipo, string> = {
  advertencia: "Advertência",
  suspensao: "Suspensão",
  exclusao: "Exclusão",
}

const tipoClass: Record<OcorrenciaTipo, string> = {
  advertencia: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  suspensao: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  exclusao: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

interface OcorrenciaRow {
  id: string
  tipo: OcorrenciaTipo
  motivo: string
  data: string
  aluno?: { id: string; pessoa?: { nome_completo: string } }
}

interface OcorrenciasClientProps {
  ocorrencias: OcorrenciaRow[]
}

export function OcorrenciasClient({ ocorrencias }: OcorrenciasClientProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("ocorrencia_disciplinar").delete().eq("id", id)
    if (error) {
      toast.error("Erro ao excluir ocorrência")
    } else {
      toast.success("Ocorrência excluída")
      router.refresh()
    }
    setDeleteId(null)
  }

  const columns: Column<OcorrenciaRow>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (row) => row.aluno?.pessoa?.nome_completo ?? "—",
    },
    {
      key: "tipo",
      header: "Tipo",
      cell: (row) => <Badge className={tipoClass[row.tipo]}>{tipoLabel[row.tipo]}</Badge>,
    },
    {
      key: "motivo",
      header: "Motivo",
      cell: (row) => (
        <span className="line-clamp-1 max-w-xs">{row.motivo}</span>
      ),
    },
    {
      key: "data",
      header: "Data",
      cell: (row) => new Intl.DateTimeFormat("pt-BR").format(new Date(row.data)),
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.id)}>
          <Trash2Icon className="size-4" />
        </Button>
      ),
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={ocorrencias} emptyMessage="Nenhuma ocorrência registrada." />
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Excluir ocorrência?"
        description="Esta ação não pode ser desfeita."
        onConfirm={() => { if (deleteId) handleDelete(deleteId) }}
      />
    </>
  )
}
