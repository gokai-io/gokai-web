"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { KeyRoundIcon, Trash2Icon } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { criarUsuarioComInvite } from "@/app/(app)/app/usuarios/novo/actions"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProfessorWithPessoa } from "@/types/database"

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    ativo: "Ativo",
    inativo: "Inativo",
    licenciado: "Licenciado",
  }
  return map[status] ?? status
}

function statusVariant(
  status: string
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "ativo") return "default"
  if (status === "licenciado") return "secondary"
  return "outline"
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ProfessoresClientProps {
  professores: ProfessorWithPessoa[]
}

export function ProfessoresClient({ professores }: ProfessoresClientProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<ProfessorWithPessoa | null>(
    null
  )
  const [accessTarget, setAccessTarget] = useState<ProfessorWithPessoa | null>(null)
  const [accessRole, setAccessRole] = useState<string>("professor")
  const [creatingAccess, setCreatingAccess] = useState(false)

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()

    const { error: profError } = await supabase
      .from("professor")
      .delete()
      .eq("id", deleteTarget.id)

    if (profError) {
      toast.error(`Erro ao excluir professor: ${profError.message}`)
      return
    }

    const { error: pessoaError } = await supabase
      .from("pessoa")
      .delete()
      .eq("id", deleteTarget.pessoa_id)

    if (pessoaError) {
      toast.error(`Erro ao excluir dados pessoais: ${pessoaError.message}`)
      return
    }

    toast.success("Professor excluído com sucesso.")
    router.refresh()
  }

  const columns: Column<ProfessorWithPessoa>[] = [
    {
      key: "foto",
      header: "Foto",
      cell: (item) => {
        const initials = item.pessoa.nome_completo
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toUpperCase()

        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {initials}
          </div>
        )
      },
      className: "w-12",
    },
    {
      key: "nome",
      header: "Nome",
      cell: (item) => (
        <span className="font-medium">{item.pessoa.nome_completo}</span>
      ),
    },
    {
      key: "especialidades",
      header: "Especialidades",
      cell: (item) => {
        const especialidades = item.especialidades ?? []
        if (especialidades.length === 0)
          return <span className="text-muted-foreground">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {especialidades.slice(0, 3).map((esp) => (
              <Badge key={esp} variant="secondary">
                {esp}
              </Badge>
            ))}
            {especialidades.length > 3 && (
              <Badge variant="outline">+{especialidades.length - 3}</Badge>
            )}
          </div>
        )
      },
    },
    {
      key: "graduacao",
      header: "Graduação",
      cell: (item) => (
        <span>{item.graduacao ?? <span className="text-muted-foreground">—</span>}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <Badge variant={statusVariant(item.status)}>
          {statusLabel(item.status)}
        </Badge>
      ),
    },
    {
      key: "exibir_site",
      header: "Exibir no Site",
      cell: (item) => (
        <Badge variant={item.exibir_site ? "default" : "outline"}>
          {item.exibir_site ? "Sim" : "Não"}
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
        data={professores}
        emptyMessage="Nenhum professor cadastrado."
        onRowClick={(item) => router.push(`/app/professores/${item.id}`)}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Excluir Professor"
        description={`Tem certeza que deseja excluir o professor "${deleteTarget?.pessoa.nome_completo}"? Esta ação removerá todos os dados associados e não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
