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
import type { DocumentoTipo } from "@/types/database"

const tipoLabel: Record<DocumentoTipo, string> = {
  boletim_escolar: "Boletim Escolar",
  comprovante_matricula: "Comprov. Matrícula",
  comprovante_trabalho: "Comprov. Trabalho",
  historico_escolar: "Histórico Escolar",
  outro: "Outro",
}

interface DocumentoRow {
  id: string
  tipo: DocumentoTipo
  arquivo_url: string
  data_upload: string
  validado: boolean
  aluno?: { id: string; pessoa?: { nome_completo: string } }
}

interface DocumentosClientProps {
  documentos: DocumentoRow[]
}

export function DocumentosClient({ documentos }: DocumentosClientProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("documento_comprobatorio").delete().eq("id", id)
    if (error) {
      toast.error("Erro ao excluir documento")
    } else {
      toast.success("Documento excluído")
      router.refresh()
    }
    setDeleteId(null)
  }

  const columns: Column<DocumentoRow>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (row) => row.aluno?.pessoa?.nome_completo ?? "—",
    },
    {
      key: "tipo",
      header: "Tipo",
      cell: (row) => <Badge variant="secondary">{tipoLabel[row.tipo]}</Badge>,
    },
    {
      key: "data_upload",
      header: "Data Upload",
      cell: (row) => new Intl.DateTimeFormat("pt-BR").format(new Date(row.data_upload)),
    },
    {
      key: "validado",
      header: "Validado",
      cell: (row) => (
        <Badge variant={row.validado ? "default" : "secondary"}>
          {row.validado ? "Sim" : "Não"}
        </Badge>
      ),
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
      <DataTable columns={columns} data={documentos} emptyMessage="Nenhum documento encontrado." />
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Excluir documento?"
        description="Esta ação não pode ser desfeita."
        onConfirm={() => { if (deleteId) handleDelete(deleteId) }}
      />
    </>
  )
}
