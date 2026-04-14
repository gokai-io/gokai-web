import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import { BrandContainer } from "@/components/branding/brand-container"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Section } from "@/components/marketing/section"
import type { CargoDiretoria, DiretorWithAssociado } from "@/types/database"

// Local type for conselheiro_fiscal with joined associado/pessoa
interface ConselheiroFiscalWithAssociado {
  id: string
  associado_id: string
  cargo: string
  data_inicio: string
  data_fim: string | null
  ativo: boolean
  created_at?: string
  updated_at?: string
  associado: { pessoa?: { nome_completo?: string } } | null
}

export const metadata: Metadata = {
  title: "Governança | GŌKAI",
  description: "Estrutura diretiva e conselho fiscal do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/governanca"),
  },
  openGraph: pageOpenGraph({
    title: "Governança | GŌKAI",
    description: "Conheça a estrutura diretiva e o conselho fiscal do GŌKAI – Associação Esportiva e Ambiental.",
    path: "/governanca",
  }),
  twitter: {
    ...twitterCard,
    title: "Governança | GŌKAI",
    description: "Conheça a estrutura diretiva e o conselho fiscal do GŌKAI – Associação Esportiva e Ambiental.",
  },
}

const cargoLabels: Record<CargoDiretoria, string> = {
  presidente: "Presidente",
  vice_presidente: "Vice-Presidente",
  diretor_administrativo: "Diretor Administrativo",
  diretor_financeiro: "Diretor Financeiro",
  diretor_tecnico_esportivo: "Diretor Técnico Esportivo",
}

function formatDateRange(inicio: string, fim: string | null): string {
  const start = new Date(inicio).getFullYear()
  if (!fim) return `${start} – presente`
  const end = new Date(fim).getFullYear()
  return `${start} – ${end}`
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

export default async function GovernancaPage() {
  const supabase = await createClient()

  const { data: diretoresRaw } = await supabase
    .from("diretor")
    .select("*, associado:associado(*, pessoa:pessoa(*))")
    .eq("ativo", true)
    .order("cargo", { ascending: true })

  const { data: conselheirosRaw } = await supabase
    .from("conselheiro_fiscal")
    .select("*, associado:associado(*, pessoa:pessoa(*))")
    .eq("ativo", true)
    .order("data_inicio", { ascending: false })

  const diretores = (diretoresRaw ?? []) as DiretorWithAssociado[]
  const conselheiros = (conselheirosRaw ?? []) as ConselheiroFiscalWithAssociado[]

  return (
    <>
      {/* Hero — brand-consistent dark green */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="relative text-center">
          <div className="gokai-kicker text-[var(--text-on-dark-secondary)] justify-center">Institucional</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[var(--text-on-dark)] sm:text-5xl">
            Governança
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-on-dark-secondary)]">
            Estrutura diretiva do GŌKAI – Associação Esportiva e Ambiental
          </p>
        </BrandContainer>
      </section>

      {/* Estrutura organizacional */}
      <Section
        className="bg-background"
        title="Estrutura Organizacional"
        subtitle="Visão geral da organização institucional da GŌKAI."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <InstitutionalCard accent="green">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Assembleia Geral</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Órgão máximo de decisão.
            </p>
          </InstitutionalCard>

          <InstitutionalCard accent="red">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Diretoria Executiva</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>Presidente</li>
              <li>Vice-Presidente</li>
              <li>Diretor Administrativo</li>
              <li>Diretor Financeiro</li>
              <li>Diretor Técnico</li>
            </ul>
          </InstitutionalCard>

          <InstitutionalCard accent="neutral">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Conselho Fiscal</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Responsável pela fiscalização financeira.
            </p>
          </InstitutionalCard>

          <InstitutionalCard accent="green">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Equipe Técnica</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Professores e instrutores responsáveis pelos treinos.
            </p>
          </InstitutionalCard>
        </div>
      </Section>

      {/* Diretoria */}
      <Section
        className="bg-surface-warm"
        title="Diretoria"
        subtitle="Os membros eleitos responsáveis pela gestão e direção da associação."
      >
        {diretores.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diretores.map((diretor) => {
              const pessoa = (diretor.associado as { pessoa?: { nome_completo?: string } } | null)?.pessoa
              const nome = pessoa?.nome_completo ?? "Nome não informado"
              const cargo = diretor.cargo as CargoDiretoria
              const mandato = formatDateRange(diretor.data_inicio, diretor.data_fim)

              return (
                <InstitutionalCard
                  key={diretor.id}
                  accent="green"
                  className="flex flex-col items-center gap-4 text-center"
                >
                  {/* Avatar initials */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
                    <span className="text-2xl font-bold text-primary">
                      {getInitials(nome)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{nome}</h3>
                    <p className="mt-1 text-sm font-medium text-primary/80">
                      {cargoLabels[cargo] ?? cargo}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">Mandato: {mandato}</p>
                  </div>
                </InstitutionalCard>
              )
            })}
          </div>
        ) : (
          <InstitutionalCard accent="neutral">
            <p className="text-center text-muted-foreground">
              Em estruturação. Novas informações serão disponibilizadas em breve.
            </p>
          </InstitutionalCard>
        )}
      </Section>

      {/* Conselho Fiscal */}
      <Section
        className="bg-background"
        title="Conselho Fiscal"
        subtitle="Os conselheiros responsáveis pela fiscalização das contas e atos da diretoria."
      >
        {conselheiros.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {conselheiros.map((conselheiro) => {
              const pessoa = (conselheiro.associado as { pessoa?: { nome_completo?: string } } | null)?.pessoa
              const nome = pessoa?.nome_completo ?? "Nome não informado"
              const mandato = formatDateRange(conselheiro.data_inicio, conselheiro.data_fim)

              return (
                <InstitutionalCard
                  key={conselheiro.id}
                  accent="red"
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary/20 bg-secondary/10">
                    <span className="text-xl font-bold text-secondary">
                      {getInitials(nome)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground">{nome}</h3>
                    <p className="mt-1 text-sm font-medium text-secondary/80">
                      {conselheiro.cargo ?? "Conselheiro Fiscal"}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">Mandato: {mandato}</p>
                  </div>
                </InstitutionalCard>
              )
            })}
          </div>
        ) : (
          <InstitutionalCard accent="neutral">
            <p className="text-center text-muted-foreground">
              Em estruturação. Novas informações serão disponibilizadas em breve.
            </p>
          </InstitutionalCard>
        )}
      </Section>
    </>
  )
}
