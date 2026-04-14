import type { Metadata } from "next"
import { Shield, Heart, TrendingUp, Award, Eye } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { Section } from "@/components/marketing/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Sobre a GŌKAI | GŌKAI",
  description: "Conheça a missão, visão, valores e a base institucional da GŌKAI.",
  alternates: {
    canonical: canonicalUrl("/sobre"),
  },
  openGraph: pageOpenGraph({
    title: "Sobre a GŌKAI",
    description: "Conheça a missão, visão, valores e a base institucional da GŌKAI.",
    path: "/sobre",
  }),
  twitter: {
    ...twitterCard,
    title: "Sobre a GŌKAI | GŌKAI",
    description: "Conheça a missão, visão, valores e a base institucional da GŌKAI.",
  },
}

const values = [
  {
    icon: Shield,
    title: "Disciplina",
    description: "A base do treino, da constância e do desenvolvimento técnico.",
  },
  {
    icon: Heart,
    title: "Respeito",
    description: "Respeito mútuo dentro e fora do treino, como princípio de convivência.",
  },
  {
    icon: TrendingUp,
    title: "Evolução Contínua",
    description: "Melhoria constante física, mental e técnica ao longo da jornada.",
  },
  {
    icon: Award,
    title: "Honra",
    description: "Conduta correta, responsabilidade pessoal e compromisso com o caminho marcial.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description: "Clareza nas decisões, responsabilidade institucional e prestação de contas.",
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer>
          <div className="max-w-3xl">
            <div className="gokai-kicker text-white/72">Conheça a GŌKAI</div>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sobre a GŌKAI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl">
              Uma associação dedicada ao desenvolvimento das artes marciais — com disciplina,
              respeito, tradição e formação humana como pilares de tudo que fazemos.
            </p>
          </div>
        </BrandContainer>
      </section>

      <Section className="bg-background">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <InstitutionalCard accent="green" className="lg:col-span-1">
            <SectionHeading title="Quem Somos" align="left" className="mb-6" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A GŌKAI é uma associação dedicada ao desenvolvimento das artes marciais, com foco
                em disciplina, respeito e evolução pessoal.
              </p>
              <p>
                Nosso propósito é formar atletas, cidadãos e indivíduos mais fortes, tanto física
                quanto mentalmente.
              </p>
            </div>
          </InstitutionalCard>

          <InstitutionalCard accent="red">
            <SectionHeading title="Missão" align="left" className="mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Promover artes marciais com qualidade técnica, valores éticos e impacto social.
            </p>
          </InstitutionalCard>

          <InstitutionalCard accent="neutral">
            <SectionHeading title="Visão" align="left" className="mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Ser referência regional em artes marciais e projetos esportivos.
            </p>
          </InstitutionalCard>
        </div>
      </Section>

      <Section className="bg-[#EEE7D9]">
        <InstitutionalCard accent="green" className="max-w-3xl">
          <SectionHeading title="Local" align="left" className="mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            A GŌKAI realiza suas atividades em sede localizada no bairro São Mateus, em Juiz de
            Fora/MG, em espaço estruturado para prática de artes marciais.
          </p>
        </InstitutionalCard>
      </Section>

      <Section
        className="bg-background"
        title="Nossos Valores"
        subtitle="Os pilares que sustentam tudo que fazemos e que guiam cada praticante em sua jornada dentro e fora do tatame."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <InstitutionalCard key={value.title} accent="green">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </InstitutionalCard>
            )
          })}
        </div>
      </Section>

      <Section className="bg-[#0C2418] text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white">Conheça a GŌKAI de perto</h2>
          <p className="mt-4 text-white/72">
            Entre em contato, conheça nossas modalidades e acompanhe o trabalho da associação.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <GokaiButton href="/inscricao" tone="secondary">
              Iniciar minha jornada
            </GokaiButton>
            <GokaiButton
              href="/contato"
              tone="outline"
              className="border-white/18 text-white hover:bg-white/10 hover:text-white"
            >
              Entre em contato
            </GokaiButton>
          </div>
        </div>
      </Section>
    </>
  )
}
