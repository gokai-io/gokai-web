"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { ArrowLeftIcon, Trash2Icon, UploadIcon } from "lucide-react"
import Link from "next/link"

import { createClient } from "@/lib/supabase/client"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { EventoWithCampeonatoRelations, Modalidade } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const eventoFormSchema = z.object({
  titulo: z.string().min(3, "Título é obrigatório"),
  slug: z.string().min(3, "Slug é obrigatório"),
  descricao: z.string().optional().or(z.literal("")),
  conteudo: z.string().optional().or(z.literal("")),
  data_inicio: z.string().min(1, "Data de início é obrigatória"),
  data_fim: z.string().optional().or(z.literal("")),
  local: z.string().optional().or(z.literal("")),
  tipo: z.enum(["treino_especial", "seminario", "campeonato", "social", "outro"]),
  publicado: z.boolean(),
  destaque: z.boolean(),
  modalidade_id: z.string().optional().or(z.literal("")),
})

type EventoFormValues = z.infer<typeof eventoFormSchema>

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

function toDatetimeLocal(isoStr: string | null): string {
  if (!isoStr) return ""
  // Convert ISO string to datetime-local format (YYYY-MM-DDTHH:MM)
  return isoStr.slice(0, 16)
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface EventoFormProps {
  evento: EventoWithCampeonatoRelations
  modalidades: Modalidade[]
  isNew?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EventoForm({ evento, modalidades, isNew = false }: EventoFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [uploadingImagem, setUploadingImagem] = useState(false)
  const [uploadingRegulamento, setUploadingRegulamento] = useState(false)
  const imagemInputRef = useRef<HTMLInputElement>(null)
  const regulamentoInputRef = useRef<HTMLInputElement>(null)

  const campeonato = evento.campeonato ?? null

  const form = useForm<EventoFormValues>({
    resolver: zodResolver(eventoFormSchema),
    defaultValues: {
      titulo: evento.titulo,
      slug: evento.slug,
      descricao: evento.descricao ?? "",
      conteudo: evento.conteudo ?? "",
      data_inicio: toDatetimeLocal(evento.data_inicio),
      data_fim: toDatetimeLocal(evento.data_fim),
      local: evento.local ?? "",
      tipo: evento.tipo,
      publicado: evento.publicado,
      destaque: evento.destaque,
      modalidade_id: campeonato?.modalidade_id ?? "",
    },
  })

  const tipoValue = form.watch("tipo")
  const publicadoValue = form.watch("publicado")
  const destaqueValue = form.watch("destaque")
  const tituloValue = form.watch("titulo")
  const slugValue = form.watch("slug")
  const modalidadeIdValue = form.watch("modalidade_id")

  function handleTituloChange(value: string) {
    form.setValue("titulo", value)
    if (isNew) {
      form.setValue("slug", toSlug(value))
    }
  }

  async function onSubmit(values: EventoFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      // Update evento
      const { error: eventoError } = await supabase
        .from("evento")
        .update({
          titulo: values.titulo,
          slug: values.slug,
          descricao: values.descricao || null,
          conteudo: values.conteudo || null,
          data_inicio: values.data_inicio,
          data_fim: values.data_fim || null,
          local: values.local || null,
          tipo: values.tipo,
          publicado: values.publicado,
          destaque: values.destaque,
        })
        .eq("id", evento.id)

      if (eventoError) throw eventoError

      // Handle campeonato
      if (values.tipo === "campeonato") {
        if (campeonato) {
          // Update existing campeonato
          const { error: campError } = await supabase
            .from("campeonato")
            .update({
              modalidade_id: values.modalidade_id || null,
            })
            .eq("id", campeonato.id)

          if (campError) throw campError
        } else {
          // Create new campeonato linked to this evento
          const { error: campError } = await supabase.from("campeonato").insert({
            evento_id: evento.id,
            nome: values.titulo,
            modalidade_id: values.modalidade_id || null,
            data: values.data_inicio || null,
            local: values.local || null,
          })

          if (campError) throw campError
        }
      }

      toast.success("Evento atualizado com sucesso.")
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao salvar: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const supabase = createClient()

    // Delete linked campeonato first if it exists
    if (campeonato) {
      const { error: campError } = await supabase
        .from("campeonato")
        .delete()
        .eq("id", campeonato.id)

      if (campError) {
        toast.error(`Erro ao excluir campeonato vinculado: ${campError.message}`)
        return
      }
    }

    const { error } = await supabase.from("evento").delete().eq("id", evento.id)

    if (error) {
      toast.error(`Erro ao excluir evento: ${error.message}`)
      return
    }

    toast.success("Evento excluído com sucesso.")
    router.push("/app/eventos")
  }

  async function handleImagemUpload(file: File) {
    setUploadingImagem(true)
    const supabase = createClient()

    const ext = file.name.split(".").pop()
    const path = `eventos/${evento.id}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("eventos")
      .upload(path, file, { upsert: true })

    if (uploadError) {
      toast.error(`Erro ao enviar imagem: ${uploadError.message}`)
      setUploadingImagem(false)
      return
    }

    const { data: urlData } = supabase.storage.from("eventos").getPublicUrl(path)

    const { error: updateError } = await supabase
      .from("evento")
      .update({ imagem_url: urlData.publicUrl })
      .eq("id", evento.id)

    if (updateError) {
      toast.error(`Erro ao salvar URL da imagem: ${updateError.message}`)
    } else {
      toast.success("Imagem atualizada com sucesso.")
      router.refresh()
    }

    setUploadingImagem(false)
  }

  async function handleRegulamentoUpload(file: File) {
    if (!campeonato) return
    setUploadingRegulamento(true)
    const supabase = createClient()

    const ext = file.name.split(".").pop()
    const path = `regulamentos/${campeonato.id}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("documentos")
      .upload(path, file, { upsert: true })

    if (uploadError) {
      toast.error(`Erro ao enviar regulamento: ${uploadError.message}`)
      setUploadingRegulamento(false)
      return
    }

    const { data: urlData } = supabase.storage.from("documentos").getPublicUrl(path)

    const { error: updateError } = await supabase
      .from("campeonato")
      .update({ regulamento_url: urlData.publicUrl })
      .eq("id", campeonato.id)

    if (updateError) {
      toast.error(`Erro ao salvar URL do regulamento: ${updateError.message}`)
    } else {
      toast.success("Regulamento enviado com sucesso.")
      router.refresh()
    }

    setUploadingRegulamento(false)
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            render={<Link href="/app/eventos" />}
          >
            <ArrowLeftIcon />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            {!isNew && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2Icon />
                Excluir
              </Button>
            )}
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : isNew ? "Criar evento" : "Salvar alterações"}
            </Button>
          </div>
        </div>

        {/* Dados principais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Evento</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Título */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                placeholder="Nome do evento"
                value={tituloValue}
                onChange={(e) => handleTituloChange(e.target.value)}
              />
              {form.formState.errors.titulo && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.titulo.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="url-do-evento"
                value={slugValue}
                onChange={(e) => form.setValue("slug", e.target.value)}
              />
              {form.formState.errors.slug && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>

            {/* Tipo */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={tipoValue}
                onValueChange={(v) =>
                  form.setValue(
                    "tipo",
                    (v ?? "outro") as EventoFormValues["tipo"]
                  )
                }
              >
                <SelectTrigger id="tipo" className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campeonato">Campeonato</SelectItem>
                  <SelectItem value="seminario">Seminário</SelectItem>
                  <SelectItem value="treino_especial">Treino Especial</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.tipo && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.tipo.message}
                </p>
              )}
            </div>

            {/* Local */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="local">Local</Label>
              <Input
                id="local"
                placeholder="Ex: Ginásio Municipal"
                {...form.register("local")}
              />
            </div>

            {/* Data início */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="data_inicio">Data de Início</Label>
              <Input
                id="data_inicio"
                type="datetime-local"
                {...form.register("data_inicio")}
              />
              {form.formState.errors.data_inicio && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.data_inicio.message}
                </p>
              )}
            </div>

            {/* Data fim */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="data_fim">Data de Término</Label>
              <Input
                id="data_fim"
                type="datetime-local"
                {...form.register("data_fim")}
              />
            </div>

            {/* Publicado */}
            <div className="flex items-center gap-3">
              <Switch
                id="publicado"
                checked={publicadoValue}
                onCheckedChange={(checked) => form.setValue("publicado", checked)}
              />
              <Label htmlFor="publicado">Publicado</Label>
            </div>

            {/* Destaque */}
            <div className="flex items-center gap-3">
              <Switch
                id="destaque"
                checked={destaqueValue}
                onCheckedChange={(checked) => form.setValue("destaque", checked)}
              />
              <Label htmlFor="destaque">Destaque</Label>
            </div>

            {/* Descrição */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Resumo breve do evento..."
                className="min-h-20"
                {...form.register("descricao")}
              />
            </div>

            {/* Conteúdo */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="conteudo">
                Conteúdo{" "}
                <span className="text-muted-foreground text-xs">(suporta Markdown)</span>
              </Label>
              <Textarea
                id="conteudo"
                placeholder="Descrição completa do evento em Markdown..."
                className="min-h-40 font-mono text-sm"
                {...form.register("conteudo")}
              />
            </div>

            {/* Imagem */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label>Imagem do Evento</Label>
              {evento.imagem_url && (
                <div className="mb-2">
                  <img
                    src={evento.imagem_url}
                    alt="Imagem do evento"
                    className="h-32 w-auto rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingImagem}
                  onClick={() => imagemInputRef.current?.click()}
                >
                  <UploadIcon />
                  {uploadingImagem ? "Enviando..." : "Enviar imagem"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG ou WEBP. Máximo 5 MB.
                </p>
              </div>
              <input
                ref={imagemInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImagemUpload(file)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seção campeonato — exibida apenas quando tipo = campeonato */}
        {tipoValue === "campeonato" && (
          <Card>
            <CardHeader>
              <CardTitle>Dados do Campeonato</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Modalidade */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="modalidade_id">Modalidade</Label>
                <Select
                  value={modalidadeIdValue ?? ""}
                  onValueChange={(v) => form.setValue("modalidade_id", v ?? "")}
                >
                  <SelectTrigger id="modalidade_id" className="w-full">
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {modalidades.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Regulamento */}
              {!isNew && campeonato && (
                <div className="flex flex-col gap-1.5">
                  <Label>Regulamento</Label>
                  {campeonato.regulamento_url && (
                    <a
                      href={campeonato.regulamento_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      Ver regulamento atual
                    </a>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploadingRegulamento}
                      onClick={() => regulamentoInputRef.current?.click()}
                    >
                      <UploadIcon />
                      {uploadingRegulamento ? "Enviando..." : "Enviar regulamento"}
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF. Máximo 10 MB.</p>
                  </div>
                  <input
                    ref={regulamentoInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleRegulamentoUpload(file)
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Separator />
      </form>

      {!isNew && (
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Excluir Evento"
          description={`Tem certeza que deseja excluir o evento "${evento.titulo}"? Esta ação removerá todos os dados associados e não pode ser desfeita.`}
          confirmLabel="Excluir"
          variant="destructive"
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}
