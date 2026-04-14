import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { canonicalUrl, pageOpenGraph, twitterCard, siteConfig } from "@/lib/seo"
import { LOCATIONS, cityDisplay, localLabel } from "@/lib/locations"

// ─── Metadata ─────────────────────────────────────────────────────────────────

const hasLocations = LOCATIONS.length > 0

export const metadata: Metadata = {
  title: `Localidades | ${siteConfig.name}`,
  description: `Encontre uma unidade do ${siteConfig.name} perto de você. Artes marciais com turmas para todas as idades e níveis.`,
  alternates: {
    canonical: canonicalUrl("/localidades"),
  },
  ...(hasLocations
    ? {}
    : {
        robots: {
          index: false,
          follow: false,
        },
      }),
  openGraph: pageOpenGraph({
    title: `Localidades | ${siteConfig.name}`,
    description: `Encontre uma unidade do ${siteConfig.name} perto de você. Artes marciais com turmas para todas as idades e níveis.`,
    path: "/localidades",
  }),
  twitter: {
    ...twitterCard,
    title: `Localidades | ${siteConfig.name}`,
    description: `Encontre uma unidade do ${siteConfig.name} perto de você.`,
  },
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LocalidadesPage() {
  return (
    <div className="min-h-screen bg-[#0C2418]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(220,38,38,0.06),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-500 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Onde estamos
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Localidades
          </h1>
          <p className="text-lg text-white/62 max-w-xl leading-relaxed">
            Encontre uma unidade do {siteConfig.name} perto de você e dê o primeiro passo
            nas artes marciais.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasLocations ? (
            <>
              {/* Grid of confirmed locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/localidades/${loc.slug}`}
                    className="group relative rounded-2xl border border-white/12 bg-[#123020]/40 p-7 hover:border-white/28 hover:bg-[#123020]/70 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top hover accent */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-red-600/0 via-red-600/50 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Location badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                        {cityDisplay(loc)}
                      </span>
                    </div>

                    {/* City name */}
                    <h2 className="text-xl font-bold text-white group-hover:text-white transition-colors mb-1">
                      {localLabel(loc)}
                    </h2>

                    {/* Modalities */}
                    {loc.modalidades.length > 0 && (
                      <p className="text-sm text-white/45 mb-5">
                        {loc.modalidades.map((m) => m.nome).join(" · ")}
                      </p>
                    )}

                    {/* CTA line */}
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/30 group-hover:text-red-500 transition-colors">
                      Ver localidade
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Contact fallback */}
              <div className="mt-14 rounded-2xl border border-white/12 bg-[#123020]/30 p-8 text-center">
                <p className="text-sm text-white/45 mb-4">
                  Não encontrou sua cidade? Entre em contato — podemos estar em expansão.
                </p>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/72 hover:text-white transition-colors"
                >
                  Falar com a equipe
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          ) : (
            /* ── Coming Soon state — shown while LOCATIONS is still empty ──── */
            <div className="max-w-2xl mx-auto py-16 text-center">
              {/* Decorative icon */}
              <div className="mx-auto mb-8 size-16 rounded-full border border-white/12 bg-white/6 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white/30" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Em breve em mais cidades
              </h2>
              <p className="text-white/62 leading-relaxed mb-8">
                Estamos estruturando nossas unidades. Em breve você poderá encontrar o{" "}
                {siteConfig.name} mais perto de você.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contato"
                  className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-red-600 px-8 text-sm font-bold text-[#0C2418] hover:bg-red-500 transition-colors"
                >
                  <span className="relative z-10">Falar com a equipe</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
                <Link
                  href="/modalidades"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/18 px-8 text-sm font-medium text-white/62 hover:border-white/35 hover:text-white/85 transition-colors"
                >
                  Ver modalidades
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
