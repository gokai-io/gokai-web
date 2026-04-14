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

const HOME_TITLE = "GŌKAI – Associação de Artes Marciais"
const HOME_DESC =
  "Associação de artes marciais com disciplina, honra, formação humana e compromisso institucional."

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: pageOpenGraph({
    title: HOME_TITLE,
    description: HOME_DESC,
    path: "/",
    type: "website",
  }),
  twitter: {
    ...twitterCard,
    title: HOME_TITLE,
    description: HOME_DESC,
  },
}

const eventoTipoLabel: Record<EventoTipo, string> = {
  campeonato: "Campeonato",
  seminario: "Seminário",
  treino_especial: "Treino Especial",
  social: "Social",
  outro: "Outro",
}

const nivelOrder: PatrocinadorNivel[] = ["ouro", "prata", "bronze", "apoiador"]

async function getModalidades(): Promise<Modalidade[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("modalidade")
      .select("*")
      .eq("ativa", true)
      .order("ordem", { ascending: true })
      .limit(6)
    return data ?? []
  } catch {
    return []
  }
}

async function getProximosEventos(): Promise<Evento[]> {
  try {
    const supabase = await createClient()
    const now = new Date().toISOString()
    const { data } = await supabase
      .from("evento")
      .select("*")
      .eq("publicado", true)
      .gte("data_inicio", now)
      .order("data_inicio", { ascending: true })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

async function getPatrocinadores(): Promise<Patrocinador[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("patrocinador")
      .select("*")
      .eq("ativo", true)
      .eq("exibir_site", true)
      .limit(8)
    return data ?? []
  } catch {
    return []
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  })
}

function ConteudosTeaser() {
  const articles = getAllArticles().slice(0, 3)
  if (articles.length === 0) return null

  return (
    <Section
      className="bg-[#EEE7D9]"
      title="Conteúdos e Formação"
      subtitle="A GŌKAI também se expressa fora do tatame: visão institucional, formação humana e cultura marcial."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <InstitutionalCard key={article.slug} accent="neutral" className="flex h-full flex-col gap-5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-primary/58">
              <span>{categoriaLabels[article.categoria as ArticleCategoria]}</span>
              <span>{article.leitura_min} min</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">{article.titulo}</h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{article.resumo}</p>
            <Link
              href={`/conteudos/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
            >
              Ler conteúdo
              <ArrowRightIcon className="size-4" />
            </Link>
          </InstitutionalCard>
        ))}
      </div>
    </Section>
  )
}

export default async function HomePage() {
  const [modalidades, eventos, patrocinadores] = await Promise.all([
    getModalidades(),
    getProximosEventos(),
    getPatrocinadores(),
  ])

  const sortedPatrocinadores = nivelOrder.flatMap((nivel) =>
    patrocinadores.filter((item) => item.nivel === nivel)
  )

  return (
    <div className="gokai-page-shell min-h-screen">
      <SiteHeader />

      <main>
        <section className="gokai-hero min-h-[92vh]">
          <BrandContainer className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">

              {/* Left column — text content with staggered entrance */}
              <div className="max-w-3xl">
                <div
                  className="gokai-kicker gokai-hero-enter text-white/72"
                  style={{ animationDelay: "80ms" }}
                >
                  Disciplina • Honra • Formação Humana
                </div>

                <h1
                  className="gokai-hero-enter mt-5 text-balance font-heading text-5xl font-bold leading-[0.92] text-white sm:text-6xl lg:text-7xl"
                  style={{ animationDelay: "200ms" }}
                >
                  Artes marciais com honra, tradição e rigor institucional.
                </h1>

                <p
                  className="gokai-hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl"
                  style={{ animationDelay: "340ms" }}
                >
                  A GŌKAI é uma associação séria de artes marciais — com disciplina real, formação
                  humana e estrutura institucional transparente para crianças, jovens e adultos.
                </p>

                <div
                  className="gokai-hero-enter mt-10 flex flex-col gap-4 sm:flex-row"
                  style={{ animationDelay: "460ms" }}
                >
                  <GokaiButton href="/inscricao" tone="primary" className="h-12 px-7 text-sm uppercase tracking-[0.18em]">
                    Quero me associar
                  </GokaiButton>
                  <GokaiButton href="/transparencia" tone="outline" className="h-12 px-7 border-white/18 text-white hover:bg-white/10 hover:text-white text-sm uppercase tracking-[0.18em]">
                    Ver documentos
                  </GokaiButton>
                </div>

                <div
                  className="gokai-hero-enter mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
                  style={{ animationDelay: "580ms" }}
                >
                  {[
                    { label: "Missão",  value: "Qualidade técnica e valores éticos" },
                    { label: "Sede",    value: "São Mateus, Juiz de Fora/MG" },
                    { label: "Foco",    value: "Combate, formação e comunidade" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/16 bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <p className="gokai-kicker text-white/50">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — brand mark */}
              <div
                className="gokai-hero-enter-scale flex justify-center lg:justify-end"
                style={{ animationDelay: "300ms" }}
              >
                {/* Clean container — no clutter, let the mark breathe */}
                <div className="relative">
                  {/* Outer decorative ring — suggests the rising sun */}
                  <div className="absolute -inset-6 rounded-full border border-white/8 opacity-60" />
                  <div className="absolute -inset-12 rounded-full border border-white/4 opacity-40" />

                  {/* Mark container */}
                  <div className="relative rounded-3xl border border-white/14 bg-white/8 p-4 shadow-[0_32px_80px_rgba(4,16,8,0.45)] backdrop-blur-sm">
                    <BrandLogo
                      variant="full"
                      className="h-[16rem] w-[16rem] rounded-2xl sm:h-[20rem] sm:w-[20rem]"
                      priority
                      sizes="(min-width: 1024px) 320px, 256px"
                    />
                  </div>

                  {/* Small floating tag — bottom right, not overlapping */}
                  <div className="absolute -bottom-4 -right-4 rounded-2xl border border-white/14 bg-[#0B5A2B] px-4 py-3 shadow-[0_12px_32px_rgba(4,16,8,0.5)]">
                    <p className="gokai-kicker text-white/55">Juiz de Fora · MG</p>
                    <p className="mt-1 text-xs font-semibold text-white">Fundada em 2024</p>
                  </div>
                </div>
              </div>

            </div>
          </BrandContainer>
        </section>

        <Section
          className="bg-background"
          title="Uma associação, não apenas um dojo"
          subtitle="A marca GŌKAI representa disciplina marcial com responsabilidade pública, documentos institucionais claros e formação séria."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: "Identidade Institucional",
                text: "Estatuto, regimento, atas e memorandos organizados como parte visível da associação.",
                accent: "green" as const,
              },
              {
                title: "Formação Humana",
                text: "O treino está conectado a valores permanentes: respeito, honra, disciplina e evolução.",
                accent: "red" as const,
              },
              {
                title: "Estrutura Organizada",
                text: "Diretoria, conselho fiscal, equipe técnica e processos com linguagem pública coerente.",
                accent: "neutral" as const,
              },
            ].map((item) => (
              <InstitutionalCard key={item.title} accent={item.accent}>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </InstitutionalCard>
            ))}
          </div>
        </Section>

        <Section
          className="bg-[#EEE7D9]"
          title="Modalidades"
          subtitle="A formação técnica da GŌKAI combina seriedade, progressão e acompanhamento consistente."
        >
          {modalidades.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modalidades.map((modalidade) => (
                <InstitutionalCard key={modalidade.id} accent="green" className="flex h-full flex-col gap-4">
                  <div className="gokai-pill w-fit">Treinamento</div>
                  <h3 className="text-2xl font-semibold text-foreground">{modalidade.nome}</h3>
                  {modalidade.descricao && (
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{modalidade.descricao}</p>
                  )}
                  <Link
                    href={`/modalidades/${modalidade.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
                  >
                    Conhecer modalidade
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </InstitutionalCard>
              ))}
            </div>
          ) : (
            <InstitutionalCard accent="neutral">
              <p className="text-sm leading-relaxed text-muted-foreground">
                As modalidades serão publicadas em breve, com programação e detalhes técnicos.
              </p>
            </InstitutionalCard>
          )}
        </Section>

        <Section
          className="bg-background"
          title="Governança e Transparência"
          subtitle="A visualidade da marca também precisa sustentar a seriedade documental da associação."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InstitutionalCard accent="red" className="flex flex-col gap-4">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <FileTextIcon className="size-5" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Documentos institucionais</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Estatuto social, regimento interno, ata de fundação e documentos públicos em uma
                leitura coerente com a marca.
              </p>
              <GokaiButton href="/transparencia" tone="secondary" className="w-fit">
                Acessar transparência
              </GokaiButton>
            </InstitutionalCard>

            <InstitutionalCard accent="green" className="flex flex-col gap-4">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPinIcon className="size-5" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Base física e comunidade</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Atividades em São Mateus, Juiz de Fora/MG, em espaço estruturado para prática de
                artes marciais e desenvolvimento humano.
              </p>
              <GokaiButton href="/sobre" tone="outline" className="w-fit">
                Ver página institucional
              </GokaiButton>
            </InstitutionalCard>
          </div>
        </Section>

        <Section
          className="bg-[#EEE7D9]"
          title="Próximos eventos"
          subtitle="A presença pública da GŌKAI também passa por agenda organizada e comunicação clara."
        >
          {eventos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {eventos.map((evento) => (
                <InstitutionalCard key={evento.id} accent="red" className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-primary/58">
                    <span>{eventoTipoLabel[evento.tipo]}</span>
                    <span>{formatDate(evento.data_inicio)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{evento.titulo}</h3>
                  {evento.descricao && (
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{evento.descricao}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDaysIcon className="size-4 text-secondary" />
                    <span>{formatDate(evento.data_inicio)}</span>
                  </div>
                </InstitutionalCard>
              ))}
            </div>
          ) : (
            <InstitutionalCard accent="neutral">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A agenda pública da associação será disponibilizada em breve.
              </p>
            </InstitutionalCard>
          )}
        </Section>

        {sortedPatrocinadores.length > 0 && (
          <Section
            className="bg-background"
            title="Parceiros e apoiadores"
            subtitle="Quem caminha com a GŌKAI fortalece o projeto esportivo e a presença institucional da associação."
          >
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {sortedPatrocinadores.map((patrocinador) => (
                <InstitutionalCard key={patrocinador.id} accent="green" className="items-center p-5 text-center">
                  {patrocinador.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={patrocinador.logo_url}
                      alt={`Logo ${patrocinador.nome}`}
                      className="mx-auto h-16 max-w-full object-contain"
                    />
                  ) : (
                    <div className="mx-auto flex h-16 w-full items-center justify-center rounded-2xl bg-muted text-sm font-semibold text-primary">
                      {patrocinador.nome}
                    </div>
                  )}
                  {patrocinador.logo_url && (
                    <p className="mt-3 text-sm font-semibold text-foreground">{patrocinador.nome}</p>
                  )}
                </InstitutionalCard>
              ))}
            </div>
          </Section>
        )}

        <ConteudosTeaser />

        <Section className="bg-[#0C2418] text-white">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="gokai-kicker text-white/62">GŌKAI</div>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                O site agora comunica a mesma seriedade institucional que sustenta a associação.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                Quem chega à GŌKAI encontra a mesma lógica em toda a experiência: identidade forte,
                informação clara, documentos organizados e linguagem coerente com uma entidade real.
              </p>
            </div>
            <InstitutionalCard accent="red" className="bg-white/95">
              <h3 className="text-2xl font-semibold text-foreground">Comece por aqui</h3>
              <div className="mt-5 flex flex-col gap-3">
                <GokaiButton href="/inscricao" tone="primary" className="justify-center">
                  Fazer inscrição
                </GokaiButton>
                <GokaiButton href="/contato" tone="outline" className="justify-center">
                  Entrar em contato
                </GokaiButton>
              </div>
            </InstitutionalCard>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
