import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import { Users } from "lucide-react"
import type { Modalidade, Turma } from "@/types/database"

export const metadata: Metadata = {
  title: "Modalidades | GŌKAI",
  description: "Conheça as modalidades de artes marciais oferecidas pelo GŌKAI.",
}

export default async function ModalidadesPage() {
  const supabase = await createClient()

  const { data: modalidadesRaw } = await supabase
    .from("modalidade")
    .select("*")
    .eq("ativa", true)
    .order("ordem", { ascending: true, nullsFirst: false })

  const modalidades = (modalidadesRaw ?? []) as Modalidade[]

  // For each modalidade, count active turmas
  const turmasCounts: Record<string, number> = {}
  if (modalidades.length > 0) {
    const { data: turmasRaw } = await supabase
      .from("turma")
      .select("modalidade_id")
      .eq("status", "ativa")

    const turmas = (turmasRaw ?? []) as Pick<Turma, "modalidade_id">[]
    for (const turma of turmas) {
      turmasCounts[turma.modalidade_id] = (turmasCounts[turma.modalidade_id] ?? 0) + 1
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            O que praticamos
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Modalidades</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Oferecemos diferentes modalidades de artes marciais para todas as idades e níveis de
            experiência.
          </p>
        </div>
      </section>

      {/* Modalidades grid */}
      <Section className="bg-zinc-950">
        {modalidades.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalidades.map((modalidade) => {
              const turmaCount = turmasCounts[modalidade.id] ?? 0

              return (
                <div
                  key={modalidade.id}
                  className="bg-zinc-900 rounded-xl ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Image or placeholder */}
                  {modalidade.imagem_url ? (
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={modalidade.imagem_url}
                        alt={modalidade.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      <span className="text-4xl font-bold text-zinc-600 tracking-widest">
                        {modalidade.nome.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-zinc-100">{modalidade.nome}</h3>
                      {turmaCount > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 shrink-0 mt-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>
                            {turmaCount} {turmaCount === 1 ? "turma" : "turmas"}
                          </span>
                        </div>
                      )}
                    </div>

                    {modalidade.descricao && (
                      <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        {modalidade.descricao}
                      </p>
                    )}

                    <Link
                      href="/inscricao"
                      className="mt-2 inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Ver turmas e horários →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">Novas modalidades serão disponibilizadas em breve.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">
            Pronto para começar?
          </h2>
          <p className="text-zinc-400 mb-6">
            Escolha sua modalidade e faça sua inscrição. Nossa equipe entrará em contato.
          </p>
          <Link
            href="/inscricao"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-zinc-950 font-semibold hover:bg-red-500 transition-colors"
          >
            Iniciar minha jornada
          </Link>
        </div>
      </section>
    </>
  )
}
