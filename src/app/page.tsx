import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { Section } from "@/components/marketing/section"
import type { Modalidade, Evento, Patrocinador, EventoTipo, PatrocinadorNivel } from "@/types/database"

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatEventDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr))
}

const eventoTipoLabel: Record<EventoTipo, string> = {
  campeonato: "Campeonato",
  seminario: "Seminário",
  treino_especial: "Treino Especial",
  social: "Social",
  outro: "Outro",
}

const nivelOrder: PatrocinadorNivel[] = ["ouro", "prata", "bronze", "apoiador"]

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getModalidades(): Promise<Modalidade[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("modalidade")
      .select("*")
      .eq("ativa", true)
      .order("ordem", { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

async function getProximosEventos(): Promise<Evento[]> {
  try {
    const supabase = await createClient()
    const now = new Date().toISOString()
    const { data } = await supabase
      .from("evento")
      .select("*")
      .eq("publicado", true)
      .gte("data_inicio", now)
      .order("data_inicio", { ascending: true })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

async function getPatrocinadores(): Promise<Patrocinador[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("patrocinador")
      .select("*")
      .eq("ativo", true)
      .eq("exibir_site", true)
    return data ?? []
  } catch {
    return []
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [modalidades, eventos, patrocinadores] = await Promise.all([
    getModalidades(),
    getProximosEventos(),
    getPatrocinadores(),
  ])

  const sortedPatrocinadores = nivelOrder.flatMap((nivel) =>
    patrocinadores.filter((p) => p.nivel === nivel)
  )

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-600/20 selection:text-zinc-100">
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
          {/* Main Background Texture */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(161,161,170,0.03),transparent_70%)]" />
            <div 
              className="absolute inset-0 opacity-[0.02]" 
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
            />
          </div>

          {/* Large Background Watermark */}
          <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 select-none opacity-[0.03]">
            <span className="text-[20vw] font-bold tracking-tight text-zinc-100">GŌKAI</span>
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
              {/* Overline */}
              <div className="mb-8 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-zinc-700" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
                  A disciplina constrói o caminho. A evolução é o destino.
                </span>
                <span className="h-px w-8 bg-zinc-700" />
              </div>

              {/* Main heading */}
              <h1 className="text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-zinc-50">A disciplina forma o caminho.</span>
                <br />
                <span className="text-zinc-400">A evolução é o destino.</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl font-medium">
                Formar atletas e cidadãos por meio da prática esportiva e da construção de valores.
              </p>

              {/* CTA buttons */}
              <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link
                  href="/inscricao"
                  className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-red-600 px-10 text-base font-bold text-zinc-950 transition-all hover:bg-red-500 active:scale-95"
                >
                  <span className="relative z-10">Conhecer o GŌKAI</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-zinc-700 px-10 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-400 hover:text-zinc-50 active:scale-95"
                >
                  Conhecer a Associação
                  <ArrowRightIcon className="size-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Section ─────────────────────────────────────────────────── */}
        <section className="relative z-20 -mt-10 border-y border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Atletas Ativos", value: "+120" },
                { label: "Modalidades", value: "06" },
                { label: "Polos", value: "03" },
                { label: "Projetos Parceiros", value: "03" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-zinc-50 sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Modalidades ───────────────────────────────────────────────────── */}
        <Section
          id="modalidades"
          title="Nossas Modalidades"
          subtitle="Técnicas milenares e esportes modernos para todas as idades."
          className="bg-zinc-950 pt-32"
        >
          {modalidades.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {modalidades.map((modalidade) => (
                <Link
                  key={modalidade.id}
                  href={`/modalidades#${modalidade.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-500 hover:border-zinc-600 hover:-translate-y-1"
                >
                  {/* Image placeholder */}
                  <div className="relative h-64 overflow-hidden">
                    {modalidade.imagem_url ? (
                      <Image
                        src={modalidade.imagem_url}
                        alt={modalidade.nome}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors">
                        <span className="text-5xl font-bold tracking-tight text-zinc-700 opacity-50">
                          {modalidade.nome.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Tag */}
                    <div className="absolute left-6 top-6">
                      <span className="rounded-full bg-zinc-800/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300 border border-zinc-700">
                        Dojo
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-1 flex-col gap-3 p-8">
                    <h3 className="text-xl font-bold text-zinc-100 transition-colors group-hover:text-zinc-50">
                      {modalidade.nome}
                    </h3>
                    {modalidade.descricao && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">
                        {modalidade.descricao}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Saiba mais
                      <div className="h-px w-8 bg-zinc-500 transition-all group-hover:w-12" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-zinc-800 mb-4" />
              <p className="text-zinc-500">
                Em breve novas modalidades serão anunciadas.
              </p>
            </div>
          )}
        </Section>

        {/* ── Por que treinar? ──────────────────────────────────────────────── */}
        <section className="bg-zinc-900 py-32 relative overflow-hidden">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                 <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl leading-tight">
                   Muito mais que um esporte. <br />
                   <span className="text-green-500">Uma filosofia de vida.</span>
                 </h2>
                 <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                   No GŌKAI, o treinamento é formação séria — não academia comum. Disciplina, respeito e evolução contínua são a base de tudo que fazemos.
                 </p>

                 <div className="mt-12 space-y-8">
                   {[
                     { title: "Disciplina", desc: "A base de toda evolução. Cultivada a cada treino, levada do tatame para a vida." },
                     { title: "Respeito", desc: "Ao mestre, ao adversário, ao caminho e a si mesmo." },
                     { title: "Evolução Contínua", desc: "Sempre buscar a próxima versão de si — técnica, mental e pessoal.", accent: "green" },
                     { title: "Inclusão Social", desc: "O esporte como ferramenta de transformação e acesso para todos." },
                     { title: "Cidadania", desc: "Formar atletas conscientes de seus direitos e deveres na comunidade." },
                     { title: "Mérito", desc: "Cada conquista é resultado de esforço real. Nada é dado, tudo é conquistado." },
                     { title: "Desenvolvimento Humano", desc: "Formar pessoas completas — corpo, mente e caráter — para a vida." },
                   ].map((item, i) => {
                     const isGreen = "accent" in item && item.accent === "green"
                     return (
                       <div key={i} className="flex gap-6">
                          <div className="flex-none h-12 w-12 rounded-xl border border-zinc-700 bg-zinc-800/50 flex items-center justify-center font-medium text-zinc-400">
                            0{i+1}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-zinc-100">{item.title}</h4>
                            <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
                          </div>
                       </div>
                     )
                   })}
                 </div>
               </div>
               
               <div className="relative aspect-square">
                 <div className="absolute inset-0 bg-zinc-800/40 rounded-3xl -rotate-3 border border-zinc-700" />
                 <div className="absolute inset-0 bg-zinc-800 rounded-3xl border border-zinc-700 overflow-hidden flex items-center justify-center">
                    {/* Placeholder for association photo */}
                    <div className="text-zinc-600 text-center p-12">
                      <div className="size-20 bg-zinc-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                         <span className="text-zinc-400 text-3xl font-bold">G</span>
                      </div>
                      <p className="text-sm font-medium">Foto da Nossa Sede / Alunos treinando</p>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* ── Próximos Eventos ──────────────────────────────────────────────── */}
        {eventos.length > 0 && (
          <Section
            id="eventos"
            title="Agenda GŌKAI"
            subtitle="Campeonatos, seminários e eventos especiais."
            className="bg-zinc-950"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="group flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {eventoTipoLabel[evento.tipo]}
                    </span>
                    <div className="text-right">
                       <p className="text-2xl font-bold text-zinc-100">{new Date(evento.data_inicio).getDate()}</p>
                       <p className="text-[10px] font-medium uppercase tracking-tight text-zinc-500">
                         {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(evento.data_inicio))}
                       </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold leading-tight text-zinc-100 group-hover:text-zinc-50 transition-colors">
                      {evento.titulo}
                    </h3>
                    <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-500 font-medium">
                      <span className="flex items-center gap-2">
                        <MapPinIcon className="size-4 shrink-0 text-zinc-500" />
                        {evento.local || "Polo São Mateus"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/eventos"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-zinc-800 px-8 text-sm font-medium uppercase tracking-wider text-zinc-300 transition-all hover:border-zinc-600 hover:text-zinc-50"
              >
                Calendário Completo
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </Section>
        )}

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-zinc-900 border-y border-zinc-800 py-32">
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
              Inicie sua jornada
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              O caminho começa com o primeiro passo.
            </h2>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
              Um ambiente sério de formação marcial. Para quem busca disciplina, evolução e resultados reais.
            </p>
            <div className="mt-12">
              <Link
                href="/inscricao"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-red-600 px-10 text-base font-bold text-zinc-950 transition-all hover:bg-red-500 active:scale-95"
              >
                <span className="relative z-10">Conhecer o processo de inscrição</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Patrocinadores ────────────────────────────────────────────────── */}
        {sortedPatrocinadores.length > 0 && (
          <Section
            id="apoiadores"
            title="Parceiros do Esporte"
            subtitle="Marcas que impulsionam o GŌKAI e nossos atletas."
            className="bg-zinc-950 pb-32"
          >
            <div className="flex flex-wrap items-center justify-center gap-12">
              {sortedPatrocinadores.map((patrocinador) => (
                <div
                  key={patrocinador.id}
                  className="group flex h-24 w-44 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-600"
                  title={patrocinador.nome}
                >
                  {patrocinador.logo_url ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={patrocinador.logo_url}
                        alt={`Logo ${patrocinador.nome}`}
                        fill
                        className="object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-zinc-300">
                      {patrocinador.nome}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
