import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import type { Patrocinador } from "@/types/database"

export const metadata: Metadata = {
  title: "Apoiadores | GŌKAI",
  description: "Conheça os apoiadores do GŌKAI – Associação Esportiva e Ambiental.",
}

export default async function ApoiadoresPage() {
  const supabase = await createClient()

  const { data: apoiadores } = await supabase
    .from("patrocinador")
    .select("*")
    .eq("nivel", "apoiador")
    .eq("exibir_site", true)
    .eq("ativo", true)
    .order("nome", { ascending: true })

  const list = (apoiadores ?? []) as Patrocinador[]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Parceiros
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Nossos Apoiadores
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Pessoas e empresas que acreditam no GŌKAI e apoiam o desenvolvimento das artes
            marciais em nossa comunidade.
          </p>
        </div>
      </section>

      {/* Apoiadores grid */}
      <Section className="bg-zinc-950">
        {list.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {list.map((apoiador) => (
              <div
                key={apoiador.id}
                className="bg-zinc-900 rounded-xl p-4 ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-200 flex flex-col items-center gap-3"
              >
                {apoiador.logo_url ? (
                  <div className="h-12 flex items-center justify-center w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={apoiador.logo_url}
                      alt={apoiador.nome}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-12 flex items-center justify-center w-full bg-zinc-800 rounded-lg">
                    <span className="text-xs font-medium text-zinc-400 text-center px-2 leading-tight">
                      {apoiador.nome}
                    </span>
                  </div>
                )}

                {apoiador.logo_url && (
                  <p className="text-xs font-medium text-zinc-400 text-center leading-tight">
                    {apoiador.nome}
                  </p>
                )}

                {apoiador.website && (
                  <a
                    href={apoiador.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-600 hover:text-zinc-200 transition-colors truncate w-full text-center"
                  >
                    {apoiador.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">Novas parcerias serão anunciadas em breve.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">
            Quero ser um apoiador
          </h2>
          <p className="text-zinc-400 mb-6">
            Junte-se a quem acredita no esporte e na formação de valores. Saiba como apoiar o
            GŌKAI.
          </p>
          <Link
            href="/seja-um-apoiador"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-zinc-950 font-semibold hover:bg-red-500 transition-colors"
          >
            Saiba como apoiar
          </Link>
        </div>
      </Section>
    </>
  )
}
