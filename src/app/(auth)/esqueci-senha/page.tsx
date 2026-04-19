"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const esqueceuSenhaSchema = z.object({
  email: z.email("E-mail inválido"),
})

type EsqueceuSenhaInput = z.infer<typeof esqueceuSenhaSchema>

export default function EsqueceuSenhaPage() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EsqueceuSenhaInput>({
    resolver: zodResolver(esqueceuSenhaSchema),
  })

  async function onSubmit(data: EsqueceuSenhaInput) {
    setServerError(null)
    const supabase = createClient()
    const redirectOrigin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${redirectOrigin}/redefinir-senha`,
    })

    if (error) {
      setServerError("Não foi possível enviar o e-mail. Tente novamente.")
      return
    }

    setSuccess(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recuperar Senha</CardTitle>
        <CardDescription>
          Informe seu e-mail para receber o link de recuperação.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {success ? (
          <p className="text-sm text-center py-2">
            Se o e-mail existir, você receberá um link de recuperação.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-destructive text-center">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
        >
          Voltar para o login
        </Link>
      </CardFooter>
    </Card>
  )
}
