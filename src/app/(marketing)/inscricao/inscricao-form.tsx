"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"
import { inscricaoSchema, type InscricaoInput } from "@/lib/validators/inscricao"
import type { Modalidade } from "@/types/database"

interface InscricaoFormProps {
  modalidades: Modalidade[]
}

export function InscricaoForm({ modalidades }: InscricaoFormProps) {
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InscricaoInput>({
    resolver: zodResolver(inscricaoSchema),
    defaultValues: {
      eh_menor: false,
    },
  })

  const ehMenor = watch("eh_menor")

  async function onSubmit(data: InscricaoInput) {
    setSubmitError(null)
    const supabase = createClient()

    const { error } = await supabase.from("inscricao").insert([
      {
        nome_completo: data.nome_completo,
        email: data.email,
        telefone: data.telefone ?? null,
        data_nascimento: data.data_nascimento ?? null,
        modalidade_interesse: data.modalidade_interesse ?? null,
        experiencia_previa: data.experiencia_previa ?? null,
        observacoes: data.observacoes ?? null,
        situacao_atual: data.situacao_atual ?? null,
        eh_menor: data.eh_menor,
        responsavel_nome: data.responsavel_nome ?? null,
        responsavel_telefone: data.responsavel_telefone ?? null,
        responsavel_parentesco: data.responsavel_parentesco ?? null,
        status: "pendente",
      },
    ])

    if (error) {
      setSubmitError("Ocorreu um erro ao enviar sua inscrição. Tente novamente.")
      return
    }

    reset()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-100 mb-2">Inscrição enviada!</h3>
        <p className="text-zinc-400">
          Sua inscrição foi recebida! Entraremos em contato em breve.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Enviar outra inscrição
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400">
          {submitError}
        </div>
      )}

      {/* Dados pessoais */}
      <div className="bg-zinc-900 rounded-xl p-6 ring-1 ring-zinc-800 space-y-5">
        <h2 className="text-base font-semibold text-zinc-100">Dados Pessoais</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nome completo */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Nome completo <span className="text-red-600">*</span>
            </label>
            <input
              {...register("nome_completo")}
              type="text"
              placeholder="Seu nome completo"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
            />
            {errors.nome_completo && (
              <p className="mt-1 text-xs text-red-400">{errors.nome_completo.message}</p>
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

          {/* Data de nascimento */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Data de nascimento
            </label>
            <input
              {...register("data_nascimento")}
              type="date"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
            />
          </div>

          {/* Modalidade */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Modalidade de interesse
            </label>
            <select
              {...register("modalidade_interesse")}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
            >
              <option value="">Selecione uma modalidade</option>
              {modalidades.map((m) => (
                <option key={m.id} value={m.nome}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Experiência prévia */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Experiência prévia
          </label>
          <textarea
            {...register("experiencia_previa")}
            rows={3}
            placeholder="Descreva sua experiência com artes marciais (se houver)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
          />
        </div>

        {/* Situação Atual */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Situação atual
          </label>
          <select
            {...register("situacao_atual")}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
          >
            <option value="">Selecione...</option>
            <option value="estudante">Estudante</option>
            <option value="trabalhador">Trabalhador</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>

        {/* É menor */}
        <div className="flex items-center gap-3">
          <input
            {...register("eh_menor")}
            type="checkbox"
            id="eh_menor"
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-red-600 focus:ring-offset-zinc-900"
          />
          <label htmlFor="eh_menor" className="text-sm text-zinc-300">
            O inscrito é menor de idade
          </label>
        </div>
      </div>

      {/* Responsável (shown if eh_menor) */}
      {ehMenor && (
        <div className="bg-zinc-900 rounded-xl p-6 ring-1 ring-red-600/30 space-y-5">
          <h2 className="text-base font-semibold text-zinc-100">
            Dados do Responsável Legal{" "}
            <span className="text-red-600 text-xs font-normal">(obrigatório para menores)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nome responsável */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Nome do responsável <span className="text-red-600">*</span>
              </label>
              <input
                {...register("responsavel_nome")}
                type="text"
                placeholder="Nome completo do responsável"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
              />
              {errors.responsavel_nome && (
                <p className="mt-1 text-xs text-red-400">{errors.responsavel_nome.message}</p>
              )}
            </div>

            {/* Telefone responsável */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Telefone do responsável <span className="text-red-600">*</span>
              </label>
              <input
                {...register("responsavel_telefone")}
                type="tel"
                placeholder="(11) 99999-9999"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
              />
              {errors.responsavel_telefone && (
                <p className="mt-1 text-xs text-red-400">{errors.responsavel_telefone.message}</p>
              )}
            </div>

            {/* Parentesco */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Grau de parentesco <span className="text-red-600">*</span>
              </label>
              <input
                {...register("responsavel_parentesco")}
                type="text"
                placeholder="Ex: Mãe, Pai, Tutor(a)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
              />
              {errors.responsavel_parentesco && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.responsavel_parentesco.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Observações */}
      <div className="bg-zinc-900 rounded-xl p-6 ring-1 ring-zinc-800">
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Observações</label>
        <textarea
          {...register("observacoes")}
          rows={3}
          placeholder="Alguma informação adicional que queira nos passar?"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 text-zinc-950 font-semibold py-3 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isSubmitting ? "Enviando..." : "Enviar inscrição"}
      </button>
    </form>
  )
}
