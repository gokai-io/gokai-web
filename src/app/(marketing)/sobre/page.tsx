import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Heart, TrendingUp, Award, Eye, MapPin, ArrowRight } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Sobre a GŌKAI | GŌKAI",
  description: "Conheça a missão, visão, valores e a base institucional da GŌKAI — associação de artes marciais em Juiz de Fora/MG.",
  alternates: { canonical: canonicalUrl("/sobre") },
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
  { icon: Shield, title: "Disciplina", description: "A base do treino, da constância e do desenvolvimento técnico." },
  { icon: Heart, title: "Respeito", description: "Respeito mútuo dentro e fora do treino, como princípio de convivência." },
  { icon: TrendingUp, title: "Evolução Contínua", description: "Melhoria constante física, mental e técnica ao longo da jornada." },
  { icon: Award, title: "Honra", description: "Conduta correta, responsabilidade pessoal e compromisso com o caminho marcial." },
  { icon: Eye, title: "Transparência", description: "Clareza nas decisões, responsabilidade institucional e prestação de contas pública." },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[var(--surface-midnight)] tracking-tight mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-[var(--surface-midnight)]/75 leading-[1.8] my-3">{children}</p>
}

function SectionDivider() {
  return <hr className="border-[var(--surface-midnight)]/8 my-10" />
}

export default function SobrePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer>
          <div className="max-w-3xl">
            <div className="gokai-kicker mb-4">Conheça a GŌKAI</div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[var(--text-ivory)]">
              Sobre a GŌKAI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-ivory-dim)]">
              Uma associação dedicada ao desenvolvimento das artes marciais — com disciplina,
              respeito, tradição e formação humana como pilares de tudo que fazemos.
            </p>
          </div>
        </BrandContainer>
      </section>

      {/* ── Content — paper background ───────────────────────── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white px-8 py-12 sm:px-14 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {/* ── Quem Somos ── */}
            <SectionTitle>Quem Somos</SectionTitle>
            <P>
              A GŌKAI – Clube de Artes Marciais é uma associação civil sem fins lucrativos fundada
              em 2026, em Juiz de Fora/MG, dedicada à promoção das artes marciais, esportes de combate
              e ações socioeducativas, culturais e ambientais.
            </P>
            <P>
              Nosso propósito é usar o esporte como ferramenta de transformação social, formando atletas,
              cidadãos e indivíduos mais fortes — física, técnica e moralmente.
            </P>
            <P>
              Atendemos crianças, jovens e adultos de todas as idades, sem qualquer discriminação de
              origem, gênero ou condição socioeconômica, priorizando o acesso de jovens em situação
              de vulnerabilidade.
            </P>

            <SectionDivider />

            {/* ── Missão ── */}
            <SectionTitle>Missão</SectionTitle>
            <P>
              Promover artes marciais com qualidade técnica, valores éticos e impacto social real,
              utilizando o esporte como instrumento de cidadania e desenvolvimento humano.
            </P>

            <SectionDivider />

            {/* ── Visão ── */}
            <SectionTitle>Visão</SectionTitle>
            <P>
              Ser referência regional em artes marciais e projetos esportivos, reconhecida pela
              seriedade institucional, pela qualidade técnica e pelo compromisso com a transformação social.
            </P>

            <SectionDivider />

            {/* ── Nossos Polos ── */}
            <SectionTitle>Nossos Polos</SectionTitle>
            <P>A GŌKAI opera em dois polos de atividade em Juiz de Fora/MG:</P>

            <div className="my-6 space-y-6">
              <div className="flex items-start gap-4 rounded-xl bg-[var(--surface-midnight)]/[0.03] border border-[var(--surface-midnight)]/6 p-5">
                <MapPin className="size-5 text-[var(--accent-carmine)] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)]">
                    Polo São Mateus — Sede
                  </h3>
                  <p className="text-sm text-[var(--surface-midnight)]/60 mt-1">
                    Rua Melo Franco, 68 — Bairro São Mateus, Juiz de Fora/MG
                  </p>
                  <p className="text-sm text-[var(--surface-midnight)]/70 mt-2 leading-relaxed">
                    Espaço principal da associação, com estrutura completa para prática de Jiu-Jitsu,
                    Judô, Boxe, Xadrez e Defesa Pessoal Feminina.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-[var(--surface-midnight)]/[0.03] border border-[var(--surface-midnight)]/6 p-5">
                <MapPin className="size-5 text-[var(--accent-carmine)] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)]">
                    Polo Linhares
                  </h3>
                  <p className="text-sm text-[var(--surface-midnight)]/70 mt-2 leading-relaxed">
                    Unidade de expansão da GŌKAI, com atividades de Jiu-Jitsu, Judô e Boxe
                    voltadas à comunidade local.
                  </p>
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* ── Nossos Valores ── */}
            <SectionTitle>Nossos Valores</SectionTitle>
            <P>Os pilares que sustentam tudo que fazemos e que guiam cada praticante dentro e fora do tatame.</P>

            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="flex items-start gap-3 rounded-lg p-4 bg-[var(--surface-midnight)]/[0.02]">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-midnight)]/5">
                      <Icon className="size-4 text-[var(--surface-midnight)]/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--surface-midnight)]">{value.title}</h3>
                      <p className="text-sm text-[var(--surface-midnight)]/65 leading-relaxed mt-0.5">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <SectionDivider />

            {/* ── Estrutura Institucional ── */}
            <SectionTitle>Estrutura Institucional</SectionTitle>
            <P>
              A GŌKAI é gerida por uma Diretoria Executiva eleita em Assembleia Geral, com mandato de
              3 anos. Conta com equipe técnica especializada e projetos parceiros que ampliam o alcance
              das atividades.
            </P>
            <P>
              Todos os documentos institucionais — Estatuto Social, Regimento Interno, Atas, Contratos
              e Memorandos — estão disponíveis publicamente na página de Transparência.
            </P>
            <div className="mt-4">
              <Link
                href="/transparencia"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-carmine)] hover:brightness-125 transition-all"
              >
                Ver documentos <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <SectionDivider />

            {/* ── Projetos Parceiros ── */}
            <SectionTitle>Projetos Parceiros</SectionTitle>
            <P>
              A GŌKAI conta com o apoio institucional dos seguintes projetos esportivos, que atuam
              como apoiadores não financeiros da associação:
            </P>
            <ul className="space-y-2 pl-5 my-3">
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Gamonal Fighters</strong> – Jiu-Jitsu
              </li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Academia do Boxe</strong> – Boxe
              </li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Guerreiro Samurai</strong> – Judô
              </li>
            </ul>
            <P>
              Os projetos parceiros mantêm identidade e gestão próprias, operando de forma independente
              dentro do espaço da GŌKAI.
            </P>

            <SectionDivider />

            {/* ── Fundação ── */}
            <SectionTitle>Fundação</SectionTitle>
            <P>
              A GŌKAI foi fundada em 2026 por um grupo de profissionais comprometidos com o
              desenvolvimento das artes marciais e o impacto social do esporte em Juiz de Fora/MG.
            </P>

          </article>
        </BrandContainer>
      </section>

      {/* ── CTA — dark ──────────────────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-16">
        <BrandContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-extrabold text-[var(--text-ivory)]">
              Conheça a GŌKAI de perto
            </h2>
            <p className="mt-3 text-sm text-[var(--text-ivory-dim)] leading-relaxed">
              Entre em contato, conheça nossas modalidades e acompanhe o trabalho da associação.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <GokaiButton href="/inscricao" tone="primary">
                Iniciar minha jornada
              </GokaiButton>
              <GokaiButton href="/governanca" tone="outline">
                Conhecer a diretoria
              </GokaiButton>
              <GokaiButton href="/contato" tone="outline">
                Entrar em contato
              </GokaiButton>
            </div>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
