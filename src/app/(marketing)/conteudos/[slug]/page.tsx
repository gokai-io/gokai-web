import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react"
import {
  canonicalUrl,
  pageOpenGraph,
  twitterCard,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo"
import {
  getArticle,
  getAllArticleSlugs,
  getRelatedArticles,
  categoriaLabels,
  categoriaBadgeClass,
  type ArticleCategoria,
} from "@/lib/conteudos"
import { BrandContainer } from "@/components/branding/brand-container"

// ─── Static generation ────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    return { title: "Artigo não encontrado | GŌKAI" }
  }

  const title = `${article.titulo} | GŌKAI`

  return {
    title,
    description: article.resumo,
    alternates: {
      canonical: canonicalUrl(`/conteudos/${slug}`),
    },
    openGraph: pageOpenGraph({
      title,
      description: article.resumo,
      path: `/conteudos/${slug}`,
      imageUrl: article.imagem_url,
      type: "article",
    }),
    twitter: {
      ...twitterCard,
      title,
      description: article.resumo,
      ...(article.imagem_url ? { images: [article.imagem_url] } : {}),
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateFull(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/**
 * Renders plain-text article content into editorial paragraphs.
 * Splits on blank lines. **bold** and _italic_ are supported.
 */
function ArticleBody({ conteudo }: { conteudo: string }) {
  const paragraphs = conteudo
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="space-y-7">
      {paragraphs.map((paragraph, index) => {
        const parts = paragraph.split(/(\*\*[^*]+\*\*|_[^_]+_)/g)
        const rendered = parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-[var(--surface-midnight)]">
                {part.slice(2, -2)}
              </strong>
            )
          }
          if (part.startsWith("_") && part.endsWith("_")) {
            return <em key={i}>{part.slice(1, -1)}</em>
          }
          return part
        })

        // First paragraph — drop cap feeling with left accent
        if (index === 0) {
          return (
            <p
              key={index}
              className="text-[var(--surface-midnight)]/80 text-lg leading-[1.9] pl-5 border-l-2 border-[var(--accent-carmine)]/40"
            >
              {rendered}
            </p>
          )
        }

        return (
          <p key={index} className="text-[var(--surface-midnight)]/80 text-[17px] leading-[1.9]">
            {rendered}
          </p>
        )
      })}
    </div>
  )
}

// ─── Related article card ─────────────────────────────────────────────────────

function RelatedArticleCard({
  article,
}: {
  article: { slug: string; titulo: string; resumo: string; categoria: ArticleCategoria; leitura_min: number; publicado_em: string }
}) {
  return (
    <Link
      href={`/conteudos/${article.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-[var(--accent-gold)]/12 bg-white/[0.03] p-5 transition-all duration-300 hover:bg-white/[0.06] hover:border-[var(--accent-gold)]/25"
    >
      <span
        className={`inline-flex self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoriaBadgeClass[article.categoria]}`}
      >
        {categoriaLabels[article.categoria]}
      </span>
      <h3 className="text-sm font-semibold text-[var(--text-ivory-dim)] leading-snug group-hover:text-[var(--text-ivory)] transition-colors">
        {article.titulo}
      </h3>
      <div className="flex items-center gap-2 text-xs text-[var(--text-ivory-muted)] mt-auto">
        <Clock className="w-3 h-3" />
        <span>{article.leitura_min} min</span>
        <span>·</span>
        <span>{formatDateShort(article.publicado_em)}</span>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    notFound()
  }

  const related = getRelatedArticles(article, 3)

  const articleJsonLd = buildArticleJsonLd({
    titulo: article.titulo,
    resumo: article.resumo,
    slug: article.slug,
    publicado_em: article.publicado_em,
    atualizado_em: article.atualizado_em,
    autor: article.autor,
    imagem_url: article.imagem_url,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Conteúdos", url: canonicalUrl("/conteudos") },
    { name: article.titulo },
  ])

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      {/* ── Hero — dark, compact ─────────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer>
          <Link
            href="/conteudos"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-ivory-dim)] hover:text-[var(--text-ivory)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Conteúdos
          </Link>

          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoriaBadgeClass[article.categoria as ArticleCategoria]}`}
            >
              {categoriaLabels[article.categoria as ArticleCategoria]}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-ivory-muted)]">
              <Clock className="w-3.5 h-3.5" />
              {article.leitura_min} min de leitura
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-ivory-muted)]">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateFull(article.publicado_em)}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-ivory)] leading-[1.1] tracking-tight">
            {article.titulo}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--text-ivory-dim)] leading-relaxed">
            {article.resumo}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/10">
            <div className="w-9 h-9 rounded-full bg-[var(--accent-carmine)]/20 border border-[var(--accent-carmine)]/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[var(--accent-carmine)]">
                {(article.autor ?? "Equipe GŌKAI").charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-ivory)]">
                {article.autor ?? "Equipe GŌKAI"}
              </p>
              <p className="text-xs text-[var(--text-ivory-muted)]">
                {formatDateFull(article.publicado_em)}
                {article.atualizado_em !== article.publicado_em &&
                  ` · Atualizado em ${formatDateFull(article.atualizado_em)}`}
              </p>
            </div>
          </div>
        </BrandContainer>
      </section>

      {/* ── Article body — LIGHT paper background for readability ── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <article className="mx-auto max-w-3xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white px-8 py-12 sm:px-14 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <ArticleBody conteudo={article.conteudo} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-14 pt-8 border-t border-[var(--surface-midnight)]/8">
                <Tag className="w-3.5 h-3.5 text-[var(--surface-midnight)]/40 shrink-0" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[var(--surface-midnight)]/5 border border-[var(--surface-midnight)]/8 px-2.5 py-0.5 text-xs text-[var(--surface-midnight)]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </BrandContainer>
      </section>

      {/* ── CTA + Related — back to dark ─────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-16">
        <BrandContainer>
          {/* CTA block */}
          <div className="mx-auto max-w-3xl rounded-xl border border-[var(--accent-gold)]/15 bg-white/[0.03] p-6 sm:p-8 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-lg font-extrabold text-[var(--text-ivory)] mb-1">
                  Pronto para começar?
                </h2>
                <p className="text-sm text-[var(--text-ivory-dim)] leading-relaxed">
                  Conheça nossas modalidades e faça sua inscrição. Nossa equipe
                  entrará em contato para orientar o seu início.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/inscricao"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--accent-carmine)] text-white font-bold text-sm hover:brightness-110 transition-all"
                >
                  Inscrever-se
                </Link>
                <Link
                  href="/modalidades"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/[0.06] text-[var(--text-ivory)] font-medium text-sm hover:bg-white/[0.10] transition-colors"
                >
                  Ver modalidades
                </Link>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mx-auto max-w-3xl mb-16">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-bold tracking-widest uppercase shrink-0 text-[var(--text-ivory-muted)]">
                  Leia também
                </h2>
                <div className="h-px flex-1 bg-white/8" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <RelatedArticleCard key={rel.slug} article={rel} />
                ))}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mx-auto max-w-3xl flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-white/10">
            <Link
              href="/conteudos"
              className="text-sm text-[var(--text-ivory-muted)] hover:text-[var(--text-ivory)] transition-colors"
            >
              ← Todos os conteúdos
            </Link>
            <Link
              href="/modalidades"
              className="text-sm text-[var(--text-ivory-muted)] hover:text-[var(--text-ivory)] transition-colors"
            >
              Ver modalidades →
            </Link>
            <Link
              href="/inscricao"
              className="text-sm font-bold text-[var(--accent-carmine)] hover:brightness-110 transition-all ml-auto"
            >
              Fazer minha inscrição →
            </Link>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
