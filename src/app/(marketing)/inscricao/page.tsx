import type { Metadata } from "next"

import { InstitutionalCard } from "@/components/branding/institutional-card"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import type { Modalidade } from "@/types/database"
import { InscricaoForm } from "./inscricao-form"

export const metadata: Metadata = {
  title: "Inscreva-se | GŌKAI",
  description: "Faça sua inscrição no GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/inscricao"),
  },
  openGraph: pageOpenGraph({
    title: "Inscreva-se | GŌKAI",
    description: "Dê o primeiro passo. Faça sua inscrição no GŌKAI e comece sua jornada nas artes marciais.",
    path: "/inscricao",
  }),
  twitter: {
    ...twitterCard,
    title: "Inscreva-se | GŌKAI",
    description: "Dê o primeiro passo. Faça sua inscrição no GŌKAI e comece sua jornada nas artes marciais.",
  },
}

export default async function InscricaoPage() {
  const supabase = await createClient()

  const { data: modalidades } = await supabase
    .from("modalidade")
    .select("id, nome, slug")
    .eq("ativa", true)
    .order("ordem", { ascending: true, nullsFirst: false })

  const list = (modalidades ?? []) as Modalidade[]

  return (
    <div className="min-h-screen">
      <section className="gokai-hero gokai-hero-compact">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="gokai-kicker justify-center text-[var(--text-on-dark-secondary)]">Inicie sua formação</p>
          <h1 className="mt-5 text-4xl font-semibold text-[var(--text-on-dark)] sm:text-5xl">Inscreva-se</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-on-dark-secondary)]">
            O GŌKAI é um ambiente sério de formação marcial. Preencha o formulário e nossa equipe
            entrará em contato para dar sequência à sua matrícula.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 pt-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <InstitutionalCard accent="green">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Seja um Associado</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Faça parte da GŌKAI e evolua nas artes marciais.
              </p>
            </InstitutionalCard>

            <InstitutionalCard accent="red">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Como participar</h2>
              <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>1. Preencher ficha cadastral</li>
                <li>2. Assinar termo de adesão</li>
                <li>3. Aprovação pela diretoria</li>
              </ol>
            </InstitutionalCard>

            <InstitutionalCard accent="neutral">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Benefícios</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>Participação em treinos e eventos</li>
                <li>Direito a voto</li>
                <li>Acesso à comunidade</li>
              </ul>
            </InstitutionalCard>
          </div>

          <InstitutionalCard accent="green" className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Requisitos</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>Cumprir o estatuto</li>
              <li>Estar em dia com contribuições</li>
              <li>Respeitar as normas</li>
            </ul>
          </InstitutionalCard>

          <div className="mx-auto max-w-2xl">
            <InscricaoForm modalidades={list} />
          </div>
        </div>
      </section>
    </div>
  )
}
