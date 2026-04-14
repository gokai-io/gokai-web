import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Clock, ArrowRight } from "lucide-react"
import {
  canonicalUrl,
  pageOpenGraph,
  twitterCard,
  buildArticleListJsonLd,
} from "@/lib/seo"
import {
  getAllArticles,
  categoriaLabels,
  categoriaBadgeClass,
  type Article,
  type ArticleCategoria,
} from "@/lib/conteudos"
import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Section } from "@/components/marketing/section"

export const metadata: Metadata = {
  title: "Conteúdos | GŌKAI",
  description:
    "Guias, reflexões e reportagens sobre artes marciais, disciplina e desenvolvimento humano. A biblioteca editorial do GŌKAI.",
  alternates: { canonical: canonicalUrl("/conteudos") },
  openGraph: pageOpenGraph({
    title: "Conteúdos | GŌKAI",
    description: "Guias, reflexões e reportagens sobre artes marciais, disciplina e desenvolvimento humano.",
    path: "/conteudos",
    type: "website",
  }),
  twitter: {
    ...twitterCard,
    title: "Conteúdos | GŌKAI",
    description: "Guias, reflexões e reportagens sobre artes marciais, disciplina e desenvolvimento humano.",
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// ─── Featured article — editorial / magazine feel ─────────────────────────────

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/conteudos/${article.slug}`} className="group block">
      <div className="grid min-h-[300px] overflow-hidden rounded-[26px] border border-border/70 bg-card shadow-[0_20px_60px_rgba(18,48,32,0.09)] transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(18,48,32,0.14)] lg:grid-cols-5">

        {/* Decorative left panel */}
        <div className="relative flex items-center justify-center overflow-hidden bg-muted p-10 lg:col-span-2">
          {/* Concentric rings — brand sun / circle motif */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            {[80, 56, 32].map((size) => (
              <div
                key={size}
                className="absolute rounded-full border border-foreground"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
            ))}
          </div>

          {/* Sun accent */}
          <div className="relative text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Destaque
            </p>
            <div className="mx-auto mb-3 h-px w-10 bg-secondary" />
            <BookOpen className="mx-auto h-7 w-7 text-muted-foreground/50" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-8 lg:col-span-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${categoriaBadgeClass[article.categoria as ArticleCategoria]}`}
              >
                {categoriaLabels[article.categoria as ArticleCategoria]}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                <Clock className="h-3 w-3" />
                {article.leitura_min} min de leitura
              </span>
            </div>

            <h2 className="mb-4 font-heading text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary sm:text-3xl">
              {article.titulo}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {article.resumo}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
              <span>{article.autor ?? "Equipe GŌKAI"}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(article.publicado_em)}</span>
            </div>
            <span className="gokai-link-arrow text-sm">
              Ler artigo
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Article card ─────────────────────────────────────────────────────────────

// Category accent bar colors — brand-consistent (red = eventos, green = modalidades, etc.)
const categoriaAccentBar: Record<string, string> = {
  modalidades: "bg-foreground/20",
  iniciantes:  "bg-secondary/40",
  filosofia:   "bg-secondary/40",
  eventos:     "bg-secondary",
  outros:      "bg-foreground/15",
}

function ArticleCard({ article }: { article: Article }) {
  const accentBar = categoriaAccentBar[article.categoria] ?? "bg-foreground/20"

  return (
    <Link href={`/conteudos/${article.slug}`} className="group block h-full">
      <InstitutionalCard accent="none" className="flex h-full flex-col gap-4 !pt-5">
        {/* Top accent bar — category colour */}
        <div className={`absolute left-6 top-0 h-[3px] w-16 rounded-b-full ${accentBar}`} />

        {/* Category + read time */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoriaBadgeClass[article.categoria as ArticleCategoria]}`}
          >
            {categoriaLabels[article.categoria as ArticleCategoria]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground/55">
            <Clock className="h-3 w-3" />
            {article.leitura_min} min
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
          {article.titulo}
        </h3>

        {/* Excerpt */}
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.resumo}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <span className="text-xs text-muted-foreground/50">{formatDate(article.publicado_em)}</span>
          <span className="gokai-link-arrow text-xs">
            Ler
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </InstitutionalCard>
    </Link>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label, count }: { label: string; count?: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
      {count !== undefined && (
        <span className="text-xs tabular-nums text-muted-foreground/45">{count}</span>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConteudosPage() {
  const allArticles = getAllArticles()
  const [featured, ...rest] = allArticles

  const articleListJsonLd =
    allArticles.length > 0
      ? buildArticleListJsonLd(
          allArticles.slice(0, 20).map((a, i) => ({
            titulo: a.titulo,
            slug: a.slug,
            position: i + 1,
          }))
        )
      : null

  return (
    <>
      {articleListJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleListJsonLd)}</script>
      )}

      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer>
          <div className="max-w-3xl">
            <div className="gokai-kicker text-[var(--text-on-dark-secondary)]">Biblioteca GŌKAI</div>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[var(--text-on-dark)] sm:text-5xl">
              Conteúdos
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-on-dark-secondary)]">
              Guias práticos, reflexões e reportagens sobre artes marciais,
              disciplina e desenvolvimento humano.
            </p>

            {allArticles.length > 0 && (
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <p className="font-heading text-2xl font-bold text-[var(--text-on-dark)] tabular-nums">
                    {allArticles.length}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[var(--text-on-dark-muted)]">
                    {allArticles.length === 1 ? "Artigo" : "Artigos"}
                  </p>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div>
                  <p className="font-heading text-2xl font-bold text-[var(--text-on-dark)] tabular-nums">
                    {new Set(allArticles.map((a) => a.categoria)).size}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[var(--text-on-dark-muted)]">
                    Categorias
                  </p>
                </div>
              </div>
            )}
          </div>
        </BrandContainer>
      </section>

      {/* Content — light background, editorial feel */}
      <Section className="bg-background">
        <div className="space-y-16">
          {/* Featured */}
          {featured && (
            <div>
              <SectionDivider label="Mais recente" />
              <FeaturedArticleCard article={featured} />
            </div>
          )}

          {/* Article grid */}
          {rest.length > 0 && (
            <div>
              <SectionDivider label="Todos os artigos" count={rest.length} />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {allArticles.length === 0 && (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">Novos conteúdos em breve.</p>
              <p className="mt-2 text-sm text-muted-foreground/55">
                Acompanhe nossas redes sociais para ser o primeiro a saber.
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* Cross-links */}
      <Section className="bg-surface-warm">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              title: "Modalidades",
              desc: "Conheça as artes marciais que praticamos e encontre a ideal para você.",
              href: "/modalidades", label: "Ver modalidades", tone: "outline" as const,
            },
            {
              title: "Próximos Eventos",
              desc: "Campeonatos, seminários e treinos especiais na agenda do GŌKAI.",
              href: "/eventos", label: "Ver eventos", tone: "outline" as const,
            },
            {
              title: "Comece a Treinar",
              desc: "Pronto para dar o primeiro passo? Faça sua inscrição agora.",
              href: "/inscricao", label: "Iniciar inscrição", tone: "secondary" as const,
            },
          ].map(({ title, desc, href, label, tone }) => (
            <div key={title}>
              <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="mt-4">
                <GokaiButton href={href} tone={tone} className="h-9 text-xs">
                  {label}
                </GokaiButton>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
