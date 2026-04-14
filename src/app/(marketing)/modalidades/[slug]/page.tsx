import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard, siteConfig } from "@/lib/seo"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Users, Clock, MapPin, ChevronRight } from "lucide-react"
import type { Modalidade, Professor, Pessoa, Turma } from "@/types/database"
import { professorSlug } from "@/lib/slug"

// ─── Local types ───────────────────────────────────────────────────────────────

interface ProfessorComPessoa extends Professor {
  pessoa: Pessoa
}

interface TurmaComProfessor extends Turma {
  professor: ProfessorComPessoa | null
}

interface Props {
  params: Promise<{ slug: string }>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIAS_SEMANA: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
}

function formatHorario(horario: string | null): string {
  if (!horario) return ""
  // Strip seconds (HH:MM:SS → HH:MM)
  return horario.slice(0, 5)
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("modalidade")
    .select("nome, descricao, imagem_url")
    .eq("slug", slug)
    .eq("ativa", true)
    .single()

  if (!data) {
    return { title: "Modalidade não encontrada | GŌKAI" }
  }

  const nome = data.nome as string
  const descricao = data.descricao as string | null
  const imagem_url = data.imagem_url as string | null

  const title = `${nome} | GŌKAI`
  const description =
    descricao ??
    `Conheça a modalidade de ${nome} no GŌKAI – artes marciais para todas as idades e níveis. Turmas com professores qualificados e ambiente de formação técnica e humana.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/modalidades/${slug}`),
    },
    openGraph: pageOpenGraph({
      title,
      description,
      path: `/modalidades/${slug}`,
      imageUrl: imagem_url,
      type: "website",
    }),
    twitter: {
      ...twitterCard,
      title,
      description,
      ...(imagem_url ? { images: [imagem_url] } : {}),
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ModalidadeDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the modality
  const { data: modalidadeRaw } = await supabase
    .from("modalidade")
    .select("*")
    .eq("slug", slug)
    .eq("ativa", true)
    .single()

  if (!modalidadeRaw) {
    notFound()
  }

  const modalidade = modalidadeRaw as Modalidade

  // Fetch active turmas with professor → pessoa join
  const { data: turmasRaw } = await supabase
    .from("turma")
    .select("*, professor:professor(*, pessoa:pessoa(*))")
    .eq("modalidade_id", modalidade.id)
    .eq("status", "ativa")
    .order("horario_inicio", { ascending: true })

  const turmas = (turmasRaw ?? []) as TurmaComProfessor[]

  // Deduplicate professors
  const professoresMap = new Map<string, ProfessorComPessoa>()
  for (const turma of turmas) {
    if (turma.professor) {
      professoresMap.set(turma.professor.id, turma.professor)
    }
  }
  const professores = Array.from(professoresMap.values())

  // JSON-LD – SportsActivityLocation
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: `${modalidade.nome} – ${siteConfig.name}`,
    description: modalidade.descricao ?? undefined,
    url: canonicalUrl(`/modalidades/${slug}`),
    ...(modalidade.imagem_url ? { image: modalidade.imagem_url } : {}),
    organizer: {
      "@type": "SportsOrganization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  }

  // Section counter helper
  let sectionNum = 0
  function nextNum() {
    sectionNum++
    return String(sectionNum).padStart(2, "0")
  }

  const hasAbout = !!(modalidade.conteudo || modalidade.descricao)

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[58vh] flex items-end overflow-hidden">
        {/* Background layer */}
        {modalidade.imagem_url ? (
          <div className="absolute inset-0">
            <Image
              src={modalidade.imagem_url}
              alt={modalidade.nome}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/65 to-surface-dark/25" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-surface-dark-alt">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_65%,rgba(220,38,38,0.07),transparent_55%)]" />
            <div
              className="absolute inset-0 opacity-[0.022]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Watermark initials */}
            <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden">
              <span className="text-[22vw] font-black text-white/8 tracking-tighter leading-none">
                {modalidade.nome.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Hero text */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
            <Link
              href="/modalidades"
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--text-on-dark-secondary)] hover:text-[var(--text-on-dark)] transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Modalidades
            </Link>

            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">
                  Modalidade
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight text-[var(--text-on-dark)] leading-[0.88] mb-6">
                {modalidade.nome}
              </h1>
              {modalidade.descricao && (
                <p className="text-lg sm:text-xl text-[var(--text-on-dark-secondary)] leading-relaxed max-w-2xl font-light">
                  {modalidade.descricao}
                </p>
              )}
            </div>

            {/* Quick stats row */}
            {(turmas.length > 0 || professores.length > 0) && (
              <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-[var(--text-on-dark-muted)]">
                {turmas.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {turmas.length} {turmas.length === 1 ? "turma ativa" : "turmas ativas"}
                    </span>
                  </div>
                )}
                {professores.length > 0 && turmas.length > 0 && (
                  <span className="h-3 w-px bg-white/22" aria-hidden />
                )}
                {professores.length > 0 && (
                  <span>
                    {professores.length}{" "}
                    {professores.length === 1 ? "instrutor" : "instrutores"}
                  </span>
                )}
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

            {/* 01 – Sobre a modalidade */}
            {hasAbout && (
              <section aria-labelledby="sobre-heading">
                <SectionLabel num={nextNum()} label="Sobre a modalidade" id="sobre-heading" />
                <div className="text-[var(--text-on-dark-secondary)] leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                  {modalidade.conteudo ?? modalidade.descricao}
                </div>
              </section>
            )}

            {/* 02 – Para quem é */}
            <section aria-labelledby="para-quem-heading">
              <SectionLabel num={nextNum()} label="Para quem é" id="para-quem-heading" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Iniciantes",
                    desc: "Nenhuma experiência necessária. Começamos do zero com método claro e progressão respeitosa.",
                  },
                  {
                    label: "Crianças e Jovens",
                    desc: "Turmas com abordagem pedagógica adaptada — formação humana e disciplina desde cedo.",
                  },
                  {
                    label: "Adultos",
                    desc: "Técnica, condicionamento e desenvolvimento pessoal em qualquer fase da vida.",
                  },
                  {
                    label: "Avançados",
                    desc: "Ambiente competitivo para quem busca evolução técnica e desafio real no tatame.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/12 bg-surface-dark-alt/30 p-6 hover:border-white/18 transition-colors duration-300"
                  >
                    <h3 className="text-sm font-bold text-[var(--text-on-dark)] mb-2">{item.label}</h3>
                    <p className="text-sm text-[var(--text-on-dark-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 – Benefícios */}
            <section aria-labelledby="beneficios-heading">
              <SectionLabel
                num={nextNum()}
                label="Benefícios do treinamento"
                id="beneficios-heading"
              />
              <div className="space-y-0">
                {[
                  "Desenvolvimento técnico progressivo com acompanhamento de instrutores qualificados",
                  "Condicionamento físico completo: resistência, força, agilidade e coordenação motora",
                  "Disciplina e foco trabalhados a cada treino — dentro e fora do tatame",
                  "Respeito, ética e espírito de equipe como pilares permanentes da formação",
                  "Ambiente inclusivo e seguro para todas as idades e níveis de experiência",
                  "Evolução mensurável com feedback constante e estruturado pelos professores",
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0"
                  >
                    <div className="mt-0.5 flex-none size-5 rounded-full border border-red-600/30 bg-red-600/10 flex items-center justify-center">
                      <ChevronRight className="size-3 text-red-500" />
                    </div>
                    <p className="text-sm sm:text-base text-[var(--text-on-dark-secondary)] leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 – Instrutores */}
            {professores.length > 0 && (
              <section aria-labelledby="instrutores-heading">
                <SectionLabel num={nextNum()} label="Instrutores" id="instrutores-heading" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {professores.map((prof) => (
                    <Link
                      key={prof.id}
                      href={`/professores/${professorSlug(prof.pessoa.nome_completo)}`}
                      className="group flex gap-4 rounded-xl border border-white/12 bg-surface-dark-alt/30 p-6 hover:border-white/28 transition-all duration-300"
                    >
                      {/* Avatar */}
                      {prof.pessoa.foto_url ? (
                        <div className="relative flex-none size-12 rounded-full overflow-hidden border border-white/18 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prof.pessoa.foto_url}
                            alt={prof.pessoa.nome_completo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex-none size-12 rounded-full bg-white/8 border border-white/18 flex items-center justify-center shrink-0">
                          <span className="text-base font-bold text-[var(--text-on-dark-secondary)]">
                            {prof.pessoa.nome_completo.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-[var(--text-on-dark)] group-hover:text-[var(--text-on-dark)] leading-tight truncate transition-colors">
                          {prof.pessoa.nome_completo}
                        </h3>
                        {prof.graduacao && (
                          <p className="text-xs text-red-500 font-medium mt-0.5">
                            {prof.graduacao}
                          </p>
                        )}
                        {prof.bio && (
                          <p className="text-sm text-[var(--text-on-dark-muted)] mt-2 leading-relaxed line-clamp-3">
                            {prof.bio}
                          </p>
                        )}
                        {prof.especialidades && prof.especialidades.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {prof.especialidades.slice(0, 3).map((esp) => (
                              <span
                                key={esp}
                                className="inline-flex rounded-full bg-white/8 border border-white/18/80 px-2.5 py-0.5 text-[10px] font-medium text-[var(--text-on-dark-secondary)]"
                              >
                                {esp}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="mt-3 block text-[11px] font-medium text-[var(--text-on-dark-muted)] group-hover:text-[var(--text-on-dark-secondary)] transition-colors">
                          Ver perfil →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section aria-labelledby="faq-heading">
              <SectionLabel num={nextNum()} label="Perguntas frequentes" id="faq-heading" />
              <div className="space-y-3">
                {[
                  {
                    q: `Preciso ter experiência prévia em ${modalidade.nome}?`,
                    a: "Não. Nossas turmas recebem iniciantes e o desenvolvimento é feito de forma progressiva, respeitando o ritmo de cada praticante.",
                  },
                  {
                    q: "Quais documentos preciso para me inscrever?",
                    a: "Basta preencher o formulário de inscrição online. Nossa equipe entrará em contato para orientar sobre os próximos passos.",
                  },
                  {
                    q: "O GŌKAI tem turmas para crianças?",
                    a: "Sim. Temos turmas com abordagem pedagógica específica para crianças e adolescentes, com professores treinados para esse público.",
                  },
                  {
                    q: "Como funciona a progressão de graduação?",
                    a: "A progressão é avaliada pelos professores com base em técnica, frequência, comportamento e comprometimento. Cada modalidade tem seu sistema próprio.",
                  },
                  {
                    q: "Posso começar em qualquer período do ano?",
                    a: "Sim, desde que haja vagas na turma de interesse. Entre em contato com a equipe para verificar a disponibilidade.",
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

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* CTA card — sticky on large screens */}
            <div className="rounded-2xl border border-white/18/80 bg-surface-dark-alt p-7 lg:sticky lg:top-8">
              <h2 className="text-lg font-bold text-[var(--text-on-dark)] mb-1.5">Pronto para começar?</h2>
              <p className="text-sm text-[var(--text-on-dark-secondary)] leading-relaxed mb-6">
                Inscreva-se e dê o primeiro passo. Nossa equipe orienta você em cada etapa.
              </p>

              {/* Primary CTA */}
              <Link
                href="/inscricao"
                className="group relative block w-full overflow-hidden rounded-xl bg-red-600 px-5 py-3.5 text-center text-sm font-bold text-surface-dark hover:bg-red-500 transition-colors"
              >
                <span className="relative z-10">Iniciar inscrição</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/contato"
                className="mt-2.5 block w-full rounded-xl border border-white/18 px-5 py-3 text-center text-sm font-medium text-[var(--text-on-dark-secondary)] hover:border-white/28 hover:text-[var(--text-on-dark)] transition-colors"
              >
                Falar com a equipe
              </Link>

              <p className="mt-5 text-center text-xs text-[var(--text-on-dark-muted)]">
                Iniciantes e todos os níveis são bem-vindos
              </p>
            </div>

            {/* Schedule card */}
            <div className="rounded-2xl border border-white/12 bg-surface-dark-alt/40 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-3.5 h-3.5 text-[var(--text-on-dark-muted)]" />
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-on-dark-secondary)]">
                  Turmas e horários
                </h2>
              </div>

              {turmas.length > 0 ? (
                <div className="space-y-3">
                  {turmas.map((turma) => (
                    <div
                      key={turma.id}
                      className="rounded-lg border border-white/12 bg-white/5 p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xs font-bold text-[var(--text-on-dark)] leading-snug">
                          {turma.nome}
                        </h3>
                        {turma.vagas !== null && turma.vagas > 0 && (
                          <span className="text-[10px] font-bold text-green-500 shrink-0 whitespace-nowrap">
                            {turma.vagas} vagas
                          </span>
                        )}
                      </div>

                      {/* Days */}
                      {turma.dia_semana && turma.dia_semana.length > 0 && (
                        <p className="text-[11px] text-[var(--text-on-dark-muted)] mb-1 font-medium">
                          {[...turma.dia_semana]
                            .sort((a, b) => a - b)
                            .map((d) => DIAS_SEMANA[d] ?? `Dia ${d}`)
                            .join(" · ")}
                        </p>
                      )}

                      {/* Times */}
                      {(turma.horario_inicio || turma.horario_fim) && (
                        <p className="text-[11px] font-semibold text-[var(--text-on-dark-secondary)]">
                          {formatHorario(turma.horario_inicio)}
                          {turma.horario_fim ? ` – ${formatHorario(turma.horario_fim)}` : ""}
                        </p>
                      )}

                      {/* Location */}
                      {turma.local && (
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[var(--text-on-dark-muted)]">
                          <MapPin className="w-2.5 h-2.5 shrink-0" />
                          <span>{turma.local}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-xs text-[var(--text-on-dark-muted)] leading-relaxed">
                    Turmas em formação.
                    <br />
                    Entre em contato para mais informações.
                  </p>
                </div>
              )}
            </div>

            {/* Back link */}
            <Link
              href="/modalidades"
              className="flex items-center gap-2 text-sm text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark-secondary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ver todas as modalidades
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
                GŌKAI — {modalidade.nome}
              </p>
              <h2 className="text-2xl font-bold text-[var(--text-on-dark)]">Comece hoje. Evolua sempre.</h2>
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
