"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

import { createClient } from "@/lib/supabase/client"
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
import type { Modalidade } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const novoEventoSchema = z.object({
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

type NovoEventoFormValues = z.infer<typeof novoEventoSchema>

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface NovoEventoFormProps {
  modalidades: Modalidade[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NovoEventoForm({ modalidades }: NovoEventoFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const form = useForm<NovoEventoFormValues>({
    resolver: zodResolver(novoEventoSchema),
    defaultValues: {
      titulo: "",
      slug: "",
      descricao: "",
      conteudo: "",
      data_inicio: "",
      data_fim: "",
      local: "",
      tipo: "outro",
      publicado: false,
      destaque: false,
      modalidade_id: "",
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
    form.setValue("slug", toSlug(value))
  }

  async function onSubmit(values: NovoEventoFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      // Insert evento
      const { data: evento, error: eventoError } = await supabase
        .from("evento")
        .insert({
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
        .select("id")
        .single()

      if (eventoError) throw eventoError

      // If tipo is campeonato, create linked campeonato record
      if (values.tipo === "campeonato") {
        const { error: campError } = await supabase.from("campeonato").insert({
          evento_id: evento.id,
          nome: values.titulo,
          modalidade_id: values.modalidade_id || null,
          data: values.data_inicio || null,
          local: values.local || null,
        })

        if (campError) throw campError
      }

      toast.success("Evento criado com sucesso.")
      router.push(`/app/eventos/${evento.id}`)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao criar evento: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
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
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Criar evento"}
        </Button>
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
                  (v ?? "outro") as NovoEventoFormValues["tipo"]
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
        </CardContent>
      </Card>

      {/* Seção campeonato */}
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
          </CardContent>
        </Card>
      )}
    </form>
  )
}
