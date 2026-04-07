import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Heart, TrendingUp, Award, UsersRound, Scale, Sprout } from "lucide-react"
import { Section } from "@/components/marketing/section"
import { SectionHeading } from "@/components/marketing/section-heading"

export const metadata: Metadata = {
  title: "Sobre a GŌKAI | GŌKAI",
  description: "Conheça a história, missão e valores do GŌKAI – Associação Esportiva e Ambiental.",
}

const values = [
  {
    icon: Shield,
    title: "Disciplina",
    description:
      "A base de toda evolução. Cultivada a cada treino, levada do tatame para a vida.",
  },
  {
    icon: Heart,
    title: "Respeito",
    description:
      "Ao mestre, ao adversário, ao caminho e a si mesmo.",
  },
  {
    icon: TrendingUp,
    title: "Evolução Contínua",
    description:
      "Sempre buscar a próxima versão de si — técnica, mental e pessoal.",
    accent: "green" as const,
  },
  {
    icon: UsersRound,
    title: "Inclusão Social",
    description:
      "O esporte como ferramenta de transformação e acesso para todos.",
  },
  {
    icon: Scale,
    title: "Cidadania",
    description:
      "Formar atletas conscientes de seus direitos e deveres na comunidade.",
  },
  {
    icon: Award,
    title: "Mérito",
    description:
      "Cada conquista é resultado de esforço real. Nada é dado, tudo é conquistado.",
  },
  {
    icon: Sprout,
    title: "Desenvolvimento Humano",
    description:
      "Formar pessoas completas — corpo, mente e caráter — para a vida.",
  },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
              Conheça o GŌKAI
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 leading-tight mb-6">
              Sobre o GŌKAI
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Mais do que uma associação esportiva de artes marciais — somos um espaço de transformação,
              crescimento e excelência.
            </p>
          </div>
        </div>
      </section>

      {/* History & Mission */}
      <Section className="bg-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading title="Nossa História" align="left" className="mb-6" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                O GŌKAI nasceu da paixão pelas artes marciais e do desejo de formar atletas de
                excelência. Fundado por praticantes dedicados que compartilhavam o sonho de criar
                um espaço onde técnica, valores e comunidade se encontrassem.
              </p>
              <p>
                Ao longo dos anos, construímos uma trajetória marcada por conquistas dentro e
                fora dos tatames. Nossos atletas representam a associação em competições regionais,
                nacionais e internacionais, sempre carregando os valores que nos definem.
              </p>
              <p>
                Hoje, o GŌKAI é reconhecido como referência em artes marciais, oferecendo um
                ambiente acolhedor para iniciantes e desafiador para atletas de alto desempenho.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading title="Nossa Missão" align="left" className="mb-6" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Formar atletas e cidadãos através das artes marciais, promovendo disciplina,
                respeito, evolução pessoal e responsabilidade social.
              </p>
              <blockquote className="border-l-4 border-zinc-600 pl-4 italic text-zinc-300">
                &ldquo;A disciplina constrói o caminho. A evolução é o destino.&rdquo;
              </blockquote>
            </div>

            <SectionHeading title="Nossa Visão" align="left" className="mb-6 mt-12" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Ser referência local e regional em formação esportiva e desenvolvimento humano.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section
        className="bg-zinc-950"
        title="Nossos Valores"
        subtitle="Os pilares que sustentam tudo que fazemos e que guiam cada praticante em sua jornada dentro e fora do tatame."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon
            const isGreen = "accent" in value && value.accent === "green"
            return (
              <div
                key={value.title}
                className="bg-zinc-900 rounded-xl p-6 ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-zinc-800 transition-colors">
                  <Icon className={`w-6 h-6 ${isGreen ? "text-green-500" : "text-zinc-400"}`} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-4">Faça parte do GŌKAI</h2>
          <p className="text-zinc-400 mb-8">
            Comece sua jornada nas artes marciais. Venha conhecer nossas modalidades e professores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscricao"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-zinc-950 font-semibold hover:bg-red-500 transition-colors"
            >
              Iniciar minha jornada
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-50 transition-colors"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
