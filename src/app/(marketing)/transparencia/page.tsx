import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import { BrandContainer } from "@/components/branding/brand-container"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { GokaiButton } from "@/components/branding/gokai-button"
import { Section } from "@/components/marketing/section"
import { FileText, Download } from "lucide-react"
import type { Transparencia, TransparenciaTipo } from "@/types/database"

export const metadata: Metadata = {
  title: "Transparência | GŌKAI",
  description: "Acesso aos documentos institucionais do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/transparencia"),
  },
  openGraph: pageOpenGraph({
    title: "Transparência | GŌKAI",
    description: "Acesso aos documentos institucionais do GŌKAI: atas, balanços, relatórios e estatuto da associação.",
    path: "/transparencia",
  }),
  twitter: {
    ...twitterCard,
    title: "Transparência | GŌKAI",
    description: "Acesso aos documentos institucionais do GŌKAI: atas, balanços, relatórios e estatuto da associação.",
  },
}

const tipoLabels: Record<TransparenciaTipo, string> = {
  ata: "Atas",
  balanco: "Balanços",
  relatorio: "Relatórios",
  estatuto: "Estatuto",
  outro: "Outros",
}

const tipoAccent: Record<TransparenciaTipo, "green" | "red" | "neutral"> = {
  estatuto: "green",
  ata: "red",
  balanco: "neutral",
  relatorio: "green",
  outro: "neutral",
}

const tipoOrder: TransparenciaTipo[] = ["estatuto", "ata", "balanco", "relatorio", "outro"]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })
}

export default async function TransparenciaPage() {
  const supabase = await createClient()

  const { data: documentos } = await supabase
    .from("transparencia")
    .select("*")
    .eq("publicado", true)
    .order("data_referencia", { ascending: false })

  const list = (documentos ?? []) as Transparencia[]

  // Group by tipo
  const grouped: Partial<Record<TransparenciaTipo, Transparencia[]>> = {}
  for (const doc of list) {
    const tipo = doc.tipo as TransparenciaTipo
    if (!grouped[tipo]) grouped[tipo] = []
    grouped[tipo]!.push(doc)
  }

  const sections = tipoOrder.filter((tipo) => (grouped[tipo]?.length ?? 0) > 0)

  return (
    <>
      {/* Hero — brand-consistent dark green */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="relative text-center">
          <div className="gokai-kicker text-white/68 justify-center">Prestação de Contas</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Transparência
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Acesso aos documentos institucionais do GŌKAI. Comprometidos com a gestão transparente
            e responsável.
          </p>
        </BrandContainer>
      </section>

      {/* Documents */}
      <Section className="bg-background">
        {sections.length > 0 ? (
          <div className="space-y-16">
            {sections.map((tipo) => {
              const docs = grouped[tipo] ?? []
              const accent = tipoAccent[tipo]
              return (
                <div key={tipo}>
                  {/* Section divider */}
                  <div className="mb-8 flex items-center gap-4">
                    <span className="h-px flex-1 bg-border" aria-hidden />
                    <h2 className="font-heading text-xl font-semibold whitespace-nowrap text-foreground">
                      {tipoLabels[tipo]}
                    </h2>
                    <span className="h-px flex-1 bg-border" aria-hidden />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {docs.map((doc) => (
                      <InstitutionalCard
                        key={doc.id}
                        accent={accent}
                        className="flex items-start gap-4 hover:border-primary/20 transition-colors"
                      >
                        {/* File icon */}
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/8 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold leading-snug text-foreground">
                            {doc.titulo}
                          </h3>
                          <p className="mt-1 text-xs capitalize text-muted-foreground">
                            {formatDate(doc.data_referencia)}
                          </p>
                          {doc.descricao && (
                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                              {doc.descricao}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap items-center gap-4">
                            {doc.conteudo && (
                              <Link
                                href={`/transparencia/${doc.id}`}
                                className="gokai-link-arrow text-xs"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                Ler documento
                              </Link>
                            )}
                            {doc.arquivo_url && (
                              <a
                                href={doc.arquivo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gokai-link-arrow text-xs"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Baixar
                              </a>
                            )}
                          </div>
                        </div>
                      </InstitutionalCard>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground">
              Novos documentos serão disponibilizados em breve.
            </p>
          </div>
        )}
      </Section>

      {/* Info box */}
      <Section className="bg-[#EEE7D9]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Solicitação de Documentos
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Caso necessite de algum documento não listado aqui, entre em contato conosco.
            Atendemos às solicitações conforme previsto em nosso estatuto social.
          </p>
          <div className="mt-6">
            <GokaiButton href="/contato" tone="primary">
              Entrar em contato
            </GokaiButton>
          </div>
        </div>
      </Section>
    </>
  )
}
