import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard, siteConfig } from "@/lib/seo"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react"
import type { ProfessorWithPessoa, Modalidade, Turma } from "@/types/database"
import { professorSlug } from "@/lib/slug"

// ─── Local types ──────────────────────────────────────────────────────────────

interface TurmaComModalidade extends Turma {
  modalidade: Modalidade | null
}

interface Props {
  params: Promise<{ slug: string }>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

/**
 * Fetches all active, site-visible professors and returns the one whose
 * derived slug matches the requested URL segment.
 *
 * See src/lib/slug.ts for the full slug strategy and collision notes.
 */
async function findProfessorBySlug(slug: string): Promise<ProfessorWithPessoa | null> {
  const supabase = await createClient()
  const { data: professores } = await supabase
    .from("professor")
    .select("*, pessoa:pessoa(*)")
    .eq("exibir_site", true)
    .eq("status", "ativo")

  if (!professores) return null

  const list = professores as ProfessorWithPessoa[]
  return (
    list.find((p) => professorSlug(p.pessoa?.nome_completo ?? "") === slug) ?? null
  )
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const prof = await findProfessorBySlug(slug)

  if (!prof) {
    return { title: "Professor não encontrado | GŌKAI" }
  }

  const nome = prof.pessoa?.nome_completo ?? "Professor"
  const fotoUrl = prof.pessoa?.foto_url ?? null
  const title = `${nome} | Professores | GŌKAI`
  const description =
    prof.bio ??
    `Conheça ${nome}, instrutor do GŌKAI${prof.graduacao ? ` – ${prof.graduacao}` : ""}. Formação técnica e humana nas artes marciais.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/professores/${slug}`),
    },
    openGraph: pageOpenGraph({
      title,
      description,
      path: `/professores/${slug}`,
      imageUrl: fotoUrl,
      type: "website",
    }),
    twitter: {
      ...twitterCard,
      title,
      description,
      ...(fotoUrl ? { images: [fotoUrl] } : {}),
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProfessorDetailPage({ params }: Props) {
  const { slug } = await params
  const prof = await findProfessorBySlug(slug)

  if (!prof) {
    notFound()
  }

  const supabase = await createClient()

  // Fetch active turmas for this professor, with modalidade join
  const { data: turmasRaw } = await supabase
    .from("turma")
    .select("*, modalidade:modalidade(*)")
    .eq("professor_id", prof.id)
    .eq("status", "ativa")
    .order("horario_inicio", { ascending: true })

  const turmas = (turmasRaw ?? []) as TurmaComModalidade[]

  // Deduplicate modalidades taught by this professor
  const modalidadesMap = new Map<string, Modalidade>()
  for (const turma of turmas) {
    if (turma.modalidade) {
      modalidadesMap.set(turma.modalidade.id, turma.modalidade)
    }
  }
  const modalidades = Array.from(modalidadesMap.values())

  // Derived display values
  const nome = prof.pessoa?.nome_completo ?? "Professor"
  const fotoUrl = prof.pessoa?.foto_url ?? null
  const firstName = nome.split(" ")[0]

  const hasBio = !!prof.bio
  const hasEspecialidades = !!(prof.especialidades && prof.especialidades.length > 0)
  const hasModalidades = modalidades.length > 0

  // JSON-LD — Person (schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: nome,
    url: canonicalUrl(`/professores/${slug}`),
    ...(prof.bio ? { description: prof.bio } : {}),
    ...(prof.graduacao ? { jobTitle: prof.graduacao } : {}),
    ...(fotoUrl ? { image: fotoUrl } : {}),
    worksFor: {
      "@type": "SportsOrganization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    ...(hasEspecialidades ? { knowsAbout: prof.especialidades } : {}),
  }

  // Section counter — increments synchronously during render (safe in RSC)
  let sectionNum = 0
  function nextNum() {
    sectionNum++
    return String(sectionNum).padStart(2, "0")
  }

  return (
    <div className="min-h-screen bg-[#0C2418]">
      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        {/* Background */}
        {fotoUrl ? (
          <div className="absolute inset-0">
            <Image
              src={fotoUrl}
              alt={nome}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2418] via-[#0C2418]/70 to-[#0C2418]/20" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#123020]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(220,38,38,0.06),transparent_55%)]" />
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.018]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Watermark initials */}
            <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden">
              <span className="text-[22vw] font-black text-white/8 tracking-tight leading-none">
                {getInitials(nome)}
              </span>
            </div>
          </div>
        )}

        {/* Hero text */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
            <Link
              href="/professores"
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold text-white/62 hover:text-white/85 transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Professores
            </Link>

            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">
                  Instrutor
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black tracking-tight text-white leading-[0.88] mb-5">
                {nome}
              </h1>

              {prof.graduacao && (
                <p className="text-lg sm:text-xl text-white/72 font-medium">
                  {prof.graduacao}
                </p>
              )}
            </div>

            {/* Quick stats */}
            {hasModalidades && (
              <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/45">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {modalidades.length}{" "}
                    {modalidades.length === 1 ? "modalidade" : "modalidades"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Content area ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Main column ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-20">

            {/* Sobre */}
            {hasBio && (
              <section aria-labelledby="sobre-heading">
                <SectionLabel num={nextNum()} label="Sobre o instrutor" id="sobre-heading" />
                <p className="text-white/62 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
                  {prof.bio}
                </p>
              </section>
            )}

            {/* Especialidades */}
            {hasEspecialidades && (
              <section aria-labelledby="especialidades-heading">
                <SectionLabel
                  num={nextNum()}
                  label="Especialidades"
                  id="especialidades-heading"
                />
                <div className="flex flex-wrap gap-3">
                  {prof.especialidades!.map((esp) => (
                    <div
                      key={esp}
                      className="flex items-center gap-3 rounded-xl border border-white/12 bg-[#123020]/30 px-5 py-3 hover:border-white/18 transition-colors"
                    >
                      <div className="flex-none size-4 rounded-full border border-red-600/30 bg-red-600/10 flex items-center justify-center">
                        <ChevronRight className="size-2.5 text-red-500" />
                      </div>
                      <span className="text-sm font-medium text-white/72">{esp}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Modalidades que leciona */}
            {hasModalidades && (
              <section aria-labelledby="modalidades-heading">
                <SectionLabel
                  num={nextNum()}
                  label="Modalidades que leciona"
                  id="modalidades-heading"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {modalidades.map((mod) => (
                    <Link
                      key={mod.id}
                      href={`/modalidades/${mod.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-white/12 bg-[#123020]/30 p-6 hover:border-white/28 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
                          {mod.nome}
                        </h3>
                        <ChevronRight className="size-4 text-white/30 group-hover:text-white/62 transition-colors shrink-0 mt-0.5" />
                      </div>
                      {mod.descricao && (
                        <p className="text-sm text-white/45 leading-relaxed line-clamp-2">
                          {mod.descricao}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state — shown only when all sections are absent */}
            {!hasBio && !hasEspecialidades && !hasModalidades && (
              <div className="rounded-xl border border-white/12 bg-[#123020]/20 p-12 text-center">
                <p className="text-sm text-white/30">
                  Informações completas em breve.
                </p>
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Identity card */}
            <div className="rounded-2xl border border-white/12 bg-[#123020]/40 p-6 flex items-center gap-5">
              {fotoUrl ? (
                <div className="relative size-16 rounded-full overflow-hidden border-2 border-white/18 shrink-0">
                  <Image src={fotoUrl} alt={nome} fill className="object-cover" />
                </div>
              ) : (
                <div className="size-16 rounded-full bg-white/8 border-2 border-white/18 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-white/62">
                    {getInitials(nome)}
                  </span>
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-white truncate">{nome}</p>
                {prof.graduacao && (
                  <p className="text-xs text-red-500 font-medium mt-0.5 truncate">
                    {prof.graduacao}
                  </p>
                )}
                <p className="text-xs text-white/30 mt-1">Instrutor · GŌKAI</p>
              </div>
            </div>

            {/* CTA card — sticky on large screens */}
            <div className="rounded-2xl border border-white/18/80 bg-[#123020] p-7 lg:sticky lg:top-8">
              <h2 className="text-lg font-bold text-white mb-1.5">
                Treinar com {firstName}?
              </h2>
              <p className="text-sm text-white/62 leading-relaxed mb-6">
                Faça sua inscrição e dê o primeiro passo. Nossa equipe orienta você.
              </p>

              <Link
                href="/inscricao"
                className="group relative block w-full overflow-hidden rounded-xl bg-red-600 px-5 py-3.5 text-center text-sm font-bold text-[#0C2418] hover:bg-red-500 transition-colors"
              >
                <span className="relative z-10">Iniciar inscrição</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              <Link
                href="/contato"
                className="mt-2.5 block w-full rounded-xl border border-white/18 px-5 py-3 text-center text-sm font-medium text-white/62 hover:border-white/28 hover:text-white/85 transition-colors"
              >
                Falar com a equipe
              </Link>

              <p className="mt-5 text-center text-xs text-white/30">
                Iniciantes e todos os níveis são bem-vindos
              </p>
            </div>

            {/* Back to listing */}
            <Link
              href="/professores"
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white/62 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ver todos os professores
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA banner ───────────────────────────────────────────────── */}
      <section className="border-t border-white/12 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">
                GŌKAI — Corpo Docente
              </p>
              <h2 className="text-2xl font-bold text-white">
                Formação técnica e humana.
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Artes marciais para todas as idades e níveis de experiência.
              </p>
            </div>
            <Link
              href="/inscricao"
              className="shrink-0 group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-red-600 px-8 text-sm font-bold text-[#0C2418] hover:bg-red-500 transition-colors"
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
      <h2 id={id} className="text-xl sm:text-2xl font-bold text-white">
        {label}
      </h2>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  )
}
