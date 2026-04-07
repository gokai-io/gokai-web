"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { useState } from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROLE_LABELS } from "../usuarios-client"
import type { UserRole } from "@/types/database"

// ─── Schema ───────────────────────────────────────────────────────────────────

const novoUsuarioSchema = z.object({
  nome_completo: z.string().min(3, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  role: z.enum([
    "presidente",
    "vice_presidente",
    "diretor_administrativo",
    "diretor_financeiro",
    "diretor_tecnico_esportivo",
    "professor",
  ]),
})

type NovoUsuarioFormValues = z.infer<typeof novoUsuarioSchema>

const ROLES: UserRole[] = [
  "presidente",
  "vice_presidente",
  "diretor_administrativo",
  "diretor_financeiro",
  "diretor_tecnico_esportivo",
  "professor",
]

// ─── Component ────────────────────────────────────────────────────────────────

export function NovoUsuarioForm() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const form = useForm<NovoUsuarioFormValues>({
    resolver: zodResolver(novoUsuarioSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      role: "professor",
    },
  })

  const roleValue = form.watch("role")

  async function onSubmit(values: NovoUsuarioFormValues) {
    setSaving(true)
    const supabase = createClient()

    try {
      // 1. Check if pessoa with this email already exists
      const { data: existingPessoa } = await supabase
        .from("pessoa")
        .select("id")
        .eq("email", values.email)
        .maybeSingle()

      let pessoaId: string

      if (existingPessoa) {
        pessoaId = existingPessoa.id
      } else {
        // 2. Create new pessoa record
        const { data: newPessoa, error: pessoaError } = await supabase
          .from("pessoa")
          .insert({ nome_completo: values.nome_completo, email: values.email })
          .select("id")
          .single()

        if (pessoaError) throw pessoaError
        pessoaId = newPessoa.id
      }

      // 3. Check if usuario_interno already exists for this pessoa
      const { data: existingUser } = await supabase
        .from("usuario_interno")
        .select("id")
        .eq("pessoa_id", pessoaId)
        .maybeSingle()

      if (existingUser) {
        toast.error("Já existe um usuário interno vinculado a este e-mail.")
        return
      }

      // 4. Create usuario_interno record
      const { error: userError } = await supabase
        .from("usuario_interno")
        .insert({
          pessoa_id: pessoaId,
          role: values.role,
          ativo: true,
          auth_user_id: null,
        })

      if (userError) throw userError

      toast.success(
        "Usuário criado com sucesso. Acesse o painel do Supabase para enviar o convite de acesso."
      )
      router.push("/app/usuarios")
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao criar usuário: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nome_completo">Nome completo</Label>
        <Input
          id="nome_completo"
          placeholder="Ex: João da Silva"
          {...form.register("nome_completo")}
        />
        {form.formState.errors.nome_completo && (
          <p className="text-xs text-destructive">
            {form.formState.errors.nome_completo.message}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="joao@exemplo.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Se já existir uma pessoa com este e-mail, ela será vinculada automaticamente.
        </p>
      </div>

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

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Criar Usuário"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/app/usuarios")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
