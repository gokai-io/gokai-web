import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import Link from "next/link"
import { Section } from "@/components/marketing/section"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Seja um Apoiador | GŌKAI",
  description: "Apoie o GŌKAI e faça parte do desenvolvimento das artes marciais.",
  alternates: {
    canonical: canonicalUrl("/seja-um-apoiador"),
  },
  openGraph: pageOpenGraph({
    title: "Seja um Apoiador | GŌKAI",
    description: "Apoie o GŌKAI e faça parte do desenvolvimento esportivo e social pelas artes marciais.",
    path: "/seja-um-apoiador",
  }),
  twitter: {
    ...twitterCard,
    title: "Seja um Apoiador | GŌKAI",
    description: "Apoie o GŌKAI e faça parte do desenvolvimento esportivo e social pelas artes marciais.",
  },
}

const tiers = [
  {
    nivel: "Ouro",
    badge: "bg-secondary text-surface-dark",
    card: "ring-secondary/40 bg-surface-dark-alt",
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
    badge: "bg-white/80 text-surface-dark",
    card: "ring-white/28/40 bg-surface-dark-alt",
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
    card: "ring-orange-700/30 bg-surface-dark-alt",
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
    badge: "bg-white/12 text-[var(--text-on-dark-secondary)]",
    card: "ring-white/12 bg-surface-dark-alt",
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
      <section className="relative bg-surface-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-[var(--text-on-dark-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Parceria
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Seja um Apoiador
          </h1>
          <p className="text-lg text-[var(--text-on-dark-secondary)] max-w-2xl mx-auto">
            Apoie o GŌKAI e faça parte de uma história de excelência, disciplina e formação de
            atletas. Sua marca junto aos valores que nos definem.
          </p>
        </div>
      </section>

      {/* Why support */}
      <Section className="bg-surface-dark-alt">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
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
              <div key={item.title} className="bg-white/8 rounded-xl p-5 ring-1 ring-white/18">
                <h3 className="text-[var(--text-on-dark)] font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-on-dark-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        className="bg-surface-dark"
        title="Parcerias Institucionais"
        subtitle="A GŌKAI busca parcerias com projetos esportivos, academias e instituições que possam fortalecer o desenvolvimento técnico e estrutural da associação."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-surface-dark-alt p-6 ring-1 ring-white/12">
            <h3 className="mb-4 text-lg font-semibold text-white">Objetivo</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-on-dark-secondary)]">
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Uso compartilhado de espaço</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Realização de eventos</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Desenvolvimento de atletas</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-surface-dark-alt p-6 ring-1 ring-white/12">
            <h3 className="mb-4 text-lg font-semibold text-white">Responsabilidades da GŌKAI</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-on-dark-secondary)]">
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Disponibilizar espaço</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Apoio administrativo</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Divulgação</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-surface-dark-alt p-6 ring-1 ring-white/12">
            <h3 className="mb-4 text-lg font-semibold text-white">Responsabilidades do Parceiro</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-on-dark-secondary)]">
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Fornecer instrutores qualificados</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Respeitar normas da associação</span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                <span>Zelar pelo patrimônio</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/12 bg-white/6 p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Observações</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-[var(--text-on-dark-secondary)]">
            <li>Não gera vínculo empregatício.</li>
            <li>As parcerias devem ser formalizadas por acordo entre as partes.</li>
          </ul>
        </div>
      </Section>

      {/* Tiers */}
      <Section
        className="bg-surface-dark"
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
                  <span className="text-xs text-[var(--text-on-dark-secondary)] font-medium">Mais completo</span>
                )}
              </div>

              <ul className="space-y-2 flex-1">
                {tier.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2 text-sm text-[var(--text-on-dark-secondary)]">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contato"
                className={`mt-2 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-secondary text-surface-dark hover:bg-red-500"
                    : "border border-white/18 text-[var(--text-on-dark-secondary)] hover:border-white/35 hover:text-white"
                }`}
              >
                Tenho interesse
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-surface-dark-alt">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Pronto para ser parceiro?
          </h2>
          <p className="text-[var(--text-on-dark-secondary)] mb-6">
            Entre em contato com nossa equipe e vamos conversar sobre a melhor forma de parceria
            para você ou sua empresa.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-surface-dark font-semibold hover:bg-red-500 transition-colors"
          >
            Entre em contato
          </Link>
        </div>
      </Section>
    </>
  )
}
