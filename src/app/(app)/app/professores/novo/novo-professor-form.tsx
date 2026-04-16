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

const novoProfessorSchema = z.object({
  // Pessoa fields
  nome_completo: z.string().min(3, "Nome é obrigatório"),
  cpf: z.string().optional(),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().optional(),
  data_nascimento: z.string().optional(),
  // Professor fields
  especialidades: z.array(z.string()),
  graduacao: z.string().optional(),
  registro_federacao: z.string().optional(),
  bio: z.string().optional(),
  status: z.enum(["ativo", "inativo", "licenciado"]),
  exibir_site: z.boolean(),
})

type NovoProfessorFormValues = z.infer<typeof novoProfessorSchema>

// ─── Component ────────────────────────────────────────────────────────────────

interface NovoProfessorFormProps {
  modalidades: Modalidade[]
}

export function NovoProfessorForm({ modalidades }: NovoProfessorFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const form = useForm<NovoProfessorFormValues>({
    resolver: zodResolver(novoProfessorSchema),
    defaultValues: {
      nome_completo: "",
      cpf: "",
      email: "",
      telefone: "",
      data_nascimento: "",
      especialidades: [],
      graduacao: "",
      registro_federacao: "",
      bio: "",
      status: "ativo",
      exibir_site: true,
    },
  })

  const statusValue = form.watch("status")
  const exibirSiteValue = form.watch("exibir_site")

  async function onSubmit(values: NovoProfessorFormValues) {
    setSaving(true)
    const supabase = createClient()

    const especialidades = values.especialidades

    try {
      // 1. Insert pessoa
      const { data: pessoa, error: pessoaError } = await supabase
        .from("pessoa")
        .insert({
          nome_completo: values.nome_completo,
          cpf: values.cpf || null,
          email: values.email || null,
          telefone: values.telefone || null,
          data_nascimento: values.data_nascimento || null,
        })
        .select("id")
        .single()

      if (pessoaError) throw pessoaError

      // 2. Insert professor linked to pessoa
      const { error: profError } = await supabase.from("professor").insert({
        pessoa_id: pessoa.id,
        especialidades,
        graduacao: values.graduacao || null,
        registro_federacao: values.registro_federacao || null,
        bio: values.bio || null,
        status: values.status,
        exibir_site: values.exibir_site,
      })

      if (profError) {
        // Rollback pessoa insert on professor failure
        await supabase.from("pessoa").delete().eq("id", pessoa.id)
        throw profError
      }

      toast.success("Professor cadastrado com sucesso.")
      router.push("/app/professores")
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao cadastrar professor: ${message}`)
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
          render={<Link href="/app/professores" />}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Cadastrar professor"}
        </Button>
      </div>

      {/* Dados pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Nome completo */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="nome_completo">Nome completo</Label>
            <Input
              id="nome_completo"
              placeholder="Nome do professor"
              {...form.register("nome_completo")}
            />
            {form.formState.errors.nome_completo && (
              <p className="text-xs text-destructive">
                {form.formState.errors.nome_completo.message}
              </p>
            )}
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              {...form.register("cpf")}
            />
          </div>

          {/* Data de nascimento */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="data_nascimento">Data de nascimento</Label>
            <Input
              id="data_nascimento"
              type="date"
              {...form.register("data_nascimento")}
            />
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="professor@exemplo.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(00) 00000-0000"
              {...form.register("telefone")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dados do professor */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Professor</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Modalidades */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label>Modalidades</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {modalidades.map((mod) => {
                const checked = form.watch("especialidades").includes(mod.nome)
                return (
                  <label
                    key={mod.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      checked
                        ? "border-primary bg-primary/5 font-medium"
                        : "border-border text-muted-foreground hover:border-foreground/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => {
                        const current = form.getValues("especialidades")
                        form.setValue(
                          "especialidades",
                          checked ? current.filter((e: string) => e !== mod.nome) : [...current, mod.nome]
                        )
                      }}
                    />
                    <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${checked ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                      {checked && <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    {mod.nome}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Graduação */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="graduacao">Graduação</Label>
            <Input
              id="graduacao"
              placeholder="Ex: Faixa Preta 3º Dan"
              {...form.register("graduacao")}
            />
          </div>

          {/* Registro de federação */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="registro_federacao">Registro na Federação</Label>
            <Input
              id="registro_federacao"
              placeholder="Número do registro"
              {...form.register("registro_federacao")}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              value={statusValue}
              onValueChange={(value) =>
                form.setValue(
                  "status",
                  value as "ativo" | "inativo" | "licenciado"
                )
              }
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="licenciado">Licenciado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exibir no site */}
          <div className="flex items-center gap-3 self-end pb-1">
            <Switch
              id="exibir_site"
              checked={exibirSiteValue}
              onCheckedChange={(checked) =>
                form.setValue("exibir_site", checked)
              }
            />
            <Label htmlFor="exibir_site">Exibir no site</Label>
          </div>

          {/* Bio */}
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Breve biografia do professor..."
              className="min-h-28"
              {...form.register("bio")}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
