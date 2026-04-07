import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import type { Evento, EventoTipo } from "@/types/database"

export const metadata: Metadata = {
  title: "Eventos | GŌKAI",
  description: "Confira os eventos do GŌKAI – Associação Esportiva e Ambiental.",
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
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

export default async function EventosPage() {
  const supabase = await createClient()

  const { data: eventosRaw } = await supabase
    .from("evento")
    .select("*")
    .eq("publicado", true)
    .order("data_inicio", { ascending: false })

  const eventos = (eventosRaw ?? []) as Evento[]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Agenda
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Eventos</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Fique por dentro dos eventos, competições e atividades do GŌKAI.
          </p>
        </div>
      </section>

      {/* Events list */}
      <Section className="bg-zinc-950">
        {eventos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => {
              const tipo = evento.tipo as EventoTipo

              return (
                <Link
                  key={evento.id}
                  href={`/eventos/${evento.slug}`}
                  className="bg-zinc-900 rounded-xl ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  {evento.imagem_url ? (
                    <div className="h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={evento.imagem_url}
                        alt={evento.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      <CalendarDays className="w-10 h-10 text-zinc-700" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tipoBadgeClass[tipo]}`}
                      >
                        {tipoLabels[tipo] ?? tipo}
                      </span>
                      {evento.destaque && (
                        <Badge className="bg-red-600 text-zinc-950 text-xs">
                          Destaque
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors leading-snug">
                      {evento.titulo}
                    </h3>

                    <div className="flex flex-col gap-1.5 text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>{formatDate(evento.data_inicio)}</span>
                      </div>
                      {evento.local && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{evento.local}</span>
                        </div>
                      )}
                    </div>

                    {evento.descricao && (
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {truncate(evento.descricao, 120)}
                      </p>
                    )}

                    <span className="mt-auto text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      Ver detalhes →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <CalendarDays className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">Novos eventos serão anunciados em breve.</p>
          </div>
        )}
      </Section>
    </>
  )
}
