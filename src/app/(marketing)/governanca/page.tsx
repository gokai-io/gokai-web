import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import type { CargoDiretoria, DiretorWithAssociado } from "@/types/database"

// Local type for conselheiro_fiscal with joined associado/pessoa
interface ConselheiroFiscalWithAssociado {
  id: string
  associado_id: string
  cargo: string
  data_inicio: string
  data_fim: string | null
  ativo: boolean
  created_at?: string
  updated_at?: string
  associado: { pessoa?: { nome_completo?: string } } | null
}

export const metadata: Metadata = {
  title: "Governança | GŌKAI",
  description: "Estrutura diretiva e conselho fiscal do GŌKAI – Associação Esportiva e Ambiental.",
}

const cargoLabels: Record<CargoDiretoria, string> = {
  presidente: "Presidente",
  vice_presidente: "Vice-Presidente",
  diretor_administrativo: "Diretor Administrativo",
  diretor_financeiro: "Diretor Financeiro",
  diretor_tecnico_esportivo: "Diretor Técnico Esportivo",
}

function formatDateRange(inicio: string, fim: string | null): string {
  const start = new Date(inicio).getFullYear()
  if (!fim) return `${start} – presente`
  const end = new Date(fim).getFullYear()
  return `${start} – ${end}`
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

export default async function GovernancaPage() {
  const supabase = await createClient()

  const { data: diretoresRaw } = await supabase
    .from("diretor")
    .select("*, associado:associado(*, pessoa:pessoa(*))")
    .eq("ativo", true)
    .order("cargo", { ascending: true })

  const { data: conselheirosRaw } = await supabase
    .from("conselheiro_fiscal")
    .select("*, associado:associado(*, pessoa:pessoa(*))")
    .eq("ativo", true)
    .order("data_inicio", { ascending: false })

  const diretores = (diretoresRaw ?? []) as DiretorWithAssociado[]
  const conselheiros = (conselheirosRaw ?? []) as ConselheiroFiscalWithAssociado[]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Institucional
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Governança</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Estrutura diretiva do GŌKAI
          </p>
        </div>
      </section>

      {/* Diretoria */}
      <Section
        className="bg-zinc-950"
        title="Diretoria"
        subtitle="Os membros eleitos responsáveis pela gestão e direção da associação."
      >
        {diretores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diretores.map((diretor) => {
              const pessoa = (diretor.associado as { pessoa?: { nome_completo?: string } } | null)?.pessoa
              const nome = pessoa?.nome_completo ?? "Nome não informado"
              const cargo = diretor.cargo as CargoDiretoria
              const mandato = formatDateRange(diretor.data_inicio, diretor.data_fim)

              return (
                <div
                  key={diretor.id}
                  className="bg-zinc-900 rounded-xl p-6 ring-1 ring-zinc-800 flex flex-col items-center text-center gap-4"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
                    <span className="text-2xl font-bold text-zinc-400">
                      {getInitials(nome)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">{nome}</h3>
                    <p className="text-zinc-400 text-sm font-medium mt-1">
                      {cargoLabels[cargo] ?? cargo}
                    </p>
                    <p className="text-zinc-500 text-xs mt-2">Mandato: {mandato}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-zinc-500">
            Em estruturação. Novas informações serão disponibilizadas em breve.
          </p>
        )}
      </Section>

      {/* Conselho Fiscal */}
      <Section
        className="bg-zinc-900"
        title="Conselho Fiscal"
        subtitle="Os conselheiros responsáveis pela fiscalização das contas e atos da diretoria."
      >
        {conselheiros.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conselheiros.map((conselheiro) => {
              const pessoa = (conselheiro.associado as { pessoa?: { nome_completo?: string } } | null)?.pessoa
              const nome = pessoa?.nome_completo ?? "Nome não informado"
              const mandato = formatDateRange(conselheiro.data_inicio, conselheiro.data_fim)

              return (
                <div
                  key={conselheiro.id}
                  className="bg-zinc-800 rounded-xl p-6 ring-1 ring-zinc-700 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-zinc-400">
                      {getInitials(nome)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-zinc-100">{nome}</h3>
                    <p className="text-zinc-400 text-sm font-medium mt-1">
                      {conselheiro.cargo ?? "Conselheiro Fiscal"}
                    </p>
                    <p className="text-zinc-500 text-xs mt-2">Mandato: {mandato}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-zinc-500">
            Em estruturação. Novas informações serão disponibilizadas em breve.
          </p>
        )}
      </Section>
    </>
  )
}
