import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Users,
} from "lucide-react"
import {
  canonicalUrl,
  pageOpenGraph,
  twitterCard,
  siteConfig,
  buildLocalBusinessJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo"
import {
  LOCATIONS,
  getLocationBySlug,
  cityDisplay,
  localLabel,
} from "@/lib/locations"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/site"

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ cidade: string }>
}

// ─── Static params — only generates pages for confirmed LOCATIONS ──────────────

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ cidade: loc.slug }))
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params
  const loc = getLocationBySlug(cidade)
  if (!loc) return { title: "Localidade não encontrada | GŌKAI" }

  const cityLabel = localLabel(loc)
  const title = `Artes Marciais em ${cityLabel} | ${siteConfig.name}`
  const description =
    loc.descricao ??
    `O ${siteConfig.name} oferece treinos de artes marciais em ${cityLabel}. ` +
      `Turmas para iniciantes e avançados, com professores qualificados e ambiente de formação técnica e humana.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/localidades/${loc.slug}`),
    },
    openGraph: pageOpenGraph({
      title,
      description,
      path: `/localidades/${loc.slug}`,
      type: "website",
    }),
    twitter: {
      ...twitterCard,
      title,
      description,
    },
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function LocalidadePage({ params }: Props) {
  const { cidade } = await params
  const loc = getLocationBySlug(cidade)
  if (!loc) notFound()

  const cityLabel = localLabel(loc)
  const cityFull = cityDisplay(loc)

  // JSON-LD — LocalBusiness structured data
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    cidade: loc.cidade,
    bairro: loc.bairro,
    estado: loc.estado,
    endereco: loc.endereco,
    telefone: CONTACT_PHONE_HREF,
    email: CONTACT_EMAIL,
    mapaUrl: loc.mapaUrl,
    slug: loc.slug,
  })

  // JSON-LD — Breadcrumb
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Localidades", url: canonicalUrl("/localidades") },
    { name: cityLabel },
  ])

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* ── Structured data ─────────────────────────────────────────────────── */}
      <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        {/* Background — abstract topographic/location feel */}
        <div className="absolute inset-0 bg-surface-dark-alt">
          {/* Atmospheric radial gradient — city glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(220,38,38,0.09),transparent_65%)]" />
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Watermark city name */}
          <div className="absolute inset-0 flex items-center justify-end pr-6 lg:pr-16 pointer-events-none select-none overflow-hidden">
            <span className="text-[13vw] font-black text-white/8 tracking-tighter leading-none uppercase">
              {loc.cidade.split(" ")[0]}
            </span>
          </div>
          {/* Diagonal accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
            {/* Breadcrumb */}
            <Link
              href="/localidades"
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark-secondary)] transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Localidades
            </Link>

            <div className="max-w-3xl">
              {/* Location badge */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-red-600" />
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">
                  <MapPin className="w-3 h-3" />
                  {loc.bairro ? `${loc.bairro} · ${cityFull}` : cityFull}
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black tracking-tight text-[var(--text-on-dark)] leading-[0.9] mb-6">
                Artes Marciais
                <br />
                <span className="text-[var(--text-on-dark-secondary)]">em {cityLabel}</span>
              </h1>

              {/* Description */}
              {loc.descricao && (
                <p className="text-lg text-[var(--text-on-dark-secondary)] leading-relaxed max-w-2xl font-light">
                  {loc.descricao}
                </p>
              )}

              {/* Modality pill tags */}
              {loc.modalidades.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {loc.modalidades.map((mod) => (
                    <Link
                      key={mod.slug}
                      href={`/modalidades/${mod.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/6 px-3.5 py-1.5 text-[11px] font-semibold text-[var(--text-on-dark-secondary)] hover:border-red-600/50 hover:text-[var(--text-on-dark)] transition-all duration-200"
                    >
                      {mod.nome}
                      <ArrowRight className="w-2.5 h-2.5 text-[var(--text-on-dark-muted)]" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Left / main column ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-20">

            {/* Section 01 — Modalidades em [Cidade] */}
            {loc.modalidades.length > 0 && (
              <section aria-labelledby="modalidades-heading">
                <SectionLabel
                  num="01"
                  label={`Modalidades em ${loc.cidade}`}
                  id="modalidades-heading"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loc.modalidades.map((mod) => (
                    <Link
                      key={mod.slug}
                      href={`/modalidades/${mod.slug}`}
                      className="group relative rounded-xl border border-white/12 bg-surface-dark-alt/40 p-6 hover:border-white/28 hover:bg-surface-dark-alt/70 transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover accent */}
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-red-600/0 via-red-600/40 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <h3 className="font-bold text-[var(--text-on-dark)] group-hover:text-[var(--text-on-dark)] transition-colors mb-2">
                        {mod.nome}
                      </h3>
                      {mod.tagline && (
                        <p className="text-sm text-[var(--text-on-dark-muted)] leading-relaxed mb-4">
                          {mod.tagline}
                        </p>
                      )}
                      <span className="text-[11px] font-semibold text-[var(--text-on-dark-muted)] group-hover:text-red-500 transition-colors">
                        Ver modalidade →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Section 02 — Para quem são as aulas */}
            <section aria-labelledby="para-quem-heading">
              <SectionLabel
                num={loc.modalidades.length > 0 ? "02" : "01"}
                label={`Artes marciais em ${loc.cidade} — para quem é?`}
                id="para-quem-heading"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Crianças e Adolescentes",
                    desc: `Turmas pedagógicas adaptadas para jovens em ${loc.cidade}. Disciplina, foco e formação de caráter desde cedo.`,
                  },
                  {
                    label: "Adultos Iniciantes",
                    desc: "Nenhuma experiência anterior necessária. Começamos do zero, com progressão respeitosa e ambiente acolhedor.",
                  },
                  {
                    label: "Praticantes Avançados",
                    desc: "Treinamento técnico e competitivo para quem busca evolução real e desafio constante no tatame.",
                  },
                  {
                    label: "Qualquer Fase da Vida",
                    desc: "Artes marciais não têm idade. Adultos de todas as idades encontram no GŌKAI um espaço de evolução e saúde.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/12 bg-surface-dark-alt/30 p-6 hover:border-white/18 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="mt-0.5 flex-none size-5 rounded-full border border-red-600/30 bg-red-600/10 flex items-center justify-center">
                        <ChevronRight className="size-3 text-red-500" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text-on-dark)]">{item.label}</h3>
                    </div>
                    <p className="text-sm text-[var(--text-on-dark-muted)] leading-relaxed pl-8">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 03 — Perguntas frequentes */}
            <section aria-labelledby="faq-heading">
              <SectionLabel
                num={loc.modalidades.length > 0 ? "03" : "02"}
                label="Perguntas frequentes"
                id="faq-heading"
              />
              <div className="space-y-3">
                {[
                  {
                    q: `O GŌKAI tem turmas em ${loc.bairro ?? loc.cidade}?`,
                    a: `Sim. ${loc.localNome ? `Os treinos acontecem no ${loc.localNome}.` : `O GŌKAI realiza treinos em ${loc.cidade}.`} ${
                      loc.endereco ? `Endereço: ${loc.endereco}.` : "Entre em contato para confirmar os horários e endereço exato."
                    }`,
                  },
                  {
                    q: "Preciso ter experiência para começar?",
                    a: "Não. Nossas turmas aceitam iniciantes sem qualquer experiência prévia. A evolução é progressiva e respeitosa com cada praticante.",
                  },
                  {
                    q: `Há turmas de artes marciais para crianças em ${loc.cidade}?`,
                    a: `Sim. O GŌKAI oferece turmas com metodologia pedagógica adaptada para crianças e adolescentes em ${loc.cidade}, com professores especializados nesse público.`,
                  },
                  {
                    q: "Como faço para me inscrever?",
                    a: "Preencha o formulário de inscrição no nosso site. Nossa equipe entrará em contato para orientar sobre horários, modalidades e próximos passos.",
                  },
                  {
                    q: "Quais modalidades de artes marciais são oferecidas?",
                    a:
                      loc.modalidades.length > 0
                        ? `Em ${loc.cidade}, o GŌKAI oferece: ${loc.modalidades.map((m) => m.nome).join(", ")}.`
                        : `O GŌKAI oferece diversas modalidades de artes marciais. Consulte nossa página de modalidades ou entre em contato para saber quais estão disponíveis em ${loc.cidade}.`,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/12 bg-surface-dark-alt/20 p-6 hover:border-white/18 transition-colors"
                  >
                    <h3 className="text-sm font-bold text-[var(--text-on-dark)] mb-3">{item.q}</h3>
                    <p className="text-sm text-[var(--text-on-dark-muted)] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Primary CTA card */}
            <div className="rounded-2xl border border-white/18/80 bg-surface-dark-alt p-7 lg:sticky lg:top-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-on-dark-muted)]">
                  {cityLabel}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text-on-dark)] mb-1.5">
                Comece em {loc.cidade}
              </h2>
              <p className="text-sm text-[var(--text-on-dark-secondary)] leading-relaxed mb-6">
                Inscreva-se e dê o primeiro passo. Nossa equipe orienta você em cada etapa.
              </p>

              <Link
                href="/inscricao"
                className="group relative block w-full overflow-hidden rounded-xl bg-red-600 px-5 py-3.5 text-center text-sm font-bold text-surface-dark hover:bg-red-500 transition-colors"
              >
                <span className="relative z-10">Iniciar inscrição</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              <Link
                href="/contato"
                className="mt-2.5 block w-full rounded-xl border border-white/18 px-5 py-3 text-center text-sm font-medium text-[var(--text-on-dark-secondary)] hover:border-white/35 hover:text-[var(--text-on-dark)] transition-colors"
              >
                Falar com a equipe
              </Link>

              <p className="mt-5 text-center text-xs text-[var(--text-on-dark-muted)]">
                Iniciantes e todos os níveis são bem-vindos
              </p>
            </div>

            {/* Location info card */}
            {(loc.endereco || loc.mapaUrl || CONTACT_PHONE_DISPLAY || CONTACT_EMAIL) && (
              <div className="rounded-2xl border border-white/12 bg-surface-dark-alt/40 p-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-on-dark-secondary)] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-on-dark-muted)]" />
                  Informações de contato
                </h2>

                {loc.localNome && (
                  <div>
                    <p className="text-[10px] text-[var(--text-on-dark-muted)] uppercase tracking-wide font-medium mb-1">
                      Local de treino
                    </p>
                    <p className="text-sm text-[var(--text-on-dark-secondary)] font-medium">{loc.localNome}</p>
                  </div>
                )}

                {loc.endereco && (
                  <div>
                    <p className="text-[10px] text-[var(--text-on-dark-muted)] uppercase tracking-wide font-medium mb-1">
                      Endereço
                    </p>
                    <p className="text-sm text-[var(--text-on-dark-secondary)] leading-relaxed">{loc.endereco}</p>
                  </div>
                )}

                {loc.mapaUrl && (
                  <a
                    href={loc.mapaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-400 transition-colors"
                  >
                    Ver no mapa
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {CONTACT_PHONE_DISPLAY && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-on-dark-secondary)]">
                    <Phone className="w-3.5 h-3.5 text-[var(--text-on-dark-muted)] shrink-0" />
                    <a
                      href={`tel:${CONTACT_PHONE_HREF}`}
                      className="hover:text-[var(--text-on-dark)] transition-colors"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </div>
                )}

                {CONTACT_EMAIL && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-on-dark-secondary)]">
                    <Mail className="w-3.5 h-3.5 text-[var(--text-on-dark-muted)] shrink-0" />
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="hover:text-[var(--text-on-dark)] transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Schedule teaser */}
            <div className="rounded-2xl border border-white/12 bg-surface-dark-alt/40 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-[var(--text-on-dark-muted)]" />
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-on-dark-secondary)]">
                  Horários
                </h2>
              </div>
              <p className="text-sm text-[var(--text-on-dark-muted)] leading-relaxed mb-4">
                Consulte os horários disponíveis para cada modalidade em {loc.cidade}.
              </p>
              <Link
                href="/modalidades"
                className="text-xs font-semibold text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] transition-colors"
              >
                Ver todas as modalidades →
              </Link>
            </div>

            {/* Back link */}
            <Link
              href="/localidades"
              className="flex items-center gap-2 text-sm text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark-secondary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ver todas as localidades
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA banner ───────────────────────────────────────────────── */}
      <section className="border-t border-white/12 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-on-dark-muted)] mb-2">
                {siteConfig.name} — {cityLabel}
              </p>
              <h2 className="text-2xl font-bold text-[var(--text-on-dark)]">
                Artes marciais em {loc.cidade}. Comece hoje.
              </h2>
              <p className="mt-2 text-sm text-[var(--text-on-dark-muted)]">
                A disciplina forma o caminho. A evolução é o destino.
              </p>
            </div>
            <Link
              href="/inscricao"
              className="shrink-0 group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-red-600 px-8 text-sm font-bold text-surface-dark hover:bg-red-500 transition-colors"
            >
              <span className="relative z-10">Iniciar inscrição</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Sub-component: SectionLabel ─────────────────────────────────────────────

function SectionLabel({
  num,
  label,
  id,
}: {
  num: string
  label: string
  id: string
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 tabular-nums select-none">
        {num}
      </span>
      <h2 id={id} className="text-xl sm:text-2xl font-bold text-[var(--text-on-dark)]">
        {label}
      </h2>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  )
}
