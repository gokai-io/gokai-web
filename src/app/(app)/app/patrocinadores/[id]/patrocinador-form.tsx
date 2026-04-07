"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { ArrowLeftIcon, Trash2Icon, UploadIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { createClient } from "@/lib/supabase/client"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Patrocinador } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const patrocinadorFormSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  website: z.string().optional().or(z.literal("")),
  tipo: z.enum(["pessoa_fisica", "pessoa_juridica"]),
  nivel: z.enum(["ouro", "prata", "bronze", "apoiador"]),
  contato: z.string().optional().or(z.literal("")),
  valor_mensal: z.union([z.number().positive(), z.literal(0), z.nan()]).optional(),
  ativo: z.boolean(),
  exibir_site: z.boolean(),
})

type PatrocinadorFormValues = z.infer<typeof patrocinadorFormSchema>

// ─── Props ────────────────────────────────────────────────────────────────────

interface PatrocinadorFormProps {
  patrocinador: Patrocinador
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PatrocinadorForm({ patrocinador }: PatrocinadorFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingContrato, setUploadingContrato] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(patrocinador.logo_url)
  const [contratoUrl, setContratoUrl] = useState<string | null>(
    (patrocinador as Patrocinador & { contrato_url?: string | null }).contrato_url ?? null
  )

  const logoInputRef = useRef<HTMLInputElement>(null)
  const contratoInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<PatrocinadorFormValues>({
    resolver: zodResolver(patrocinadorFormSchema),
    defaultValues: {
      nome: patrocinador.nome,
      website: patrocinador.website ?? "",
      tipo: patrocinador.tipo,
      nivel: patrocinador.nivel,
      contato: patrocinador.contato ?? "",
      valor_mensal: patrocinador.valor_mensal ?? undefined,
      ativo: patrocinador.ativo,
      exibir_site: patrocinador.exibir_site,
    },
  })

  const tipoValue = form.watch("tipo")
  const nivelValue = form.watch("nivel")
  const ativoValue = form.watch("ativo")
  const exibirSiteValue = form.watch("exibir_site")

  async function onSubmit(values: PatrocinadorFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("patrocinador")
        .update({
          nome: values.nome,
          website: values.website || null,
          tipo: values.tipo,
          nivel: values.nivel,
          contato: values.contato || null,
          valor_mensal:
            values.valor_mensal != null && !isNaN(values.valor_mensal as number)
              ? values.valor_mensal
              : null,
          ativo: values.ativo,
          exibir_site: values.exibir_site,
          logo_url: logoUrl,
        })
        .eq("id", patrocinador.id)

      if (error) throw error
      toast.success("Patrocinador atualizado com sucesso.")
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
    const { error } = await supabase
      .from("patrocinador")
      .delete()
      .eq("id", patrocinador.id)

    if (error) {
      toast.error(`Erro ao excluir patrocinador: ${error.message}`)
      return
    }

    toast.success("Patrocinador excluído com sucesso.")
    router.push("/app/patrocinadores")
  }

  async function handleLogoUpload(file: File) {
    setUploadingLogo(true)
    const supabase = createClient()

    const ext = file.name.split(".").pop()
    const path = `${patrocinador.id}/logo.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("patrocinadores")
      .upload(path, file, { upsert: true })

    if (uploadError) {
      toast.error(`Erro ao fazer upload do logo: ${uploadError.message}`)
      setUploadingLogo(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("patrocinadores")
      .getPublicUrl(path)

    setLogoUrl(urlData.publicUrl)
    toast.success("Logo enviado com sucesso.")
    setUploadingLogo(false)
  }

  async function handleContratoUpload(file: File) {
    setUploadingContrato(true)
    const supabase = createClient()

    const ext = file.name.split(".").pop()
    const path = `patrocinadores/${patrocinador.id}/contrato.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("documentos")
      .upload(path, file, { upsert: true })

    if (uploadError) {
      toast.error(`Erro ao fazer upload do contrato: ${uploadError.message}`)
      setUploadingContrato(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("documentos")
      .getPublicUrl(path)

    setContratoUrl(urlData.publicUrl)
    toast.success("Contrato enviado com sucesso.")
    setUploadingContrato(false)
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
            render={<Link href="/app/patrocinadores" />}
          >
            <ArrowLeftIcon />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2Icon />
              Excluir
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </div>

        {/* Dados principais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Patrocinador</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Logo */}
            <div className="col-span-full flex items-center gap-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`Logo ${patrocinador.nome}`}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded object-contain"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-muted text-lg font-medium text-muted-foreground">
                  {patrocinador.nome.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingLogo}
                  onClick={() => logoInputRef.current?.click()}
                >
                  <UploadIcon />
                  {uploadingLogo ? "Enviando..." : "Alterar logo"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG ou SVG. Máximo 2 MB.
                </p>
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleLogoUpload(file)
                }}
              />
            </div>

            {/* Nome */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Nome do patrocinador"
                {...form.register("nome")}
              />
              {form.formState.errors.nome && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.nome.message}
                </p>
              )}
            </div>

            {/* Tipo */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={tipoValue}
                onValueChange={(v) =>
                  form.setValue("tipo", (v ?? "pessoa_juridica") as "pessoa_fisica" | "pessoa_juridica")
                }
              >
                <SelectTrigger id="tipo" className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
                  <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nível */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nivel">Nível</Label>
              <Select
                value={nivelValue}
                onValueChange={(v) =>
                  form.setValue("nivel", (v ?? "apoiador") as "ouro" | "prata" | "bronze" | "apoiador")
                }
              >
                <SelectTrigger id="nivel" className="w-full">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ouro">Ouro</SelectItem>
                  <SelectItem value="prata">Prata</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="apoiador">Apoiador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Website */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://exemplo.com.br"
                {...form.register("website")}
              />
            </div>

            {/* Contato */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contato">Contato</Label>
              <Input
                id="contato"
                placeholder="Nome ou telefone do contato"
                {...form.register("contato")}
              />
            </div>

            {/* Valor mensal */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="valor_mensal">Valor Mensal (R$)</Label>
              <Input
                id="valor_mensal"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={
                  form.watch("valor_mensal") != null &&
                  !isNaN(form.watch("valor_mensal") as number)
                    ? String(form.watch("valor_mensal"))
                    : ""
                }
                onChange={(e) => {
                  const raw = parseFloat(e.target.value)
                  form.setValue("valor_mensal", isNaN(raw) ? undefined : raw)
                }}
              />
            </div>

            {/* Contrato */}
            <div className="flex flex-col gap-1.5">
              <Label>Contrato</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingContrato}
                  onClick={() => contratoInputRef.current?.click()}
                >
                  <UploadIcon />
                  {uploadingContrato ? "Enviando..." : "Enviar contrato"}
                </Button>
                {contratoUrl && (
                  <a
                    href={contratoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Ver contrato
                  </a>
                )}
              </div>
              <p className="text-xs text-muted-foreground">PDF. Máximo 10 MB.</p>
              <input
                ref={contratoInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleContratoUpload(file)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Switch
                id="ativo"
                checked={ativoValue}
                onCheckedChange={(checked) => form.setValue("ativo", checked)}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="exibir_site"
                checked={exibirSiteValue}
                onCheckedChange={(checked) =>
                  form.setValue("exibir_site", checked)
                }
              />
              <Label htmlFor="exibir_site">Exibir no site</Label>
            </div>
          </CardContent>
        </Card>
      </form>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir Patrocinador"
        description={`Tem certeza que deseja excluir "${patrocinador.nome}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
