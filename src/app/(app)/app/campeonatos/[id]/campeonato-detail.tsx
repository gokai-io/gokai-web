"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { ArrowLeftIcon, PlusIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

import { createClient } from "@/lib/supabase/client"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { DataTable, type Column } from "@/components/app/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  CampeonatoWithRelations,
  CampeonatoParticipante,
  AlunoWithPessoa,
} from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const participanteSchema = z.object({
  aluno_id: z.string().min(1, "Selecione um aluno"),
  categoria: z.string().optional().or(z.literal("")),
  resultado: z.string().optional().or(z.literal("")),
  posicao: z.string().optional().or(z.literal("")),
})

type ParticipanteFormValues = z.infer<typeof participanteSchema>

// ─── Types ─────────────────────────────────────────────────────────────────────

type ParticipanteRow = CampeonatoParticipante & { aluno: AlunoWithPessoa }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr))
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface CampeonatoDetailProps {
  campeonato: CampeonatoWithRelations
  alunosDisponiveis: AlunoWithPessoa[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CampeonatoDetail({
  campeonato,
  alunosDisponiveis,
}: CampeonatoDetailProps) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingParticipante, setEditingParticipante] =
    useState<ParticipanteRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ParticipanteRow | null>(null)
  const [saving, setSaving] = useState(false)

  const evento = campeonato.evento

  const form = useForm<ParticipanteFormValues>({
    resolver: zodResolver(participanteSchema),
    defaultValues: {
      aluno_id: "",
      categoria: "",
      resultado: "",
      posicao: "",
    },
  })

  const alunoIdValue = form.watch("aluno_id")

  function openAddDialog() {
    setEditingParticipante(null)
    form.reset({ aluno_id: "", categoria: "", resultado: "", posicao: "" })
    setDialogOpen(true)
  }

  function openEditDialog(participante: ParticipanteRow) {
    setEditingParticipante(participante)
    form.reset({
      aluno_id: participante.aluno_id,
      categoria: participante.categoria ?? "",
      resultado: participante.resultado ?? "",
      posicao: participante.medalha ?? "",
    })
    setDialogOpen(true)
  }

  async function onSubmitParticipante(values: ParticipanteFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      if (editingParticipante) {
        const { error } = await supabase
          .from("campeonato_participante")
          .update({
            categoria: values.categoria || null,
            resultado: values.resultado || null,
            medalha: values.posicao || null,
          })
          .eq("id", editingParticipante.id)

        if (error) throw error
        toast.success("Participante atualizado com sucesso.")
      } else {
        const { error } = await supabase.from("campeonato_participante").insert({
          campeonato_id: campeonato.id,
          aluno_id: values.aluno_id,
          categoria: values.categoria || null,
          resultado: values.resultado || null,
          medalha: values.posicao || null,
        })

        if (error) throw error
        toast.success("Participante adicionado com sucesso.")
      }

      setDialogOpen(false)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao salvar participante: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleRemoveParticipante() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("campeonato_participante")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao remover participante: ${error.message}`)
    } else {
      toast.success("Participante removido com sucesso.")
      router.refresh()
    }
  }

  const participantes = (campeonato.participantes ?? []) as ParticipanteRow[]

  const columns: Column<ParticipanteRow>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (item) => (
        <span className="font-medium">
          {item.aluno?.pessoa?.nome_completo ?? "—"}
        </span>
      ),
    },
    {
      key: "categoria",
      header: "Categoria",
      cell: (item) => item.categoria ?? "—",
    },
    {
      key: "resultado",
      header: "Resultado",
      cell: (item) => item.resultado ?? "—",
    },
    {
      key: "medalha",
      header: "Posição",
      cell: (item) =>
        item.medalha ? (
          <Badge variant="outline">{item.medalha}</Badge>
        ) : (
          "—"
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
              openEditDialog(item)
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
            <span className="sr-only">Remover</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* Back button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          render={<Link href="/app/campeonatos" />}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>
        {evento && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            render={<Link href={`/app/eventos/${evento.id}`} />}
          >
            Ver Evento
          </Button>
        )}
      </div>

      {/* Campeonato info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Campeonato</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Modalidade
            </span>
            <span>{campeonato.modalidade?.nome ?? "—"}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Data
            </span>
            <span>{formatDate(evento?.data_inicio ?? campeonato.data)}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Local
            </span>
            <span>{evento?.local ?? campeonato.local ?? "—"}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </span>
            <Badge variant={evento?.publicado ? "default" : "outline"} className="w-fit">
              {evento?.publicado ? "Publicado" : "Não publicado"}
            </Badge>
          </div>
          {campeonato.regulamento_url && (
            <div className="col-span-full flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Regulamento
              </span>
              <a
                href={campeonato.regulamento_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Baixar regulamento
              </a>
            </div>
          )}
          {evento?.descricao && (
            <div className="col-span-full flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Descrição
              </span>
              <span className="text-muted-foreground">{evento.descricao}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Participantes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Participantes</CardTitle>
          <Button size="sm" onClick={openAddDialog}>
            <PlusIcon />
            Adicionar Participante
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={participantes}
            emptyMessage="Nenhum participante cadastrado para este campeonato."
          />
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingParticipante ? "Editar Participante" : "Adicionar Participante"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmitParticipante)}
            className="flex flex-col gap-4"
          >
            {/* Aluno */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="aluno_id">Aluno</Label>
              <Select
                value={alunoIdValue}
                onValueChange={(v) => form.setValue("aluno_id", v ?? "")}
                disabled={!!editingParticipante}
              >
                <SelectTrigger id="aluno_id" className="w-full">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {alunosDisponiveis.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.pessoa.nome_completo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.aluno_id && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.aluno_id.message}
                </p>
              )}
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                id="categoria"
                placeholder="Ex: Juvenil, Adulto, Master..."
                {...form.register("categoria")}
              />
            </div>

            {/* Resultado */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="resultado">Resultado</Label>
              <Input
                id="resultado"
                placeholder="Ex: Ouro, Prata, Bronze, Desclassificado..."
                {...form.register("resultado")}
              />
            </div>

            {/* Posição */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="posicao">Posição</Label>
              <Input
                id="posicao"
                placeholder="Ex: 1º lugar, 2º lugar..."
                {...form.register("posicao")}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Remove confirm */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Remover Participante"
        description={`Tem certeza que deseja remover "${deleteTarget?.aluno?.pessoa?.nome_completo}" deste campeonato?`}
        confirmLabel="Remover"
        variant="destructive"
        onConfirm={handleRemoveParticipante}
      />
    </>
  )
}
