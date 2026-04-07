import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import type { ProfessorWithPessoa } from "@/types/database"

export const metadata: Metadata = {
  title: "Professores | GŌKAI",
  description: "Conheça os professores do GŌKAI – Associação Esportiva e Ambiental.",
}

function getInitials(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

export default async function ProfessoresPage() {
  const supabase = await createClient()

  const { data: professores } = await supabase
    .from("professor")
    .select("*, pessoa:pessoa(*)")
    .eq("exibir_site", true)
    .eq("status", "ativo")
    .order("created_at", { ascending: true })

  const list = (professores ?? []) as ProfessorWithPessoa[]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Corpo Docente
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Nossos Professores
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Profissionais experientes e apaixonados pelas artes marciais, dedicados ao
            desenvolvimento de cada aluno.
          </p>
        </div>
      </section>

      {/* Professors grid */}
      <Section className="bg-zinc-950">
        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((prof) => {
              const nome = prof.pessoa?.nome_completo ?? "Professor"

              return (
                <div
                  key={prof.id}
                  className="bg-zinc-900 rounded-xl ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Avatar area */}
                  <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
                      <span className="text-3xl font-bold text-zinc-400">
                        {getInitials(nome)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{nome}</h3>
                      {prof.graduacao && (
                        <p className="text-zinc-400 text-sm font-medium mt-0.5">
                          {prof.graduacao}
                        </p>
                      )}
                    </div>

                    {prof.especialidades && prof.especialidades.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {prof.especialidades.map((esp) => (
                          <Badge key={esp} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                            {esp}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {prof.bio && (
                      <p className="text-sm text-zinc-400 leading-relaxed mt-1">
                        {truncate(prof.bio, 160)}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">Em breve você conhecerá nossa equipe técnica.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">
            Quer treinar com nossos professores?
          </h2>
          <p className="text-zinc-400 mb-6">
            Faça sua inscrição e comece sua jornada nas artes marciais.
          </p>
          <a
            href="/inscricao"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-zinc-950 font-semibold hover:bg-red-500 transition-colors"
          >
            Iniciar minha jornada
          </a>
        </div>
      </section>
    </>
  )
}
