import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { Landmark, Shield, Users, Handshake, FileText, ArrowRight, MapPin } from "lucide-react"
import {
  getDocumentosBySecao,
  secaoMeta,
  secaoOrder,
  type SecaoTransparencia,
} from "@/lib/transparencia"

export const metadata: Metadata = {
  title: "Transparência | GŌKAI",
  description: "Acesso aos documentos institucionais do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: { canonical: canonicalUrl("/transparencia") },
  openGraph: pageOpenGraph({
    title: "Transparência | GŌKAI",
    description: "Documentos institucionais, estatuto, governança e prestação de contas da GŌKAI.",
    path: "/transparencia",
  }),
  twitter: {
    ...twitterCard,
    title: "Transparência | GŌKAI",
    description: "Documentos institucionais, estatuto, governança e prestação de contas da GŌKAI.",
  },
}

const secaoIcon: Record<SecaoTransparencia, typeof Landmark> = {
  fundacionais: Landmark,
  governanca: Shield,
  associacao: Users,
  estrutura: Handshake,
}

export default function TransparenciaPage() {
  const grouped = getDocumentosBySecao()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer className="text-center">
          <div className="gokai-kicker justify-center mb-4">Prestação de Contas</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-ivory)]">
            Transparência
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--text-ivory-dim)] leading-relaxed">
            Acesso público aos documentos institucionais da GŌKAI. Comprometidos
            com gestão transparente, responsável e acessível.
          </p>
        </BrandContainer>
      </section>

      {/* ── Document index — paper background ────────────────── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {secaoOrder.map((secao, secaoIdx) => {
              const docs = grouped[secao]
              if (docs.length === 0) return null

              const Icon = secaoIcon[secao]
              const meta = secaoMeta[secao]
              const isLast = secaoIdx === secaoOrder.length - 1

              return (
                <div key={secao}>
                  {/* Section header */}
                  <div className="px-8 sm:px-12 pt-10 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="size-5 text-[var(--accent-carmine)]" strokeWidth={2} />
                      <h2 className="font-heading text-xl font-extrabold text-[var(--surface-midnight)] tracking-tight">
                        {meta.titulo}
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--surface-midnight)]/60 leading-relaxed ml-8">
                      {meta.descricao}
                    </p>
                  </div>

                  {/* Document list */}
                  <div className="px-8 sm:px-12 pb-6">
                    {docs.map((doc, docIdx) => {
                      const isUsoDaSede = doc.id === "00000000-0000-0000-0000-000000000604"

                      return (
                        <div
                          key={doc.id}
                          className={`py-5 ${docIdx < docs.length - 1 ? "border-b border-[var(--surface-midnight)]/6" : ""}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[var(--surface-midnight)]/5">
                              <FileText className="size-4 text-[var(--surface-midnight)]/50" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-bold text-[var(--surface-midnight)] leading-snug">
                                {doc.titulo}
                              </h3>
                              {doc.descricao && (
                                <p className="mt-1.5 text-sm text-[var(--surface-midnight)]/60 leading-relaxed">
                                  {doc.descricao}
                                </p>
                              )}

                              {/* Uso da Sede — inline address */}
                              {isUsoDaSede && (
                                <div className="mt-3 flex items-start gap-2 rounded-lg bg-[var(--surface-midnight)]/[0.03] px-4 py-3">
                                  <MapPin className="size-4 text-[var(--accent-carmine)] mt-0.5 shrink-0" />
                                  <div className="text-sm text-[var(--surface-midnight)]/70 leading-relaxed">
                                    <span className="font-semibold text-[var(--surface-midnight)]/80">Rua Melo Franco, 68</span>
                                    <br />
                                    São Mateus — Juiz de Fora/MG
                                    <br />
                                    <span className="text-xs text-[var(--surface-midnight)]/50">
                                      Imóvel de propriedade do presidente, sublocado para a GŌKAI.
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Action */}
                              {doc.conteudo && (
                                <Link
                                  href={`/transparencia/${doc.id}`}
                                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-carmine)] hover:brightness-125 transition-all"
                                >
                                  Visualizar documento
                                  <ArrowRight className="size-3.5" />
                                </Link>
                              )}
                              {!doc.conteudo && (
                                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--surface-midnight)]/35">
                                  Em elaboração
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Section divider */}
                  {!isLast && (
                    <div className="mx-8 sm:mx-12 h-px bg-[var(--surface-midnight)]/8" />
                  )}
                </div>
              )
            })}
          </div>
        </BrandContainer>
      </section>

      {/* ── Solicitação ─────────────────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-16">
        <BrandContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">
              Solicitação de Documentos
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-ivory-dim)]">
              Caso necessite de algum documento não listado aqui, entre em contato conosco.
              Atendemos às solicitações conforme previsto em nosso estatuto social.
            </p>
            <div className="mt-6">
              <GokaiButton href="/contato" tone="primary">
                Entrar em contato
              </GokaiButton>
            </div>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
