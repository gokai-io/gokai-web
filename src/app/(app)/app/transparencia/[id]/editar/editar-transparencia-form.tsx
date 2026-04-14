"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { ArrowLeftIcon, UploadIcon } from "lucide-react"
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
import type { Transparencia } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const editarTransparenciaSchema = z.object({
  titulo: z.string().min(3, "Título é obrigatório"),
  descricao: z.string().optional().or(z.literal("")),
  conteudo: z.string().optional().or(z.literal("")),
  tipo: z.enum(["ata", "balanco", "relatorio", "estatuto", "outro"]),
  data_referencia: z.string().min(1, "Data de referência é obrigatória"),
  publicado: z.boolean(),
})

type EditarTransparenciaValues = z.infer<typeof editarTransparenciaSchema>

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditarTransparenciaFormProps {
  documento: Transparencia
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditarTransparenciaForm({ documento }: EditarTransparenciaFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [arquivoFile, setArquivoFile] = useState<File | null>(null)

  const arquivoInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<EditarTransparenciaValues>({
    resolver: zodResolver(editarTransparenciaSchema),
    defaultValues: {
      titulo: documento.titulo,
      descricao: documento.descricao ?? "",
      conteudo: documento.conteudo ?? "",
      tipo: documento.tipo,
      data_referencia: documento.data_referencia,
      publicado: documento.publicado,
    },
  })

  const tipoValue = form.watch("tipo")
  const publicadoValue = form.watch("publicado")

  async function onSubmit(values: EditarTransparenciaValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      let arquivoUrl: string | null = documento.arquivo_url

      // 1. Upload new file if selected
      if (arquivoFile) {
        setUploading(true)
        const ext = arquivoFile.name.split(".").pop()
        const timestamp = Date.now()
        const path = `${values.tipo}/${timestamp}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from("transparencia")
          .upload(path, arquivoFile, { upsert: false })

        if (uploadError) {
          toast.error(`Erro ao fazer upload do arquivo: ${uploadError.message}`)
          setSaving(false)
          setUploading(false)
          return
        }

        const { data: urlData } = supabase.storage
          .from("transparencia")
          .getPublicUrl(path)

        arquivoUrl = urlData.publicUrl
        setUploading(false)
      }

      // 2. Update transparencia record
      const conteudo = values.conteudo?.trim() || null

      const { error: updateError } = await supabase
        .from("transparencia")
        .update({
          titulo: values.titulo,
          descricao: values.descricao || null,
          conteudo,
          tipo: values.tipo,
          data_referencia: values.data_referencia,
          publicado: values.publicado,
          arquivo_url: arquivoUrl,
        })
        .eq("id", documento.id)

      if (updateError) throw updateError

      // 3. Create new version if conteudo changed
      const conteudoChanged = conteudo !== (documento.conteudo ?? null)
      if (conteudo && conteudoChanged) {
        // Get latest version number
        const { data: latestVersion } = await supabase
          .from("transparencia_versao")
          .select("versao")
          .eq("transparencia_id", documento.id)
          .order("versao", { ascending: false })
          .limit(1)
          .maybeSingle()

        const nextVersion = (latestVersion?.versao ?? 0) + 1

        await supabase.from("transparencia_versao").insert({
          transparencia_id: documento.id,
          versao: nextVersion,
          conteudo,
        })
      }

      toast.success("Documento atualizado com sucesso.")
      router.push(`/app/transparencia/${documento.id}`)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao atualizar documento: ${message}`)
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
          render={<Link href={`/app/transparencia/${documento.id}`} />}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>
        <Button type="submit" disabled={saving || uploading}>
          {saving || uploading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>

      {/* Dados do documento */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Documento</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Título */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ex: Ata da Assembleia Geral 2024"
              {...form.register("titulo")}
            />
            {form.formState.errors.titulo && (
              <p className="text-xs text-destructive">
                {form.formState.errors.titulo.message}
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
                  (v ?? "outro") as "ata" | "balanco" | "relatorio" | "estatuto" | "outro"
                )
              }
            >
              <SelectTrigger id="tipo" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ata">Ata</SelectItem>
                <SelectItem value="balanco">Balanço</SelectItem>
                <SelectItem value="relatorio">Relatório</SelectItem>
                <SelectItem value="estatuto">Estatuto</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.tipo && (
              <p className="text-xs text-destructive">
                {form.formState.errors.tipo.message}
              </p>
            )}
          </div>

          {/* Data de referência */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="data_referencia">Data de Referência</Label>
            <Input
              id="data_referencia"
              type="date"
              {...form.register("data_referencia")}
            />
            {form.formState.errors.data_referencia && (
              <p className="text-xs text-destructive">
                {form.formState.errors.data_referencia.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Breve descrição do documento..."
              className="min-h-24"
              {...form.register("descricao")}
            />
          </div>

          {/* Conteúdo Markdown */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="conteudo">Conteúdo (Markdown)</Label>
            <Textarea
              id="conteudo"
              placeholder="Escreva o conteúdo do documento em Markdown..."
              className="min-h-60 font-mono text-sm"
              {...form.register("conteudo")}
            />
            <p className="text-xs text-muted-foreground">
              Suporta formatação Markdown: títulos, listas, negrito, itálico, tabelas, etc.
            </p>
          </div>

          {/* Arquivo */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label>Arquivo</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => arquivoInputRef.current?.click()}
              >
                <UploadIcon />
                {arquivoFile
                  ? arquivoFile.name
                  : documento.arquivo_url
                    ? "Substituir arquivo"
                    : "Selecionar arquivo"}
              </Button>
              {documento.arquivo_url && !arquivoFile && (
                <span className="text-xs text-muted-foreground">
                  Arquivo atual mantido
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PDF, DOC ou DOCX. Máximo 20 MB.
            </p>
            <input
              ref={arquivoInputRef}
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setArquivoFile(file)
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle>Publicação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch
              id="publicado"
              checked={publicadoValue}
              onCheckedChange={(checked) => form.setValue("publicado", checked)}
            />
            <Label htmlFor="publicado">Publicado no site</Label>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Documentos publicados ficam visíveis para todos os visitantes do site.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
