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

const fieldClassName =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"

const labelClassName = "mb-1.5 block text-sm font-medium text-foreground"

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
      <div className="rounded-[28px] border border-primary/16 bg-primary/6 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Inscrição enviada!</h3>
        <p className="text-muted-foreground">Sua inscrição foi recebida! Entraremos em contato em breve.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          Enviar outra inscrição
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="rounded-xl border border-secondary/18 bg-secondary/8 p-4 text-sm text-secondary">
          {submitError}
        </div>
      )}

      <div className="space-y-5 rounded-[28px] border border-border/80 bg-card p-6 shadow-[0_18px_36px_rgba(18,48,32,0.08)]">
        <h2 className="text-base font-semibold text-foreground">Dados Pessoais</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClassName}>
              Nome completo <span className="text-secondary">*</span>
            </label>
            <input
              {...register("nome_completo")}
              type="text"
              placeholder="Seu nome completo"
              className={fieldClassName}
            />
            {errors.nome_completo && (
              <p className="mt-1 text-xs text-secondary">{errors.nome_completo.message}</p>
            )}
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
            <label className={labelClassName}>Data de nascimento</label>
            <input {...register("data_nascimento")} type="date" className={fieldClassName} />
          </div>

          <div>
            <label className={labelClassName}>Modalidade de interesse</label>
            <select {...register("modalidade_interesse")} className={fieldClassName}>
              <option value="">Selecione uma modalidade</option>
              {modalidades.map((m) => (
                <option key={m.id} value={m.nome}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClassName}>Experiência prévia</label>
          <textarea
            {...register("experiencia_previa")}
            rows={3}
            placeholder="Descreva sua experiência com artes marciais (se houver)"
            className={`${fieldClassName} resize-none`}
          />
        </div>

        <div>
          <label className={labelClassName}>Situação atual</label>
          <select {...register("situacao_atual")} className={fieldClassName}>
            <option value="">Selecione...</option>
            <option value="estudante">Estudante</option>
            <option value="trabalhador">Trabalhador</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            {...register("eh_menor")}
            type="checkbox"
            id="eh_menor"
            className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary"
          />
          <label htmlFor="eh_menor" className="text-sm text-muted-foreground">
            O inscrito é menor de idade
          </label>
        </div>
      </div>

      {ehMenor && (
        <div className="space-y-5 rounded-[28px] border border-secondary/14 bg-card p-6 shadow-[0_18px_36px_rgba(18,48,32,0.08)]">
          <h2 className="text-base font-semibold text-foreground">
            Dados do Responsável Legal{" "}
            <span className="text-xs font-normal text-secondary">(obrigatório para menores)</span>
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClassName}>
                Nome do responsável <span className="text-secondary">*</span>
              </label>
              <input
                {...register("responsavel_nome")}
                type="text"
                placeholder="Nome completo do responsável"
                className={fieldClassName}
              />
              {errors.responsavel_nome && (
                <p className="mt-1 text-xs text-secondary">{errors.responsavel_nome.message}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>
                Telefone do responsável <span className="text-secondary">*</span>
              </label>
              <input
                {...register("responsavel_telefone")}
                type="tel"
                placeholder="(11) 99999-9999"
                className={fieldClassName}
              />
              {errors.responsavel_telefone && (
                <p className="mt-1 text-xs text-secondary">{errors.responsavel_telefone.message}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>
                Grau de parentesco <span className="text-secondary">*</span>
              </label>
              <input
                {...register("responsavel_parentesco")}
                type="text"
                placeholder="Ex: Mãe, Pai, Tutor(a)"
                className={fieldClassName}
              />
              {errors.responsavel_parentesco && (
                <p className="mt-1 text-xs text-secondary">{errors.responsavel_parentesco.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[28px] border border-border/80 bg-card p-6 shadow-[0_18px_36px_rgba(18,48,32,0.08)]">
        <label className={labelClassName}>Observações</label>
        <textarea
          {...register("observacoes")}
          rows={3}
          placeholder="Alguma informação adicional que queira nos passar?"
          className={`${fieldClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#124c29] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar inscrição"}
      </button>
    </form>
  )
}
