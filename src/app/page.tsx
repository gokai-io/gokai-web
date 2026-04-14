import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, CalendarDaysIcon, FileTextIcon, MapPinIcon } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { BrandLogo } from "@/components/branding/brand-logo"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"
import { Section } from "@/components/marketing/section"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { createClient } from "@/lib/supabase/server"
import { categoriaLabels, getAllArticles, type ArticleCategoria } from "@/lib/conteudos"
import type { Evento, EventoTipo, Modalidade, Patrocinador, PatrocinadorNivel } from "@/types/database"

// ─── Metadata ─────────────────────────────────────────────────────────────────

const HOME_TITLE = "GŌKAI – Associação de Artes Marciais"
const HOME_DESC  =
  "Associação de artes marciais com disciplina, honra, formação humana e compromisso institucional."

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: pageOpenGraph({ title: HOME_TITLE, description: HOME_DESC, path: "/", type: "website" }),
  twitter: { ...twitterCard, title: HOME_TITLE, description: HOME_DESC },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const eventoTipoLabel: Record<EventoTipo, string> = {
  campeonato: "Campeonato",
  seminario: "Seminário",
  treino_especial: "Treino Especial",
  social: "Social",
  outro: "Outro",
}
const nivelOrder: PatrocinadorNivel[] = ["ouro", "prata", "bronze", "apoiador"]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })
}

// ─── Data fetchers ─────────────────────────────────────────────────────────────

async function getModalidades(): Promise<Modalidade[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("modalidade").select("*").eq("ativa", true)
      .order("ordem", { ascending: true }).limit(6)
    return data ?? []
  } catch { return [] }
}
async function getProximosEventos(): Promise<Evento[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("evento").select("*").eq("publicado", true)
      .gte("data_inicio", new Date().toISOString())
      .order("data_inicio", { ascending: true }).limit(3)
    return data ?? []
  } catch { return [] }
}
async function getPatrocinadores(): Promise<Patrocinador[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("patrocinador").select("*")
      .eq("ativo", true).eq("exibir_site", true).limit(8)
    return data ?? []
  } catch { return [] }
}

// ─── Conteúdos teaser ─────────────────────────────────────────────────────────

function ConteudosTeaser() {
  const articles = getAllArticles().slice(0, 3)
  if (articles.length === 0) return null
  return (
    <Section
      className="bg-[var(--surface-midnight)]"
      title="Conteúdos e Formação"
      subtitle="A GŌKAI também se expressa fora do tatame: visão institucional, formação humana e cultura marcial."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <InstitutionalCard key={article.slug} accent="neutral" className="flex h-full flex-col gap-5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-ivory-muted)]">
              <span>{categoriaLabels[article.categoria as ArticleCategoria]}</span>
              <span>{article.leitura_min} min</span>
            </div>
            <h3 className="font-heading text-lg font-extrabold text-[var(--text-ivory)]">{article.titulo}</h3>
            <p className="flex-1 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">{article.resumo}</p>
            <Link
              href={`/conteudos/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-ivory)] hover:text-[var(--accent-gold)]"
            >
              Ler conteúdo <ArrowRightIcon className="size-4" />
            </Link>
          </InstitutionalCard>
        ))}
      </div>
    </Section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [modalidades, eventos, patrocinadores] = await Promise.all([
    getModalidades(), getProximosEventos(), getPatrocinadores(),
  ])
  const sortedPatrocinadores = nivelOrder.flatMap((n) =>
    patrocinadores.filter((p) => p.nivel === n)
  )

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — Cinematic Spotlight
            Centralized layout, deep emerald depth, premium seal.
        ═══════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[100svh] items-center justify-center gokai-hero-spotlight">
          <BrandContainer className="relative flex flex-col items-center justify-center py-28 text-center lg:py-32">
            
            {/* Logo Seal — Larger, centered with deep shadow */}
            <div
              className="gokai-hero-enter-scale relative mb-12 flex h-[340px] w-[340px] items-center justify-center rounded-full bg-white shadow-[0_48px_100px_rgba(0,0,0,0.8)]"
              style={{ animationDelay: "0ms" }}
            >
              <BrandLogo
                className="h-[220px] w-auto"
                priority
              />
            </div>

            {/* H1 — extrabold, centered, Ivory Silk */}
            <h1
              className="gokai-hero-enter font-extrabold tracking-[-0.03em] text-[var(--text-ivory)]"
              style={{
                animationDelay: "150ms",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                lineHeight: "1.1",
              }}
            >
              Disciplina.<br className="sm:hidden" /> Honra. GŌKAI.
            </h1>

            {/* Subtitle — maximum legibility */}
            <p
              className="gokai-hero-enter mt-8 max-w-2xl text-lg leading-[1.75] text-[var(--text-ivory-dim)]"
              style={{ animationDelay: "300ms" }}
            >
              Uma associação séria de artes marciais com formação técnica,
              valores éticos e estrutura institucional transparente para
              crianças, jovens e adultos.
            </p>

            {/* CTAs — Centralized with correct tones */}
            <div
              className="gokai-hero-enter mt-12 flex flex-wrap justify-center gap-4"
              style={{ animationDelay: "450ms" }}
            >
              <GokaiButton
                href="/inscricao"
                tone="primary"
                className="h-14 px-10 text-sm"
              >
                Quero me associar
              </GokaiButton>
              <GokaiButton
                href="/sobre"
                tone="outline"
                className="h-14 px-10 text-sm"
              >
                Conhecer a GŌKAI
              </GokaiButton>
            </div>
          </BrandContainer>
        </section>

        {/* ═══════════════════════════════════════════════════════
            INSTITUTIONAL PANELS — light section
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[var(--surface-obsidian)] py-24">
          <BrandContainer>

            {/* Section intro */}
            <div className="mb-16 max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--accent-gold)]" aria-hidden />
                <span
                  className="text-[var(--accent-gold)]"
                  style={{
                    fontFamily: "var(--font-outfit, var(--font-montserrat, system-ui))",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Sobre a Associação
                </span>
              </div>
              <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-[var(--text-ivory)] sm:text-5xl">
                Uma associação, não apenas um dojo.
              </h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                A GŌKAI representa disciplina marcial com responsabilidade pública, documentos
                institucionais claros e formação séria.
              </p>
            </div>

            {/* Connected triptych panels */}
            <div className="grid grid-cols-1 border border-[var(--accent-gold)]/15 md:grid-cols-3">
              {[
                {
                  num:    "01",
                  accentClass: "bg-[var(--accent-gold)]",
                  title:  "Identidade Institucional",
                  text:   "Estatuto, regimento, atas e memorandos organizados como parte visível e pública da associação.",
                  href:   "/transparencia",
                  cta:    "Ver documentos",
                  ctaClass: "text-[var(--accent-gold)]",
                },
                {
                  num:    "02",
                  accentClass: "bg-[var(--accent-carmine)]",
                  title:  "Formação Humana",
                  text:   "O treino está conectado a valores permanentes: respeito, honra, disciplina e evolução contínua.",
                  href:   "/sobre",
                  cta:    "Sobre a GŌKAI",
                  ctaClass: "text-[var(--accent-carmine)]",
                },
                {
                  num:    "03",
                  accentClass: "bg-[var(--text-ivory)]",
                  title:  "Estrutura Organizada",
                  text:   "Diretoria, conselho fiscal e equipe técnica com processos e linguagem pública coerente.",
                  href:   "/governanca",
                  cta:    "Ver governança",
                  ctaClass: "text-[var(--text-ivory)]",
                },
              ].map((panel) => (
                <div
                  key={panel.num}
                  className="group relative flex flex-col gap-6 bg-[var(--surface-obsidian)] p-8 md:p-10 border-b border-[var(--accent-gold)]/15 md:border-b-0 md:border-r last:border-0 transition-colors hover:bg-white/5"
                >
                  {/* Accent top bar */}
                  <div className={`absolute inset-x-0 top-0 h-1 ${panel.accentClass}`} />

                  <span
                    className="block text-[var(--text-ivory-muted)]"
                    style={{
                      fontFamily: "var(--font-outfit, var(--font-montserrat, system-ui))",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {panel.num}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-extrabold leading-snug text-[var(--text-ivory)]">
                      {panel.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                      {panel.text}
                    </p>
                  </div>

                  <Link
                    href={panel.href}
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors ${panel.ctaClass}`}
                  >
                    {panel.cta}
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </BrandContainer>
        </section>

        {/* ═══════════════════════════════════════════════════════
            MODALIDADES — DARK section for dramatic rhythm
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[var(--surface-midnight)] py-20">
          <BrandContainer>
            <div className="mb-14 max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--accent-gold)]" aria-hidden />
                <span
                  className="text-[var(--text-ivory-muted)]"
                  style={{
                    fontFamily: "var(--font-outfit, var(--font-montserrat, system-ui))",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  O que praticamos
                </span>
              </div>
              <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-[var(--text-ivory)] sm:text-5xl">
                Modalidades
              </h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                Artes marciais com seriedade técnica, progressão clara e acompanhamento constante
                para crianças, jovens e adultos.
              </p>
            </div>

            {modalidades.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {modalidades.map((modalidade) => (
                  <InstitutionalCard
                    key={modalidade.id}
                    accent="green"
                    dark
                    className="flex flex-col gap-4"
                  >
                    <h3 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">
                      {modalidade.nome}
                    </h3>
                    {modalidade.descricao && (
                      <p className="flex-1 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                        {modalidade.descricao}
                      </p>
                    )}
                    <Link
                      href={`/modalidades/${modalidade.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--accent-gold)]"
                    >
                      Conhecer modalidade
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </InstitutionalCard>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { title: "Artes Marciais", desc: "Modalidades com técnica progressiva e acompanhamento qualificado." },
                  { title: "Todas as idades", desc: "Turmas para crianças, jovens e adultos em todos os níveis." },
                  { title: "Formação completa", desc: "Técnica marcial aliada a valores éticos e crescimento pessoal." },
                ].map((item) => (
                  <InstitutionalCard key={item.title} accent="green" dark className="flex flex-col gap-3">
                    <h3 className="font-heading text-lg font-extrabold text-[var(--text-ivory)]">{item.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">{item.desc}</p>
                  </InstitutionalCard>
                ))}
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <GokaiButton href="/modalidades" tone="secondary" className="h-11 px-7 text-sm">
                Ver todas as modalidades
              </GokaiButton>
            </div>
          </BrandContainer>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GOVERNANÇA E TRANSPARÊNCIA — warm section
        ═══════════════════════════════════════════════════════ */}
        <Section
          className="bg-[var(--surface-obsidian)]"
          title="Governança e Transparência"
          subtitle="Documentos, atas e estrutura organizacional disponíveis para consulta pública."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InstitutionalCard accent="red" className="flex flex-col gap-5">
              <div className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]">
                <FileTextIcon className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">Documentos institucionais</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                  Estatuto social, regimento interno, ata de fundação e documentos públicos organizados.
                </p>
              </div>
              <GokaiButton href="/transparencia" tone="secondary" className="w-fit">
                Acessar transparência
              </GokaiButton>
            </InstitutionalCard>

            <InstitutionalCard accent="green" className="flex flex-col gap-5">
              <div className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--accent-carmine)]/10 text-[var(--accent-carmine)]">
                <MapPinIcon className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">Base física e comunidade</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                  Atividades em São Mateus, Juiz de Fora/MG, em espaço estruturado para prática de artes marciais.
                </p>
              </div>
              <GokaiButton href="/sobre" tone="outline" className="w-fit">
                Ver página institucional
              </GokaiButton>
            </InstitutionalCard>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            PRÓXIMOS EVENTOS — white section
        ═══════════════════════════════════════════════════════ */}
        {eventos.length > 0 && (
          <Section
            className="bg-[var(--surface-midnight)]"
            title="Próximos eventos"
            subtitle="Campeonatos, seminários e atividades na agenda da GŌKAI."
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {eventos.map((evento) => (
                <InstitutionalCard key={evento.id} accent="red" className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-ivory-muted)]">
                    <span>{eventoTipoLabel[evento.tipo]}</span>
                    <span>{formatDate(evento.data_inicio)}</span>
                  </div>
                  <h3 className="font-heading text-lg font-extrabold text-[var(--text-ivory)]">{evento.titulo}</h3>
                  {evento.descricao && (
                    <p className="flex-1 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">{evento.descricao}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-ivory-dim)]">
                    <CalendarDaysIcon className="size-4 text-[var(--accent-gold)]" />
                    <span>{formatDate(evento.data_inicio)}</span>
                  </div>
                </InstitutionalCard>
              ))}
            </div>
          </Section>
        )}

        {/* ═══════════════════════════════════════════════════════
            PARCEIROS — light section
        ═══════════════════════════════════════════════════════ */}
        {sortedPatrocinadores.length > 0 && (
          <Section
            className="bg-[var(--surface-midnight)]"
            title="Parceiros e apoiadores"
            subtitle="Quem caminha com a GŌKAI fortalece o projeto esportivo e a presença institucional da associação."
          >
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {sortedPatrocinadores.map((patrocinador) => (
                <InstitutionalCard key={patrocinador.id} accent="none" className="items-center p-5 text-center">
                  {patrocinador.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={patrocinador.logo_url}
                      alt={`Logo ${patrocinador.nome}`}
                      className="mx-auto h-16 max-w-full object-contain brightness-0 invert opacity-70 transition-all hover:opacity-100 hover:brightness-100 hover:invert-0"
                    />
                  ) : (
                    <div className="mx-auto flex h-16 w-full items-center justify-center bg-white/5 text-sm font-bold text-[var(--accent-carmine)]">
                      {patrocinador.nome}
                    </div>
                  )}
                  {patrocinador.logo_url && (
                    <p className="mt-3 text-sm font-bold text-[var(--text-ivory)]">{patrocinador.nome}</p>
                  )}
                </InstitutionalCard>
              ))}
            </div>
          </Section>
        )}

        {/* Conteúdos — warm section */}
        <ConteudosTeaser />

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA — dark with gradient divider
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[var(--surface-midnight)] py-24">
          {/* Gradient divider at top — brand signature */}
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, var(--accent-gold), transparent)" }}
            aria-hidden
          />

          <BrandContainer>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-8 bg-[var(--accent-gold)]" aria-hidden />
                  <span
                    className="text-[var(--text-ivory-muted)]"
                    style={{
                      fontFamily: "var(--font-outfit, var(--font-montserrat, system-ui))",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    GŌKAI
                  </span>
                </div>
                <h2 className="font-heading text-4xl font-extrabold leading-tight text-[var(--text-ivory)] sm:text-5xl">
                  Comece a sua jornada com disciplina e propósito.
                </h2>
                <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-[var(--text-ivory-dim)]">
                  Artes marciais sérias, formação humana e compromisso institucional.
                  Crianças, jovens e adultos bem-vindos.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <GokaiButton
                  href="/inscricao"
                  tone="primary"
                  className="h-12 px-8 text-sm"
                >
                  Fazer inscrição
                </GokaiButton>
                <GokaiButton
                  href="/contato"
                  tone="outline"
                  className="h-12 px-8 text-sm"
                >
                  Entrar em contato
                </GokaiButton>
              </div>
            </div>
          </BrandContainer>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
