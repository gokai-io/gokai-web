import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/marketing/section"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Seja um Apoiador | GŌKAI",
  description: "Apoie o GŌKAI e faça parte do desenvolvimento das artes marciais.",
}

const tiers = [
  {
    nivel: "Ouro",
    badge: "bg-red-600 text-zinc-950",
    card: "ring-red-600/40 bg-zinc-900",
    highlight: true,
    beneficios: [
      "Logo em destaque no site oficial",
      "Logo no material de divulgação dos eventos",
      "Menção em redes sociais mensalmente",
      "Banner na entrada da sede da associação",
      "Convites VIP para todos os eventos",
      "Relatório semestral de resultados e visibilidade",
      "Reunião trimestral com a diretoria",
    ],
  },
  {
    nivel: "Prata",
    badge: "bg-zinc-300 text-zinc-900",
    card: "ring-zinc-600/40 bg-zinc-900",
    highlight: false,
    beneficios: [
      "Logo na página de patrocinadores do site",
      "Logo nos materiais dos eventos principais",
      "Menção em redes sociais bimestralmente",
      "Banner na sede da associação",
      "Convites para os eventos da associação",
      "Relatório anual de resultados",
    ],
  },
  {
    nivel: "Bronze",
    badge: "bg-orange-700 text-orange-100",
    card: "ring-orange-700/30 bg-zinc-900",
    highlight: false,
    beneficios: [
      "Logo na página de patrocinadores do site",
      "Menção em redes sociais trimestralmente",
      "Logo nos eventos especiais",
      "Convite para os eventos da associação",
    ],
  },
  {
    nivel: "Apoiador",
    badge: "bg-zinc-700 text-zinc-300",
    card: "ring-zinc-700/40 bg-zinc-900",
    highlight: false,
    beneficios: [
      "Nome listado na página de apoiadores",
      "Menção nas redes sociais",
      "Convite para a assembleia anual da associação",
    ],
  },
]

export default function SejaUmApoiadorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Parceria
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Seja um Apoiador
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Apoie o GŌKAI e faça parte de uma história de excelência, disciplina e formação de
            atletas. Sua marca junto aos valores que nos definem.
          </p>
        </div>
      </section>

      {/* Why support */}
      <Section className="bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">
            Por que apoiar o GŌKAI?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Visibilidade",
                desc: "Alcance uma audiência engajada de atletas, famílias e admiradores das artes marciais.",
              },
              {
                title: "Valores",
                desc: "Associe sua marca a disciplina, respeito, excelência e comunidade — valores que transcendem o esporte.",
              },
              {
                title: "Impacto",
                desc: "Contribua diretamente com o desenvolvimento esportivo e formação de caráter na nossa comunidade.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-700">
                <h3 className="text-zinc-200 font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tiers */}
      <Section
        className="bg-zinc-950"
        title="Planos de Apoio"
        subtitle="Escolha o nível de parceria que melhor se encaixa com seu perfil e orçamento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.nivel}
              className={`rounded-xl p-6 ring-1 flex flex-col gap-4 ${tier.card} ${
                tier.highlight ? "ring-2" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${tier.badge}`}>
                  {tier.nivel}
                </span>
                {tier.highlight && (
                  <span className="text-xs text-zinc-400 font-medium">Mais completo</span>
                )}
              </div>

              <ul className="space-y-2 flex-1">
                {tier.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contato"
                className={`mt-2 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-red-600 text-zinc-950 hover:bg-red-500"
                    : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-50"
                }`}
              >
                Tenho interesse
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">
            Pronto para ser parceiro?
          </h2>
          <p className="text-zinc-400 mb-6">
            Entre em contato com nossa equipe e vamos conversar sobre a melhor forma de parceria
            para você ou sua empresa.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-zinc-950 font-semibold hover:bg-red-500 transition-colors"
          >
            Entre em contato
          </Link>
        </div>
      </Section>
    </>
  )
}
