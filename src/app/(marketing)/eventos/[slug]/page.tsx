import type { Metadata } from "next"
import {
  canonicalUrl,
  pageOpenGraph,
  twitterCard,
  buildEventJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  ExternalLink,
  CalendarCheck,
} from "lucide-react"
import type { EventoTipo, EventoWithCampeonatoRelations } from "@/types/database"

interface Props {
  params: Promise<{ slug: string }>
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: evento } = await supabase
    .from("evento")
    .select("titulo, descricao, data_inicio, data_fim, local, imagem_url")
    .eq("slug", slug)
    .eq("publicado", true)
    .single()

  if (!evento) {
    return { title: "Evento não encontrado | GŌKAI" }
  }

  const title = `${evento.titulo} | GŌKAI`
  const description = evento.descricao ?? undefined

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/eventos/${slug}`),
    },
    openGraph: pageOpenGraph({
      title,
      description: evento.descricao ?? title,
      path: `/eventos/${slug}`,
      imageUrl: evento.imagem_url,
      type: "article",
    }),
    twitter: {
      ...twitterCard,
      title,
      description: evento.descricao ?? undefined,
      ...(evento.imagem_url ? { images: [evento.imagem_url] } : {}),
    },
  }
}

// ─── Display helpers ──────────────────────────────────────────────────────────

const tipoLabels: Record<EventoTipo, string> = {
  treino_especial: "Treino Especial",
  seminario: "Seminário",
  campeonato: "Campeonato",
  social: "Social",
  outro: "Outro",
}

const tipoBadgeClass: Record<EventoTipo, string> = {
  treino_especial: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  seminario: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  campeonato: "bg-secondary/20 text-red-500 border-secondary/30",
  social: "bg-green-500/20 text-green-400 border-green-500/30",
  outro: "bg-white/10 text-[var(--text-on-dark-muted)] border-white/20",
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventoDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: evento } = await supabase
    .from("evento")
    .select("*, campeonato:campeonato(*, modalidade:modalidade(*))")
    .eq("slug", slug)
    .eq("publicado", true)
    .single()

  if (!evento) {
    notFound()
  }

  const ev = evento as EventoWithCampeonatoRelations
  const tipo = ev.tipo as EventoTipo
  const campeonato = ev.campeonato

  // ── Determine past/upcoming state ─────────────────────────────────────────
  // Use end date when available, otherwise start date.
  // An event on today (start date = today, no end date) is still "upcoming".
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const boundaryDate = new Date(ev.data_fim ?? ev.data_inicio)
  const isPast = boundaryDate < today

  // ── Structured data ────────────────────────────────────────────────────────
  const eventJsonLd = buildEventJsonLd({
    titulo: ev.titulo,
    descricao: ev.descricao,
    data_inicio: ev.data_inicio,
    data_fim: ev.data_fim,
    local: ev.local,
    imagem_url: ev.imagem_url,
    slug: ev.slug,
    isPast,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Eventos", url: canonicalUrl("/eventos") },
    { name: ev.titulo },
  ])

  // ── Campeonato modalidade link ─────────────────────────────────────────────
  const modalidade = campeonato?.modalidade
  const modalidadeHref = modalidade?.slug
    ? `/modalidades/${modalidade.slug}`
    : "/modalidades"

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Event JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(eventJsonLd)}
      </script>
      {/* BreadcrumbList JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-on-dark-secondary)] hover:text-[var(--text-on-dark)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Eventos
        </Link>
      </div>

      {/* Hero image */}
      {ev.imagem_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div
            className={`rounded-xl overflow-hidden h-64 sm:h-80 ${isPast ? "opacity-80" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ev.imagem_url}
              alt={ev.titulo}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Type badge + past indicator */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${tipoBadgeClass[tipo]}`}
          >
            {tipoLabels[tipo] ?? tipo}
          </span>
          {isPast ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/18 px-3 py-1 text-sm font-medium text-[var(--text-on-dark-muted)]">
              <CalendarCheck className="w-3.5 h-3.5" />
              Evento realizado
            </span>
          ) : (
            ev.destaque && (
              <Badge className="bg-secondary text-[var(--text-on-dark)]">Destaque</Badge>
            )
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-on-dark)] mb-6 leading-tight">
          {ev.titulo}
        </h1>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-5 bg-surface-dark-alt rounded-xl ring-1 ring-white/12">
          <div className="flex items-start gap-2 flex-1">
            <CalendarDays className="w-4 h-4 text-[var(--text-on-dark-muted)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-[var(--text-on-dark-muted)] font-medium uppercase tracking-wide mb-0.5">
                {ev.data_fim ? "Período" : "Data"}
              </p>
              <p className="text-sm text-[var(--text-on-dark-secondary)]">{formatDate(ev.data_inicio)}</p>
              {ev.data_fim && (
                <p className="text-sm text-[var(--text-on-dark-secondary)]">
                  até {formatDate(ev.data_fim)}
                </p>
              )}
            </div>
          </div>

          {ev.local && (
            <div className="flex items-start gap-2 flex-1">
              <MapPin className="w-4 h-4 text-[var(--text-on-dark-muted)] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-[var(--text-on-dark-muted)] font-medium uppercase tracking-wide mb-0.5">
                  Local
                </p>
                <p className="text-sm text-[var(--text-on-dark-secondary)]">{ev.local}</p>
              </div>
            </div>
          )}
        </div>

        {/* Campeonato info */}
        {tipo === "campeonato" && campeonato && (
          <div className="mb-8 p-5 bg-surface-dark-alt rounded-xl ring-1 ring-white/12">
            <h2 className="text-lg font-semibold text-[var(--text-on-dark)] mb-3">
              Informações do Campeonato
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {modalidade && (
                <div>
                  <dt className="text-[var(--text-on-dark-muted)] text-xs uppercase tracking-wide mb-0.5">
                    Modalidade
                  </dt>
                  <dd className="text-[var(--text-on-dark)]">
                    <Link
                      href={modalidadeHref}
                      className="hover:text-white underline underline-offset-2 decoration-white/25 hover:decoration-white/50 transition-colors"
                    >
                      {modalidade.nome}
                    </Link>
                  </dd>
                </div>
              )}
              {campeonato.organizador && (
                <div>
                  <dt className="text-[var(--text-on-dark-muted)] text-xs uppercase tracking-wide mb-0.5">
                    Organizador
                  </dt>
                  <dd className="text-[var(--text-on-dark)]">{campeonato.organizador}</dd>
                </div>
              )}
            </dl>
            {campeonato.regulamento_url && (
              <a
                href={campeonato.regulamento_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-on-dark-secondary)] hover:text-[var(--text-on-dark)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver regulamento
              </a>
            )}
          </div>
        )}

        {/* Main content */}
        {ev.conteudo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-on-dark)] mb-4">
              {isPast ? "Resumo e destaques" : "Sobre o evento"}
            </h2>
            <div className="text-[var(--text-on-dark-secondary)] leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {ev.conteudo}
            </div>
          </div>
        )}

        {!ev.conteudo && ev.descricao && (
          <div className="mb-8 text-[var(--text-on-dark-secondary)] leading-relaxed whitespace-pre-wrap">
            {ev.descricao}
          </div>
        )}

        {/* CTA — upcoming only */}
        {!isPast && (
          <div className="mt-10 p-6 bg-surface-dark-alt rounded-xl ring-1 ring-white/12">
            <h2 className="text-lg font-semibold text-[var(--text-on-dark)] mb-1">
              Participe deste evento
            </h2>
            <p className="text-sm text-[var(--text-on-dark-secondary)] mb-5">
              Interessado em participar? Faça sua inscrição ou entre em contato
              com a equipe do GŌKAI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/inscricao"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-secondary text-[var(--text-on-dark)] font-semibold text-sm hover:bg-red-500 transition-colors"
              >
                Inscrever-se
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/8 text-[var(--text-on-dark)] font-medium text-sm hover:bg-white/14 transition-colors"
              >
                Entrar em contato
              </Link>
            </div>
          </div>
        )}

        {/* Footer links */}
        <div
          className={`flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-white/12 ${
            isPast ? "mt-10" : "mt-6"
          }`}
        >
          <Link
            href="/eventos"
            className="text-sm text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark-secondary)] transition-colors"
          >
            ← Todos os eventos
          </Link>
          {modalidade && (
            <Link
              href={modalidadeHref}
              className="text-sm text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark-secondary)] transition-colors"
            >
              Ver modalidade: {modalidade.nome} →
            </Link>
          )}
          {isPast && (
            <Link
              href="/inscricao"
              className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors ml-auto"
            >
              Fazer minha inscrição →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
