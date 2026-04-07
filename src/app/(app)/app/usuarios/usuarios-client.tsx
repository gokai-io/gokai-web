"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { PencilIcon, Trash2Icon } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { UsuarioInternoWithPessoa, UserRole } from "@/types/database"

// ─── Constants ────────────────────────────────────────────────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  presidente: "Presidente",
  vice_presidente: "Vice-Presidente",
  diretor_administrativo: "Diretor Administrativo",
  diretor_financeiro: "Diretor Financeiro",
  diretor_tecnico_esportivo: "Diretor Técnico-Esportivo",
  professor: "Professor",
}

const ROLE_BADGE_VARIANT: Record<UserRole, "default" | "secondary" | "outline"> = {
  presidente: "default",
  vice_presidente: "default",
  diretor_administrativo: "secondary",
  diretor_financeiro: "secondary",
  diretor_tecnico_esportivo: "secondary",
  professor: "outline",
}

const ROLES: UserRole[] = [
  "presidente",
  "vice_presidente",
  "diretor_administrativo",
  "diretor_financeiro",
  "diretor_tecnico_esportivo",
  "professor",
]

// ─── Schema ───────────────────────────────────────────────────────────────────

const editSchema = z.object({
  role: z.enum(["presidente", "vice_presidente", "diretor_administrativo", "diretor_financeiro", "diretor_tecnico_esportivo", "professor"]),
  ativo: z.boolean(),
})

type EditFormValues = z.infer<typeof editSchema>

// ─── Component ────────────────────────────────────────────────────────────────

interface UsuariosClientProps {
  usuarios: UsuarioInternoWithPessoa[]
}

export function UsuariosClient({ usuarios: initialUsuarios }: UsuariosClientProps) {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState(initialUsuarios)
  const [editTarget, setEditTarget] = useState<UsuarioInternoWithPessoa | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<UsuarioInternoWithPessoa | null>(null)
  const [saving, setSaving] = useState(false)

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      role: "professor",
      ativo: true,
    },
  })

  function openEdit(usuario: UsuarioInternoWithPessoa) {
    setEditTarget(usuario)
    form.reset({
      role: usuario.role as UserRole,
      ativo: usuario.ativo,
    })
  }

  async function onSubmit(values: EditFormValues) {
    if (!editTarget) return
    setSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("usuario_interno")
        .update({ role: values.role, ativo: values.ativo })
        .eq("id", editTarget.id)

      if (error) throw error

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editTarget.id ? { ...u, role: values.role, ativo: values.ativo } : u
        )
      )
      toast.success("Usuário atualizado com sucesso.")
      setEditTarget(null)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao atualizar usuário: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("usuario_interno")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao excluir usuário: ${error.message}`)
    } else {
      setUsuarios((prev) => prev.filter((u) => u.id !== deleteTarget.id))
      toast.success("Usuário excluído com sucesso.")
      router.refresh()
    }
  }

  const roleValue = form.watch("role")
  const ativoValue = form.watch("ativo")

  const columns: Column<UsuarioInternoWithPessoa>[] = [
    {
      key: "nome",
      header: "Nome",
      cell: (item) => (
        <span className="font-medium">{item.pessoa.nome_completo}</span>
      ),
    },
    {
      key: "email",
      header: "E-mail",
      className: "hidden md:table-cell",
      cell: (item) => item.pessoa.email ?? "—",
    },
    {
      key: "role",
      header: "Cargo",
      cell: (item) => (
        <Badge variant={ROLE_BADGE_VARIANT[item.role as UserRole]}>
          {ROLE_LABELS[item.role as UserRole] ?? item.role}
        </Badge>
      ),
    },
    {
      key: "ativo",
      header: "Status",
      cell: (item) => (
        <Badge variant={item.ativo ? "default" : "outline"}>
          {item.ativo ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      cell: (item) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              openEdit(item)
            }}
          >
            <PencilIcon />
            <span className="sr-only">Editar</span>
          </Button>
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
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={usuarios}
        emptyMessage="Nenhum usuário cadastrado."
      />

      {/* Edit Dialog */}
      <Dialog open={editTarget !== null} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>

          {editTarget && (
            <div className="mb-2">
              <p className="text-sm font-medium">{editTarget.pessoa.nome_completo}</p>
              <p className="text-xs text-muted-foreground">{editTarget.pessoa.email ?? "—"}</p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Cargo */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Cargo</Label>
              <Select
                value={roleValue}
                onValueChange={(v) => form.setValue("role", (v ?? "professor") as UserRole)}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Selecione um cargo" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>

            {/* Ativo */}
            <div className="flex items-center gap-3">
              <Switch
                id="ativo"
                checked={ativoValue}
                onCheckedChange={(checked) => form.setValue("ativo", checked)}
              />
              <Label htmlFor="ativo">Usuário ativo</Label>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir o usuário "${deleteTarget?.pessoa?.nome_completo}"? Esta ação removerá o acesso do usuário ao sistema e não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
