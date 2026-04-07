import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarDays, MapPin, ExternalLink } from "lucide-react"
import type { EventoTipo, EventoWithCampeonatoRelations } from "@/types/database"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: evento } = await supabase
    .from("evento")
    .select("titulo, descricao")
    .eq("slug", slug)
    .eq("publicado", true)
    .single()

  if (!evento) {
    return { title: "Evento não encontrado | GŌKAI" }
  }

  return {
    title: `${evento.titulo} | GŌKAI`,
    description: evento.descricao ?? undefined,
  }
}

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
  campeonato: "bg-red-600/20 text-red-500 border-red-600/30",
  social: "bg-green-500/20 text-green-400 border-green-500/30",
  outro: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

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

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Eventos
        </Link>
      </div>

      {/* Hero image */}
      {ev.imagem_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="rounded-xl overflow-hidden h-64 sm:h-80">
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
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${tipoBadgeClass[tipo]}`}
          >
            {tipoLabels[tipo] ?? tipo}
          </span>
          {ev.destaque && (
            <Badge className="bg-red-600 text-zinc-950">Destaque</Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-6 leading-tight">
          {ev.titulo}
        </h1>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-5 bg-zinc-900 rounded-xl ring-1 ring-zinc-800">
          <div className="flex items-start gap-2 flex-1">
            <CalendarDays className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-0.5">
                {ev.data_fim ? "Período" : "Data"}
              </p>
              <p className="text-sm text-zinc-300">{formatDate(ev.data_inicio)}</p>
              {ev.data_fim && (
                <p className="text-sm text-zinc-300">até {formatDate(ev.data_fim)}</p>
              )}
            </div>
          </div>

          {ev.local && (
            <div className="flex items-start gap-2 flex-1">
              <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-0.5">
                  Local
                </p>
                <p className="text-sm text-zinc-300">{ev.local}</p>
              </div>
            </div>
          )}
        </div>

        {/* Campeonato info */}
        {tipo === "campeonato" && campeonato && (
          <div className="mb-8 p-5 bg-zinc-900 rounded-xl ring-1 ring-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-100 mb-3">
              Informações do Campeonato
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {campeonato.modalidade && (
                <div>
                  <dt className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Modalidade</dt>
                  <dd className="text-zinc-200">{campeonato.modalidade.nome}</dd>
                </div>
              )}
              {campeonato.organizador && (
                <div>
                  <dt className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Organizador</dt>
                  <dd className="text-zinc-200">{campeonato.organizador}</dd>
                </div>
              )}
            </dl>
            {campeonato.regulamento_url && (
              <a
                href={campeonato.regulamento_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver regulamento
              </a>
            )}
          </div>
        )}

        {/* Main content */}
        {ev.conteudo && (
          <div className="prose-custom">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">Sobre o evento</h2>
            <div
              className="text-zinc-400 leading-relaxed whitespace-pre-wrap text-sm sm:text-base"
            >
              {ev.conteudo}
            </div>
          </div>
        )}

        {!ev.conteudo && ev.descricao && (
          <div className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
            {ev.descricao}
          </div>
        )}
      </div>
    </div>
  )
}
