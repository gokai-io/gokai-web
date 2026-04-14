import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import type { Patrocinador, PatrocinadorNivel } from "@/types/database"

export const metadata: Metadata = {
  title: "Patrocinadores | GŌKAI",
  description: "Conheça os patrocinadores e apoiadores do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/patrocinadores"),
  },
  openGraph: pageOpenGraph({
    title: "Patrocinadores | GŌKAI",
    description: "Marcas e parceiros que impulsionam o GŌKAI e apoiam o desenvolvimento esportivo de nossos atletas.",
    path: "/patrocinadores",
  }),
  twitter: {
    ...twitterCard,
    title: "Patrocinadores | GŌKAI",
    description: "Marcas e parceiros que impulsionam o GŌKAI e apoiam o desenvolvimento esportivo de nossos atletas.",
  },
}

const nivelLabels: Record<PatrocinadorNivel, string> = {
  ouro: "Ouro",
  prata: "Prata",
  bronze: "Bronze",
  apoiador: "Apoiadores",
}

const nivelOrder: PatrocinadorNivel[] = ["ouro", "prata", "bronze", "apoiador"]

const nivelStyles: Record<
  PatrocinadorNivel,
  { badge: string; card: string; logoSize: string; titleSize: string }
> = {
  ouro: {
    badge: "bg-secondary text-foreground",
    card: "bg-surface-dark-alt ring-secondary/40 hover:ring-secondary/70",
    logoSize: "h-24",
    titleSize: "text-xl",
  },
  prata: {
    badge: "bg-white/80 text-foreground",
    card: "bg-surface-dark-alt ring-white/18 hover:ring-white/35",
    logoSize: "h-16",
    titleSize: "text-lg",
  },
  bronze: {
    badge: "bg-orange-700 text-orange-100",
    card: "bg-surface-dark-alt ring-orange-700/30 hover:ring-orange-600/50",
    logoSize: "h-14",
    titleSize: "text-base",
  },
  apoiador: {
    badge: "bg-white/12 text-[var(--text-on-dark-secondary)]",
    card: "bg-surface-dark-alt ring-white/12 hover:ring-white/28",
    logoSize: "h-12",
    titleSize: "text-sm",
  },
}

export default async function PatrocinadoresPage() {
  const supabase = await createClient()

  const { data: patrocinadores } = await supabase
    .from("patrocinador")
    .select("*")
    .eq("ativo", true)
    .eq("exibir_site", true)
    .order("nivel", { ascending: true })
    .order("nome", { ascending: true })

  const list = (patrocinadores ?? []) as Patrocinador[]

  // Group by nivel
  const grouped: Partial<Record<PatrocinadorNivel, Patrocinador[]>> = {}
  for (const pat of list) {
    const nivel = pat.nivel as PatrocinadorNivel
    if (!grouped[nivel]) grouped[nivel] = []
    grouped[nivel]!.push(pat)
  }

  const sections = nivelOrder.filter((nivel) => (grouped[nivel]?.length ?? 0) > 0)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-surface-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-[var(--text-on-dark-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Parceiros
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-on-dark)] mb-4">
            Patrocinadores e Apoiadores
          </h1>
          <p className="text-lg text-[var(--text-on-dark-secondary)] max-w-2xl mx-auto">
            Agradecemos a todos que tornam possível a missão do GŌKAI. Nossos parceiros são parte
            fundamental do nosso sucesso.
          </p>
        </div>
      </section>

      {/* Sponsors by tier */}
      <Section className="bg-surface-dark">
        {sections.length > 0 ? (
          <div className="space-y-16">
            {sections.map((nivel) => {
              const items = grouped[nivel] ?? []
              const styles = nivelStyles[nivel]

              return (
                <div key={nivel}>
                  {/* Tier header */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="h-px flex-1 max-w-24 bg-white/8" />
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
                      {nivelLabels[nivel]}
                    </span>
                    <span className="h-px flex-1 max-w-24 bg-white/8" />
                  </div>

                  <div
                    className={`grid gap-5 ${
                      nivel === "ouro"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : nivel === "apoiador"
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                        : "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
                    }`}
                  >
                    {items.map((pat) => (
                      <div
                        key={pat.id}
                        className={`rounded-xl p-5 ring-1 transition-all duration-300 flex flex-col items-center gap-3 ${styles.card}`}
                      >
                        {pat.logo_url ? (
                          <div className={`${styles.logoSize} flex items-center justify-center`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={pat.logo_url}
                              alt={pat.nome}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            className={`${styles.logoSize} flex items-center justify-center w-full bg-white/8 rounded-lg`}
                          >
                            <span className={`font-bold text-[var(--text-on-dark-secondary)] ${styles.titleSize} text-center px-2`}>
                              {pat.nome}
                            </span>
                          </div>
                        )}

                        {pat.logo_url && (
                          <p className={`font-medium text-[var(--text-on-dark-secondary)] text-center ${styles.titleSize}`}>
                            {pat.nome}
                          </p>
                        )}

                        {pat.website && (
                          <a
                            href={pat.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] transition-colors"
                          >
                            {pat.website.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--text-on-dark-muted)] text-lg">Novas parcerias serão anunciadas em breve.</p>
          </div>
        )}
      </Section>

      {/* Become a sponsor CTA */}
      <Section className="bg-surface-dark-alt">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--text-on-dark)] mb-3">
            Seja um parceiro do GŌKAI
          </h2>
          <p className="text-[var(--text-on-dark-secondary)] mb-6">
            Junte-se a nós e apoie o desenvolvimento das artes marciais. Temos planos para todos os
            perfis de parceria.
          </p>
          <Link
            href="/seja-um-apoiador"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/85 transition-colors"
          >
            Conhecer planos de apoio
          </Link>
        </div>
      </Section>
    </>
  )
}
