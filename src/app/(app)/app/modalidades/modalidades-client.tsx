"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { PlusIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { Modalidade } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const modalidadeSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  slug: z.string().min(2, "Slug é obrigatório"),
  descricao: z.string().optional(),
  ativa: z.boolean(),
  ordem: z.number().int(),
})

type ModalidadeFormValues = z.infer<typeof modalidadeSchema>

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ModalidadesClientProps {
  modalidades: Modalidade[]
}

export function ModalidadesClient({ modalidades }: ModalidadesClientProps) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Modalidade | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Modalidade | null>(null)
  const [saving, setSaving] = useState(false)

  const form = useForm<ModalidadeFormValues>({
    resolver: zodResolver(modalidadeSchema),
    defaultValues: {
      nome: "",
      slug: "",
      descricao: "",
      ativa: true,
      ordem: 0,
    },
  })

  function openCreate() {
    setEditing(null)
    form.reset({ nome: "", slug: "", descricao: "", ativa: true, ordem: 0 })
    setDialogOpen(true)
  }

  function openEdit(modalidade: Modalidade) {
    setEditing(modalidade)
    form.reset({
      nome: modalidade.nome,
      slug: modalidade.slug,
      descricao: modalidade.descricao ?? "",
      ativa: modalidade.ativa,
      ordem: modalidade.ordem ?? 0,
    })
    setDialogOpen(true)
  }

  function handleNomeChange(value: string) {
    form.setValue("nome", value)
    if (!editing) {
      form.setValue("slug", toSlug(value))
    }
  }

  async function onSubmit(values: ModalidadeFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      if (editing) {
        const { error } = await supabase
          .from("modalidade")
          .update({
            nome: values.nome,
            slug: values.slug,
            descricao: values.descricao || null,
            ativa: values.ativa,
            ordem: values.ordem,
          })
          .eq("id", editing.id)

        if (error) throw error
        toast.success("Modalidade atualizada com sucesso.")
      } else {
        const { error } = await supabase.from("modalidade").insert({
          nome: values.nome,
          slug: values.slug,
          descricao: values.descricao || null,
          ativa: values.ativa,
          ordem: values.ordem,
        })

        if (error) throw error
        toast.success("Modalidade criada com sucesso.")
      }

      setDialogOpen(false)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao salvar modalidade: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("modalidade")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao excluir modalidade: ${error.message}`)
    } else {
      toast.success("Modalidade excluída com sucesso.")
      router.refresh()
    }
  }

  const columns: Column<Modalidade>[] = [
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "slug",
      header: "Slug",
      cell: (item) => (
        <span className="font-mono text-xs text-muted-foreground">{item.slug}</span>
      ),
    },
    {
      key: "ativa",
      header: "Ativo",
      cell: (item) => (
        <Badge variant={item.ativa ? "default" : "outline"}>
          {item.ativa ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "ordem",
      header: "Ordem",
      cell: (item) => <span>{item.ordem ?? 0}</span>,
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

  const nomeValue = form.watch("nome")
  const slugValue = form.watch("slug")
  const ativaValue = form.watch("ativa")
  const ordemValue = form.watch("ordem")
  const descricaoValue = form.watch("descricao")

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <PlusIcon />
          Nova Modalidade
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={modalidades}
        emptyMessage="Nenhuma modalidade cadastrada."
      />

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Modalidade" : "Nova Modalidade"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Ex: Judô"
                value={nomeValue}
                onChange={(e) => handleNomeChange(e.target.value)}
              />
              {form.formState.errors.nome && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.nome.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="Ex: judo"
                value={slugValue}
                onChange={(e) => form.setValue("slug", e.target.value)}
              />
              {form.formState.errors.slug && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descrição breve da modalidade..."
                value={descricaoValue}
                onChange={(e) => form.setValue("descricao", e.target.value)}
              />
            </div>

            {/* Ordem */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ordem">Ordem de exibição</Label>
              <Input
                id="ordem"
                type="number"
                placeholder="0"
                value={ordemValue}
                onChange={(e) =>
                  form.setValue("ordem", parseInt(e.target.value, 10) || 0)
                }
              />
            </div>

            {/* Ativo */}
            <div className="flex items-center gap-3">
              <Switch
                id="ativa"
                checked={ativaValue}
                onCheckedChange={(checked) => form.setValue("ativa", checked)}
              />
              <Label htmlFor="ativa">Ativo</Label>
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
        title="Excluir Modalidade"
        description={`Tem certeza que deseja excluir a modalidade "${deleteTarget?.nome}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
