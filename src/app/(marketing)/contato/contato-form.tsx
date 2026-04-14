"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { createClient } from "@/lib/supabase/client"
import { contatoSchema, type ContatoInput } from "@/lib/validators/contato"

const fieldClassName =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"

const labelClassName = "mb-1.5 block text-sm font-medium text-foreground"

export function ContatoForm() {
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoInput>({
    resolver: zodResolver(contatoSchema),
  })

  async function onSubmit(data: ContatoInput) {
    setSubmitError(null)
    const supabase = createClient()

    const { error } = await supabase.from("contato").insert([
      {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone ?? null,
        assunto: data.assunto,
        mensagem: data.mensagem,
        status: "novo",
      },
    ])

    if (error) {
      setSubmitError("Ocorreu um erro ao enviar sua mensagem. Tente novamente.")
      return
    }

    reset()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="rounded-[28px] border border-primary/16 bg-primary/6 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Mensagem enviada!</h3>
        <p className="text-muted-foreground">Mensagem enviada com sucesso! Retornaremos em breve.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {submitError && (
        <div className="rounded-xl border border-secondary/18 bg-secondary/8 p-4 text-sm text-secondary">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>
            Nome <span className="text-secondary">*</span>
          </label>
          <input {...register("nome")} type="text" placeholder="Seu nome" className={fieldClassName} />
          {errors.nome && <p className="mt-1 text-xs text-secondary">{errors.nome.message}</p>}
        </div>

        <div>
          <label className={labelClassName}>
            E-mail <span className="text-secondary">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            className={fieldClassName}
          />
          {errors.email && <p className="mt-1 text-xs text-secondary">{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClassName}>Telefone</label>
          <input
            {...register("telefone")}
            type="tel"
            placeholder="(11) 99999-9999"
            className={fieldClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            Assunto <span className="text-secondary">*</span>
          </label>
          <input
            {...register("assunto")}
            type="text"
            placeholder="Assunto da mensagem"
            className={fieldClassName}
          />
          {errors.assunto && <p className="mt-1 text-xs text-secondary">{errors.assunto.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClassName}>
          Mensagem <span className="text-secondary">*</span>
        </label>
        <textarea
          {...register("mensagem")}
          rows={5}
          placeholder="Escreva sua mensagem aqui..."
          className={`${fieldClassName} resize-none`}
        />
        {errors.mensagem && <p className="mt-1 text-xs text-secondary">{errors.mensagem.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  )
}
