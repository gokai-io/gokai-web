import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  MapPinIcon,
} from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { BrandLogo } from "@/components/branding/brand-logo"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"
import { Section } from "@/components/marketing/section"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { GAMONAL_FIGHTERS_SITE_URL } from "@/lib/site"
import { createClient } from "@/lib/supabase/server"
import {
  categoriaLabels,
  getAllArticles,
  type ArticleCategoria,
} from "@/lib/conteudos"
import type {
  Evento,
  EventoTipo,
  Modalidade,
  Patrocinador,
  PatrocinadorNivel,
} from "@/types/database"

// ─── Metadata ─────────────────────────────────────────────────────────────────

const HOME_TITLE = "GŌKAI – Associação de Artes Marciais"
const HOME_DESC =
  "Associação de artes marciais com disciplina, honra, formação humana e compromisso institucional."

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: pageOpenGraph({
    title: HOME_TITLE,
    description: HOME_DESC,
    path: "/",
    type: "website",
  }),
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
  return new Date(d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  })
}

// ─── Data fetchers ─────────────────────────────────────────────────────────────

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
    const { data } = await supabase
      .from("evento")
      .select("*")
      .eq("publicado", true)
      .gte("data_inicio", new Date().toISOString())
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
          <InstitutionalCard
            key={article.slug}
            accent="neutral"
            className="flex h-full flex-col gap-5"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-ivory-muted)]">
              <span>
                {categoriaLabels[article.categoria as ArticleCategoria]}
              </span>
              <span>{article.leitura_min} min</span>
            </div>
            <h3 className="font-heading text-lg font-extrabold text-[var(--text-ivory)]">
              {article.titulo}
            </h3>
            <p className="flex-1 text-sm font-medium leading-relaxed text-[var(--text-ivory-dim)]">
              {article.resumo}
            </p>
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

const practiceAreas = [
  {
    nome: "Jiu-Jitsu",
    descricao: "Técnica, estratégia e evolução a cada treino.",
    slug: "jiu-jitsu",
  },
  {
    nome: "Judô",
    descricao: "Respeito, equilíbrio e aprendizado dentro e fora do tatame.",
    slug: "judo",
  },
  {
    nome: "Boxe",
    descricao: "Coordenação, precisão e desenvolvimento físico.",
    slug: "boxe",
  },
]

export default async function HomePage() {
  const [modalidades, eventos, patrocinadores] = await Promise.all([
    getModalidades(),
    getProximosEventos(),
    getPatrocinadores(),
  ])
  const sortedPatrocinadores = nivelOrder.flatMap((n) =>
    patrocinadores.filter((p) => p.nivel === n),
  )
  const practices = modalidades.length > 0 ? modalidades : practiceAreas

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <a
        href="#conteudo"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-white p-4 text-black focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>
      <main id="conteudo">
        <section className="gokai-hero-spotlight overflow-hidden border-b border-white/10">
          <BrandContainer className="pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
            <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
              <div className="gokai-hero-enter">
                <p className="gokai-kicker mb-6">
                  Artes marciais · Juiz de Fora
                </p>
                <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[1.08] text-[var(--text-ivory)]">
                  A força do treino.
                  <br />
                  <span className="block text-balance text-[var(--accent-gold)]">
                    Os valores para a vida.
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-ivory-dim)] sm:text-lg">
                  Artes marciais, formação humana e comunidade. Na GŌKAI,
                  crianças, jovens e adultos encontram um espaço para aprender e
                  evoluir em Juiz de Fora.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GokaiButton href="/inscricao" className="h-12">
                    Quero fazer parte{" "}
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </GokaiButton>
                  <GokaiButton
                    href="#modalidades"
                    tone="outline"
                    className="h-12"
                  >
                    Explorar modalidades
                  </GokaiButton>
                </div>
                <p className="mt-6 flex items-center gap-2 text-xs text-[var(--text-ivory-muted)] sm:text-sm">
                  <MapPinIcon className="size-4 shrink-0" aria-hidden />
                  Polos São Mateus e Linhares
                </p>
              </div>
              <div className="hidden border-l border-[var(--accent-gold)]/20 pl-12 lg:block">
                <div className="flex aspect-square items-center justify-center rounded-full border border-[var(--accent-gold)]/20 bg-[#f4f2ed] p-12">
                  <BrandLogo className="h-auto w-full" priority />
                </div>
                <div className="mt-8 flex justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-ivory-muted)]">
                  <span>Disciplina</span>
                  <span>Respeito</span>
                  <span>Comunidade</span>
                </div>
              </div>
            </div>
            <div className="mt-12 grid gap-5 border-t border-white/10 pt-6 text-sm text-[var(--text-ivory-dim)] sm:grid-cols-3 lg:mt-16">
              <p>
                <span className="mr-3 text-[var(--accent-gold)]">01</span>
                Aprendizado em todas as idades
              </p>
              <p>
                <span className="mr-3 text-[var(--accent-gold)]">02</span>
                Formação dentro e fora do tatame
              </p>
              <p>
                <span className="mr-3 text-[var(--accent-gold)]">03</span>
                Associação sem fins lucrativos
              </p>
            </div>
          </BrandContainer>
        </section>

        <section
          id="modalidades"
          className="scroll-mt-24 bg-[#f4f2ed] py-16 text-[#15251c] sm:py-24"
        >
          <BrandContainer>
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#716044]">
                  Encontre seu caminho
                </p>
                <h2 className="text-3xl leading-tight sm:text-5xl">
                  Um primeiro passo.
                  <br />
                  Muitas formas de evoluir.
                </h2>
              </div>
              <Link
                href="/modalidades"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Todas as modalidades{" "}
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {practices.map((practice, index) => (
                <article
                  key={practice.slug}
                  className="flex flex-col border-t border-[#15251c]/25 py-7"
                >
                  <span className="mb-8 text-xs tabular-nums text-[#716044]">
                    {String(index + 1).padStart(2, "0")} / PRÁTICA
                  </span>
                  <h3 className="text-2xl font-semibold">{practice.nome}</h3>
                  <p className="mt-3 max-w-sm flex-1 text-sm leading-relaxed text-[#15251c]/75">
                    {practice.descricao}
                  </p>
                  <Link
                    href={
                      modalidades.length > 0
                        ? `/modalidades/${practice.slug}`
                        : "/contato"
                    }
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    {modalidades.length > 0
                      ? "Conhecer a modalidade"
                      : "Consultar turmas"}{" "}
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 border-t border-[#15251c]/15 pt-6 text-sm text-[#15251c]/75">
              Converse com a equipe para conhecer as turmas, os horários e as
              atividades de cada polo.
            </p>
          </BrandContainer>
        </section>

        <section className="bg-[var(--surface-midnight)] py-16 sm:py-24">
          <BrandContainer>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <p className="gokai-kicker mb-5">O seu lugar no tatame</p>
                <h2 className="text-3xl leading-tight sm:text-5xl">
                  Cada pessoa tem
                  <br />
                  seu ponto de partida.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-ivory-dim)]">
                  Começar uma prática, retomar uma rotina ou apresentar o
                  esporte aos filhos. A jornada começa ao conhecer a equipe e
                  encontrar a atividade adequada para você.
                </p>
                <GokaiButton
                  href="/professores"
                  tone="outline"
                  className="mt-8"
                >
                  Conhecer os professores
                </GokaiButton>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  [
                    "Crianças e jovens",
                    "Aprendizado, convivência e valores que acompanham o crescimento.",
                  ],
                  [
                    "Adultos e iniciantes",
                    "Um espaço para desenvolver técnica, construir constância e descobrir novas possibilidades.",
                  ],
                  [
                    "Quem quer ir além",
                    "Evolução contínua, troca de experiências e participação na comunidade marcial.",
                  ],
                ].map(([title, description]) => (
                  <div key={title} className="py-6 first:pt-0">
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-ivory-muted)]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BrandContainer>
        </section>

        <section className="border-y border-white/10 bg-[var(--surface-obsidian)] py-16 sm:py-24">
          <BrandContainer>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="gokai-kicker mb-5">Perto de você</p>
                <h2 className="text-3xl sm:text-4xl">
                  Dois polos.
                  <br />
                  Uma comunidade.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[var(--text-ivory-dim)]">
                  Encontre a GŌKAI em Juiz de Fora e converse com a equipe sobre
                  como participar.
                </p>
                <Link
                  href="/contato"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent-gold)]"
                >
                  Entrar em contato{" "}
                  <ArrowRightIcon className="size-4" aria-hidden />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  ["São Mateus", "Sede", "Rua Melo Franco, 68"],
                  [
                    "Linhares",
                    "Polo de atividades",
                    "Rua Roberto Hargreaves, 64",
                  ],
                ].map(([name, label, address]) => (
                  <div
                    key={name}
                    className="border-l border-[var(--accent-gold)]/30 pl-6"
                  >
                    <MapPinIcon
                      className="mb-8 size-5 text-[var(--accent-gold)]"
                      aria-hidden
                    />
                    <p className="text-xs text-[var(--text-ivory-muted)]">
                      {label}
                    </p>
                    <h3 className="mt-2 text-xl">{name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-ivory-dim)]">
                      {address}
                      <br />
                      Juiz de Fora / MG
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BrandContainer>
        </section>

        <section className="bg-[#f4f2ed] py-16 text-[#15251c] sm:py-20">
          <BrandContainer>
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#716044]">
                  Projeto parceiro · Jiu-Jitsu
                </p>
                <h2 className="text-3xl sm:text-4xl">Gamonal Fighters</h2>
                <p className="mt-4 text-base leading-relaxed text-[#15251c]/75">
                  A Gamonal Fighters faz parte dos projetos parceiros que atuam
                  no espaço da GŌKAI, mantendo sua identidade e gestão próprias.
                  Conheça a equipe e seu trabalho.
                </p>
              </div>
              <a
                href={GAMONAL_FIGHTERS_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-fit items-center gap-3 rounded-md border border-[#15251c]/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#15251c] hover:text-white"
              >
                Conhecer a Gamonal{" "}
                <ExternalLinkIcon className="size-4" aria-hidden />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </div>
          </BrandContainer>
        </section>

        {eventos.length > 0 && (
          <Section
            title="Encontros que fazem parte da jornada"
            subtitle="Acompanhe os próximos eventos da GŌKAI."
            headingAlign="left"
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {eventos.map((evento) => (
                <InstitutionalCard
                  key={evento.id}
                  accent="neutral"
                  className="flex flex-col gap-4"
                >
                  <p className="text-xs text-[var(--accent-gold)]">
                    {eventoTipoLabel[evento.tipo]}
                  </p>
                  <h3 className="text-xl">{evento.titulo}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {evento.descricao}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <CalendarDaysIcon className="size-4" aria-hidden />
                    {formatDate(evento.data_inicio)}
                  </p>
                </InstitutionalCard>
              ))}
            </div>
          </Section>
        )}
        <ConteudosTeaser />
        <section className="border-y border-white/10 bg-[var(--surface-obsidian)] py-16 sm:py-20">
          <BrandContainer>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="gokai-kicker mb-5">Compromisso institucional</p>
                <h2 className="text-3xl sm:text-4xl">
                  Confiança também se constrói com transparência.
                </h2>
              </div>
              <div>
                <p className="text-base leading-relaxed text-[var(--text-ivory-dim)]">
                  A GŌKAI é uma associação sem fins lucrativos dedicada ao
                  esporte e à formação humana. Conheça nossa história, a
                  estrutura de gestão e os documentos públicos.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    ["/sobre", "Sobre a GŌKAI"],
                    ["/governanca", "Governança"],
                    ["/transparencia", "Documentos"],
                  ].map(([href, label]) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent-gold)]"
                    >
                      {label}
                      <ArrowRightIcon className="size-4" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </BrandContainer>
        </section>
        {sortedPatrocinadores.length > 0 && (
          <Section
            title="Quem fortalece essa jornada"
            subtitle="Parceiros e apoiadores da GŌKAI."
          >
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {sortedPatrocinadores.map((p) => (
                <InstitutionalCard
                  key={p.id}
                  accent="none"
                  className="text-center"
                >
                  {p.logo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo_url}
                      alt=""
                      className="mx-auto mb-4 h-16 max-w-full object-contain"
                    />
                  )}
                  <p className="text-sm font-semibold">{p.nome}</p>
                </InstitutionalCard>
              ))}
            </div>
          </Section>
        )}
        <section className="gokai-hero-spotlight py-16 sm:py-24">
          <BrandContainer>
            <div className="mx-auto max-w-2xl text-center">
              <p className="gokai-kicker mb-5">Seu próximo passo</p>
              <h2 className="text-3xl leading-tight sm:text-5xl">
                A sua jornada começa com uma conversa.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--text-ivory-dim)]">
                Tire suas dúvidas ou envie sua inscrição para fazer parte da
                GŌKAI.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <GokaiButton href="/inscricao" className="h-12">
                  Quero fazer parte
                  <ArrowRightIcon className="size-4" aria-hidden />
                </GokaiButton>
                <GokaiButton href="/contato" tone="outline" className="h-12">
                  Falar com a equipe
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
