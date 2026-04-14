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
 * Renders plain-text article content into paragraphs.
 * Splits on blank lines (\n\n). Bold (**text**) and italic (_text_) are supported.
 */
function ArticleBody({ conteudo }: { conteudo: string }) {
  const paragraphs = conteudo
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => {
        // Process inline formatting: **bold** and _italic_
        const parts = paragraph.split(/(\*\*[^*]+\*\*|_[^_]+_)/g)
        const rendered = parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-white/85">
                {part.slice(2, -2)}
              </strong>
            )
          }
          if (part.startsWith("_") && part.endsWith("_")) {
            return (
              <em key={i} className="italic text-white/72">
                {part.slice(1, -1)}
              </em>
            )
          }
          return part
        })

        // First paragraph gets a subtle left accent
        if (index === 0) {
          return (
            <p
              key={index}
              className="text-white/72 leading-[1.85] text-base sm:text-[17px] pl-4 border-l-2 border-red-600/40"
            >
              {rendered}
            </p>
          )
        }

        return (
          <p key={index} className="text-white/62 leading-[1.85] text-base sm:text-[17px]">
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
      className="group block rounded-xl ring-1 ring-white/12 bg-[#123020] hover:ring-white/28 transition-all duration-300 p-5 flex flex-col gap-3"
    >
      <span
        className={`inline-flex self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoriaBadgeClass[article.categoria]}`}
      >
        {categoriaLabels[article.categoria]}
      </span>
      <h3 className="text-sm font-semibold text-white/72 leading-snug group-hover:text-white transition-colors">
        {article.titulo}
      </h3>
      <div className="flex items-center gap-2 text-xs text-white/30 mt-auto">
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
    <div className="min-h-screen bg-[#0C2418]">
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      {/* ── Back navigation ─────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <Link
          href="/conteudos"
          className="inline-flex items-center gap-2 text-sm text-white/62 hover:text-white/85 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Conteúdos
        </Link>
      </div>

      {/* ── Article header ───────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category badge */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoriaBadgeClass[article.categoria as ArticleCategoria]}`}
          >
            {categoriaLabels[article.categoria as ArticleCategoria]}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/30">
            <Clock className="w-3.5 h-3.5" />
            {article.leitura_min} min de leitura
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/30">
            <Calendar className="w-3.5 h-3.5" />
            {formatDateFull(article.publicado_em)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
          {article.titulo}
        </h1>

        {/* Lead / resumo */}
        <p className="text-lg text-white/62 leading-relaxed mb-8">
          {article.resumo}
        </p>

        {/* Divider with author */}
        <div className="flex items-center gap-4 py-5 border-t border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-red-400">
              {(article.autor ?? "Equipe GŌKAI").charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-white/72">
              {article.autor ?? "Equipe GŌKAI"}
            </p>
            <p className="text-xs text-white/30">
              Publicado em {formatDateFull(article.publicado_em)}
              {article.atualizado_em !== article.publicado_em &&
                ` · Atualizado em ${formatDateFull(article.atualizado_em)}`}
            </p>
          </div>
        </div>
      </header>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ArticleBody conteudo={article.conteudo} />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-12 pt-8 border-t border-white/12">
            <Tag className="w-3.5 h-3.5 text-white/30 shrink-0" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-white/6 border border-white/18/40 px-2.5 py-0.5 text-xs text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* ── CTA block ────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl ring-1 ring-white/12 bg-[#123020] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-1">
                Pronto para começar?
              </h2>
              <p className="text-sm text-white/62 leading-relaxed">
                Conheça nossas modalidades e faça sua inscrição. Nossa equipe
                entrará em contato para orientar o seu início.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/inscricao"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-red-600 text-[#0C2418] font-semibold text-sm hover:bg-red-500 transition-colors"
              >
                Inscrever-se
              </Link>
              <Link
                href="/modalidades"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/8 text-white/85 font-medium text-sm hover:bg-white/14 transition-colors"
              >
                Ver modalidades
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related articles ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-semibold tracking-widest uppercase shrink-0 text-white/45">
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

      {/* ── Footer nav ───────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-white/12">
          <Link
            href="/conteudos"
            className="text-sm text-white/45 hover:text-white/72 transition-colors"
          >
            ← Todos os conteúdos
          </Link>
          <Link
            href="/modalidades"
            className="text-sm text-white/45 hover:text-white/72 transition-colors"
          >
            Ver modalidades →
          </Link>
          <Link
            href="/inscricao"
            className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors ml-auto"
          >
            Fazer minha inscrição →
          </Link>
        </div>
      </div>
    </div>
  )
}
