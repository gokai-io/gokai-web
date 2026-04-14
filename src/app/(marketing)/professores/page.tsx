import type { Metadata } from "next"
import Link from "next/link"

import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/marketing/section"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import { professorSlug } from "@/lib/slug"
import type { ProfessorWithPessoa } from "@/types/database"

export const metadata: Metadata = {
  title: "Professores | GŌKAI",
  description: "Conheça os professores do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: { canonical: canonicalUrl("/professores") },
  openGraph: pageOpenGraph({
    title: "Professores | GŌKAI",
    description: "Profissionais experientes dedicados ao desenvolvimento de cada aluno no GŌKAI – Associação Esportiva e Ambiental.",
    path: "/professores",
  }),
  twitter: {
    ...twitterCard,
    title: "Professores | GŌKAI",
    description: "Profissionais experientes dedicados ao desenvolvimento de cada aluno no GŌKAI – Associação Esportiva e Ambiental.",
  },
}

function getInitials(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

export default async function ProfessoresPage() {
  const supabase = await createClient()

  const { data: professores } = await supabase
    .from("professor")
    .select("*, pessoa:pessoa(*)")
    .eq("exibir_site", true)
    .eq("status", "ativo")
    .order("created_at", { ascending: true })

  const list = (professores ?? []) as ProfessorWithPessoa[]

  return (
    <>
      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="text-center">
          <div className="gokai-kicker justify-center text-[var(--text-on-dark-secondary)]">Corpo Docente</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[var(--text-on-dark)] sm:text-5xl">
            Nossos Professores
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-on-dark-secondary)]">
            Profissionais experientes e comprometidos com o desenvolvimento técnico
            e humano de cada praticante.
          </p>
        </BrandContainer>
      </section>

      {/* Professors grid */}
      <Section className="bg-background">
        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((prof) => {
              const nome = prof.pessoa?.nome_completo ?? "Professor"
              const href = `/professores/${professorSlug(nome)}`

              return (
                <Link key={prof.id} href={href} className="group block">
                  <InstitutionalCard
                    accent="green"
                    className="flex h-full flex-col gap-0 !p-0"
                  >
                    {/* Avatar area */}
                    <div className="flex justify-center bg-primary/6 py-8">
                      {prof.pessoa?.foto_url ? (
                        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prof.pessoa.foto_url}
                            alt={nome}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
                          <span className="font-heading text-3xl font-bold text-primary">
                            {getInitials(nome)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                          {nome}
                        </h3>
                        {prof.graduacao && (
                          <p className="mt-0.5 text-sm font-medium text-secondary">
                            {prof.graduacao}
                          </p>
                        )}
                      </div>

                      {prof.especialidades && prof.especialidades.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {prof.especialidades.map((esp) => (
                            <Badge
                              key={esp}
                              variant="outline"
                              className="border-primary/20 text-primary/70 text-xs"
                            >
                              {esp}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {prof.bio && (
                        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {truncate(prof.bio, 160)}
                        </p>
                      )}

                      <span className="mt-auto pt-2 text-xs font-semibold text-primary/60 transition-colors group-hover:text-primary">
                        Ver perfil →
                      </span>
                    </div>
                  </InstitutionalCard>
                </Link>
              )
            })}
          </div>
        ) : (
          <InstitutionalCard accent="neutral">
            <p className="text-center text-muted-foreground">
              Em breve você conhecerá nossa equipe técnica.
            </p>
          </InstitutionalCard>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-surface-dark text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-[var(--text-on-dark)]">
            Quer treinar com nossos professores?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-on-dark-secondary)]">
            Faça sua inscrição e comece sua jornada nas artes marciais com
            acompanhamento técnico de qualidade.
          </p>
          <div className="mt-8">
            <GokaiButton href="/inscricao" tone="secondary">
              Iniciar minha jornada
            </GokaiButton>
          </div>
        </div>
      </Section>
    </>
  )
}
