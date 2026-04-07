"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { useTransition } from "react"

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
import { criarUsuarioComInvite } from "./actions"
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
  const [isPending, startTransition] = useTransition()

  const form = useForm<NovoUsuarioFormValues>({
    resolver: zodResolver(novoUsuarioSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      role: "professor",
    },
  })

  const roleValue = form.watch("role")

  function onSubmit(values: NovoUsuarioFormValues) {
    startTransition(async () => {
      const result = await criarUsuarioComInvite(values)

      if (!result.success) {
        toast.error(result.error ?? "Erro ao criar usuário")
        return
      }

      toast.success("Convite enviado por e-mail com sucesso!")
      router.push("/app/usuarios")
      router.refresh()
    })
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
          Um convite será enviado automaticamente para este e-mail.
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enviando convite..." : "Criar Usuário e Enviar Convite"}
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
