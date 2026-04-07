import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { InscricaoForm } from "./inscricao-form"
import type { Modalidade } from "@/types/database"

export const metadata: Metadata = {
  title: "Inscreva-se | GŌKAI",
  description: "Faça sua inscrição no GŌKAI – Associação Esportiva e Ambiental.",
}

export default async function InscricaoPage() {
  const supabase = await createClient()

  const { data: modalidades } = await supabase
    .from("modalidade")
    .select("id, nome, slug")
    .eq("ativa", true)
    .order("ordem", { ascending: true, nullsFirst: false })

  const list = (modalidades ?? []) as Modalidade[]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Inicie sua formação
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Inscreva-se</h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            O GŌKAI é um ambiente sério de formação marcial. Preencha o formulário e nossa equipe
            entrará em contato para dar sequência à sua matrícula.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <InscricaoForm modalidades={list} />
        </div>
      </section>
    </div>
  )
}
