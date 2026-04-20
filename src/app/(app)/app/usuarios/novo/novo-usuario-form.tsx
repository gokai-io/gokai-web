"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { CopyIcon, RefreshCwIcon, EyeIcon, EyeOffIcon } from "lucide-react"

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

const novoUsuarioSchema = z
  .object({
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
    modo: z.enum(["invite", "password"]),
    password: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => data.modo !== "password" || (data.password ?? "").length >= 8,
    { message: "Senha deve ter ao menos 8 caracteres", path: ["password"] }
  )

type NovoUsuarioFormValues = z.infer<typeof novoUsuarioSchema>

const ROLES: UserRole[] = [
  "presidente",
  "vice_presidente",
  "diretor_administrativo",
  "diretor_financeiro",
  "diretor_tecnico_esportivo",
  "professor",
]

function gerarSenha(len = 14): string {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%&*"
  const bytes = new Uint32Array(len)
  crypto.getRandomValues(bytes)
  let out = ""
  for (let i = 0; i < len; i++) {
    out += alphabet[bytes[i] % alphabet.length]
  }
  return out
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NovoUsuarioForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(true)

  const form = useForm<NovoUsuarioFormValues>({
    resolver: zodResolver(novoUsuarioSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      role: "professor",
      modo: "invite",
      password: "",
    },
  })

  const roleValue = form.watch("role")
  const modo = form.watch("modo")
  const passwordValue = form.watch("password") ?? ""

  function onSubmit(values: NovoUsuarioFormValues) {
    startTransition(async () => {
      const result = await criarUsuarioComInvite({
        nome_completo: values.nome_completo,
        email: values.email,
        role: values.role,
        password: values.modo === "password" ? values.password : undefined,
      })

      if (!result.success) {
        toast.error(result.error ?? "Erro ao criar usuário")
        return
      }

      if (result.mode === "password") {
        toast.success(
          `Usuário criado. Compartilhe a senha com ${values.nome_completo}.`
        )
      } else {
        toast.success("Convite enviado por e-mail com sucesso!")
      }
      router.push("/app/usuarios")
      router.refresh()
    })
  }

  async function copyPassword() {
    if (!passwordValue) return
    try {
      await navigator.clipboard.writeText(passwordValue)
      toast.success("Senha copiada")
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.")
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

      {/* Modo de provisionamento */}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-4">
        <Label>Como o usuário receberá acesso?</Label>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="radio"
              value="invite"
              checked={modo === "invite"}
              onChange={() => form.setValue("modo", "invite")}
              className="mt-1"
            />
            <span>
              <span className="font-medium">Convite por e-mail</span>
              <br />
              <span className="text-xs text-muted-foreground">
                O usuário recebe um link para definir a própria senha.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="radio"
              value="password"
              checked={modo === "password"}
              onChange={() => form.setValue("modo", "password")}
              className="mt-1"
            />
            <span>
              <span className="font-medium">Definir senha manualmente</span>
              <br />
              <span className="text-xs text-muted-foreground">
                Você informa a senha direto ao usuário (WhatsApp, pessoalmente).
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* Senha manual */}
      {modo === "password" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                className="pr-10 font-mono"
                {...form.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Gerar senha aleatória"
              onClick={() => {
                form.setValue("password", gerarSenha(), { shouldValidate: true })
                setShowPassword(true)
              }}
            >
              <RefreshCwIcon className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Copiar senha"
              onClick={copyPassword}
              disabled={!passwordValue}
            >
              <CopyIcon className="size-4" />
            </Button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Anote antes de enviar — depois de criar, a senha não poderá ser recuperada aqui.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Criando..."
            : modo === "password"
              ? "Criar Usuário com Senha"
              : "Criar Usuário e Enviar Convite"}
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
