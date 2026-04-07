"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"
import { contatoSchema, type ContatoInput } from "@/lib/validators/contato"

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
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-100 mb-2">Mensagem enviada!</h3>
        <p className="text-zinc-400">Mensagem enviada com sucesso! Retornaremos em breve.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Nome <span className="text-red-600">*</span>
          </label>
          <input
            {...register("nome")}
            type="text"
            placeholder="Seu nome"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
          />
          {errors.nome && (
            <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            E-mail <span className="text-red-600">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Telefone</label>
          <input
            {...register("telefone")}
            type="tel"
            placeholder="(11) 99999-9999"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
          />
        </div>

        {/* Assunto */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Assunto <span className="text-red-600">*</span>
          </label>
          <input
            {...register("assunto")}
            type="text"
            placeholder="Assunto da mensagem"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
          />
          {errors.assunto && (
            <p className="mt-1 text-xs text-red-400">{errors.assunto.message}</p>
          )}
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
          Mensagem <span className="text-red-600">*</span>
        </label>
        <textarea
          {...register("mensagem")}
          rows={5}
          placeholder="Escreva sua mensagem aqui..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
        />
        {errors.mensagem && (
          <p className="mt-1 text-xs text-red-400">{errors.mensagem.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 text-zinc-950 font-semibold py-3 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  )
}
