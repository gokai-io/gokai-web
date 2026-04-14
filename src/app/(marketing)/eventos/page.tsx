import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"

import {
  canonicalUrl,
  pageOpenGraph,
  twitterCard,
  buildEventListJsonLd,
} from "@/lib/seo"
import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/marketing/section"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import type { Evento, EventoTipo } from "@/types/database"

export const metadata: Metadata = {
  title: "Eventos | GŌKAI",
  description:
    "Campeonatos de artes marciais, seminários, treinos especiais e eventos sociais do GŌKAI. Confira a agenda completa e participe.",
  alternates: { canonical: canonicalUrl("/eventos") },
  openGraph: pageOpenGraph({
    title: "Eventos | GŌKAI",
    description: "Campeonatos, seminários e eventos especiais do GŌKAI – Associação Esportiva e Ambiental.",
    path: "/eventos",
  }),
  twitter: {
    ...twitterCard,
    title: "Eventos | GŌKAI",
    description: "Campeonatos, seminários e eventos especiais do GŌKAI – Associação Esportiva e Ambiental.",
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tipoLabels: Record<EventoTipo, string> = {
  treino_especial: "Treino Especial",
  seminario:       "Seminário",
  campeonato:      "Campeonato",
  social:          "Social",
  outro:           "Outro",
}

// Badges use brand palette: red = campeonato (energy), green = treino/social, lime = seminario
const tipoBadgeClass: Record<EventoTipo, string> = {
  campeonato:      "bg-secondary/15 text-secondary border-secondary/28",
  treino_especial: "bg-primary/12 text-primary border-primary/22",
  seminario:       "bg-accent/20 text-[#3a7a1a] border-accent/30",
  social:          "bg-primary/8 text-primary/75 border-primary/18",
  outro:           "bg-muted text-muted-foreground border-border",
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + "…"
}

// ─── Event card ───────────────────────────────────────────────────────────────

function EventCard({ evento, isPast = false }: { evento: Evento; isPast?: boolean }) {
  const tipo = evento.tipo as EventoTipo

  return (
    <Link href={`/eventos/${evento.slug}`} className="group block h-full">
      <InstitutionalCard
        accent={isPast ? "none" : "green"}
        className={cn("flex h-full flex-col gap-0 !p-0", isPast && "opacity-72")}
      >
        {/* Image / placeholder */}
        {evento.imagem_url ? (
          <div className="h-44 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evento.imagem_url}
              alt={evento.titulo}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-44 items-center justify-center bg-primary/6">
            <CalendarDays className="h-10 w-10 text-primary/22" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
                tipoBadgeClass[tipo]
              )}
            >
              {tipoLabels[tipo] ?? tipo}
            </span>
            {isPast && (
              <span className="inline-flex items-center rounded-full border border-border/50 px-2 py-0.5 text-xs font-medium text-muted-foreground/50">
                Realizado
              </span>
            )}
            {!isPast && evento.destaque && (
              <Badge className="bg-secondary text-secondary-foreground text-xs">Destaque</Badge>
            )}
          </div>

          <h3 className="font-heading text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {evento.titulo}
          </h3>

          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-secondary/70" />
              <span>{formatDate(evento.data_inicio)}</span>
            </div>
            {evento.local && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/55" />
                <span>{evento.local}</span>
              </div>
            )}
          </div>

          {evento.descricao && (
            <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
              {truncate(evento.descricao, 120)}
            </p>
          )}

          <span className="mt-auto pt-1 text-xs font-semibold text-primary/55 transition-colors group-hover:text-primary">
            Ver detalhes →
          </span>
        </div>
      </InstitutionalCard>
    </Link>
  )
}

// ─── Archive section divider ──────────────────────────────────────────────────

function ArchiveSectionHeader({
  label,
  count,
  muted = false,
}: {
  label: string
  count: number
  muted?: boolean
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2
        className={cn(
          "shrink-0 text-xs font-semibold uppercase tracking-widest",
          muted ? "text-muted-foreground/45" : "text-muted-foreground"
        )}
      >
        {label}
      </h2>
      <div className={cn("h-px flex-1", muted ? "bg-border/40" : "bg-border")} />
      <span
        className={cn(
          "tabular-nums text-xs",
          muted ? "text-muted-foreground/28" : "text-muted-foreground/50"
        )}
      >
        {count}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventosPage() {
  const supabase = await createClient()

  const { data: eventosRaw } = await supabase
    .from("evento")
    .select("*")
    .eq("publicado", true)
    .order("data_inicio", { ascending: false })

  const allEvents = (eventosRaw ?? []) as Evento[]
  const now = new Date()
  const upcomingEvents = allEvents.filter((e) => new Date(e.data_inicio) >= now)
  const pastEvents     = allEvents.filter((e) => new Date(e.data_inicio) < now)

  const eventListJsonLd =
    allEvents.length > 0
      ? buildEventListJsonLd(
          allEvents.map((e, i) => ({ titulo: e.titulo, slug: e.slug, position: i + 1 }))
        )
      : null

  return (
    <>
      {eventListJsonLd && (
        <script type="application/ld+json">{JSON.stringify(eventListJsonLd)}</script>
      )}

      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="text-center">
          <div className="gokai-kicker justify-center text-white/68">Agenda</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Eventos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Campeonatos, seminários, treinos especiais e atividades sociais do GŌKAI.
          </p>

          {/* Counters */}
          {allEvents.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-10">
              {upcomingEvents.length > 0 && (
                <div className="text-center">
                  <p className="font-heading text-3xl font-bold text-white">
                    {upcomingEvents.length}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-white/48">
                    {upcomingEvents.length === 1 ? "Próximo" : "Próximos"}
                  </p>
                </div>
              )}
              {upcomingEvents.length > 0 && allEvents.length > upcomingEvents.length && (
                <div className="h-8 w-px bg-white/15" />
              )}
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-white">{allEvents.length}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/48">
                  No total
                </p>
              </div>
            </div>
          )}
        </BrandContainer>
      </section>

      {/* Events list */}
      <Section className="bg-background">
        {allEvents.length > 0 ? (
          <div className="space-y-16">
            {upcomingEvents.length > 0 && (
              <div>
                <ArchiveSectionHeader label="Próximos eventos" count={upcomingEvents.length} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((evento) => (
                    <EventCard key={evento.id} evento={evento} />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div>
                <ArchiveSectionHeader label="Eventos anteriores" count={pastEvents.length} muted />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((evento) => (
                    <EventCard key={evento.id} evento={evento} isPast />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">Novos eventos serão anunciados em breve.</p>
            <p className="mt-2 text-sm text-muted-foreground/60">
              Acompanhe nossas redes sociais para ficar por dentro da agenda.
            </p>
          </div>
        )}
      </Section>

      {/* Cross-links */}
      <Section className="bg-[#EEE7D9]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              title:   "Modalidades",
              desc:    "Conheça as artes marciais que praticamos e encontre a ideal para você.",
              href:    "/modalidades",
              label:   "Ver modalidades",
              tone:    "outline" as const,
            },
            {
              title:   "Inscrição",
              desc:    "Quer participar? Faça sua inscrição e nossa equipe entrará em contato.",
              href:    "/inscricao",
              label:   "Iniciar inscrição",
              tone:    "secondary" as const,
            },
            {
              title:   "Contato",
              desc:    "Dúvidas sobre eventos ou sobre a associação? Fale conosco.",
              href:    "/contato",
              label:   "Entrar em contato",
              tone:    "outline" as const,
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
