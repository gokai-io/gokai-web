import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Section } from "@/components/marketing/section"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import type { Modalidade, Turma } from "@/types/database"

export const metadata: Metadata = {
  title: "Modalidades | GŌKAI",
  description: "Conheça as modalidades de artes marciais oferecidas pelo GŌKAI.",
  alternates: { canonical: canonicalUrl("/modalidades") },
  openGraph: pageOpenGraph({
    title: "Modalidades | GŌKAI",
    description: "Conheça as modalidades de artes marciais oferecidas pelo GŌKAI. Aulas para todas as idades e níveis de experiência.",
    path: "/modalidades",
  }),
  twitter: {
    ...twitterCard,
    title: "Modalidades | GŌKAI",
    description: "Conheça as modalidades de artes marciais oferecidas pelo GŌKAI. Aulas para todas as idades e níveis de experiência.",
  },
}

export default async function ModalidadesPage() {
  const supabase = await createClient()

  const { data: modalidadesRaw } = await supabase
    .from("modalidade")
    .select("*")
    .eq("ativa", true)
    .order("ordem", { ascending: true, nullsFirst: false })

  const modalidades = (modalidadesRaw ?? []) as Modalidade[]

  const turmasCounts: Record<string, number> = {}
  if (modalidades.length > 0) {
    const { data: turmasRaw } = await supabase
      .from("turma")
      .select("modalidade_id")
      .eq("status", "ativa")

    const turmas = (turmasRaw ?? []) as Pick<Turma, "modalidade_id">[]
    for (const turma of turmas) {
      turmasCounts[turma.modalidade_id] = (turmasCounts[turma.modalidade_id] ?? 0) + 1
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="text-center">
          <div className="gokai-kicker justify-center text-white/68">O que praticamos</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Modalidades
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Diferentes modalidades de artes marciais para todas as idades e níveis de experiência,
            com acompanhamento técnico sério.
          </p>
        </BrandContainer>
      </section>

      {/* Modalidades grid */}
      <Section className="bg-background">
        {modalidades.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modalidades.map((modalidade) => {
              const turmaCount = turmasCounts[modalidade.id] ?? 0
              const detailHref = modalidade.slug
                ? `/modalidades/${modalidade.slug}`
                : "/modalidades"

              return (
                <InstitutionalCard
                  key={modalidade.id}
                  accent="green"
                  className="group flex flex-col gap-4 overflow-hidden !p-0"
                >
                  {/* Image or brand placeholder */}
                  <Link href={detailHref} className="block overflow-hidden">
                    {modalidade.imagem_url ? (
                      <div className="relative h-48 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={modalidade.imagem_url}
                          alt={modalidade.nome}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-primary/8">
                        <span className="font-heading text-5xl font-black tracking-widest text-primary/25">
                          {modalidade.nome.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={detailHref}>
                        <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {modalidade.nome}
                        </h3>
                      </Link>
                      {turmaCount > 0 && (
                        <div className="mt-1 flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{turmaCount} {turmaCount === 1 ? "turma" : "turmas"}</span>
                        </div>
                      )}
                    </div>

                    {modalidade.descricao && (
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {modalidade.descricao}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-5">
                      <Link
                        href={detailHref}
                        className="gokai-link-arrow text-sm"
                      >
                        Saiba mais
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/inscricao"
                        className="text-sm font-semibold text-secondary transition-colors hover:text-secondary/80"
                      >
                        Inscrever-se →
                      </Link>
                    </div>
                  </div>
                </InstitutionalCard>
              )
            })}
          </div>
        ) : (
          <InstitutionalCard accent="neutral">
            <p className="text-center text-muted-foreground">
              Novas modalidades serão disponibilizadas em breve.
            </p>
          </InstitutionalCard>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-[#0C2418] text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-white">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Escolha sua modalidade e faça sua inscrição. Nossa equipe entrará em contato.
          </p>
          <div className="mt-8">
            <GokaiButton href="/inscricao" tone="secondary">
              Iniciar minha jornada
            </GokaiButton>
          </div>
        </div>
      </Section>

      {/* Editorial cross-link */}
      <Section className="bg-[#EEE7D9]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="min-w-0 flex-1">
            <div className="gokai-kicker text-primary/62">Biblioteca GŌKAI</div>
            <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
              Ainda em dúvida sobre qual modalidade escolher?
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Nosso guia editorial cobre desde os primeiros passos até a filosofia por trás das
              artes marciais.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            {[
              { href: "/conteudos/como-escolher-a-modalidade-ideal", label: "Como escolher a modalidade ideal", accent: "bg-secondary" },
              { href: "/conteudos/o-que-esperar-da-primeira-aula", label: "O que esperar da primeira aula", accent: "bg-primary/40" },
            ].map(({ href, label, accent }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-card px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/25 hover:bg-primary/4"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent}`} />
                {label}
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
            <Link
              href="/conteudos"
              className="pt-1 text-right text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Ver toda a biblioteca →
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
