import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Governança | GŌKAI",
  description: "Estrutura diretiva, equipe técnica e documentos de governança da GŌKAI.",
  alternates: { canonical: canonicalUrl("/governanca") },
  openGraph: pageOpenGraph({
    title: "Governança | GŌKAI",
    description: "Estrutura diretiva, equipe técnica e documentos de governança da GŌKAI.",
    path: "/governanca",
  }),
  twitter: {
    ...twitterCard,
    title: "Governança | GŌKAI",
    description: "Estrutura diretiva, equipe técnica e documentos de governança da GŌKAI.",
  },
}

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

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 pl-4 border-l-2 border-[var(--accent-carmine)]/30 text-sm text-[var(--surface-midnight)]/65 italic">
      {children}
    </blockquote>
  )
}

function DiretorCard({ nome, cargo, mandato, responsabilidades, pending }: {
  nome: string
  cargo: string
  mandato: string
  responsabilidades: string
  pending?: boolean
}) {
  return (
    <div className="py-6 border-b border-[var(--surface-midnight)]/6 last:border-0">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-midnight)]/5 font-heading text-sm font-bold text-[var(--surface-midnight)]/50">
          {nome.charAt(0)}
        </div>
        <div>
          <h3 className={`text-base font-bold ${pending ? "text-[var(--surface-midnight)]/50 italic" : "text-[var(--surface-midnight)]"}`}>
            {nome}
          </h3>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-carmine)] mt-0.5">
            {cargo}
          </p>
          <p className="text-xs text-[var(--surface-midnight)]/50 mt-1">
            Mandato: {mandato}
          </p>
          <p className="text-sm text-[var(--surface-midnight)]/70 mt-2 leading-relaxed">
            {responsabilidades}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function GovernancaPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer>
          <div className="max-w-3xl">
            <div className="gokai-kicker mb-4">Estrutura Diretiva</div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-ivory)]">
              Governança
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-ivory-dim)]">
              Estrutura diretiva da GŌKAI – Associação Esportiva e Ambiental.
            </p>
          </div>
        </BrandContainer>
      </section>

      {/* ── Content — paper background ───────────────────────── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white px-8 py-12 sm:px-14 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {/* ── Estrutura Organizacional ── */}
            <SectionTitle>Estrutura Organizacional</SectionTitle>
            <P>Visão geral da organização institucional da GŌKAI.</P>

            <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)] mt-6 mb-2">Assembleia Geral</h3>
            <P>
              Órgão máximo de decisão, composto por todos os associados fundadores e efetivos
              em pleno gozo de seus direitos.
            </P>

            <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)] mt-6 mb-2">Diretoria Executiva</h3>
            <ul className="space-y-1.5 pl-5 my-3">
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75">Presidente</li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75">Vice-Presidente</li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75">Diretor Administrativo</li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75">Diretor Financeiro</li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75">Diretor Técnico/Esportivo</li>
            </ul>

            <Quote>
              O exercício de qualquer cargo na Diretoria é gratuito e voluntário.
              A Diretoria é eleita pela Assembleia Geral para mandato de 3 anos.
            </Quote>

            <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)] mt-6 mb-2">Equipe Técnica</h3>
            <P>
              Professores e instrutores responsáveis pela condução das atividades esportivas,
              subordinados ao Diretor Técnico/Esportivo. Não integram a Diretoria Executiva.
            </P>

            <SectionDivider />

            {/* ── Diretoria Executiva ── */}
            <SectionTitle>Diretoria Executiva</SectionTitle>
            <P>Os membros eleitos responsáveis pela gestão e direção da associação.</P>

            <div className="mt-4">
              <DiretorCard
                nome="Thiago Santos Mello"
                cargo="Presidente"
                mandato="2026 – presente"
                responsabilidades="Representação legal da associação, decisões estratégicas, assinatura de contratos e parcerias, coordenação geral."
              />
              <DiretorCard
                nome="Renan Winter Spatin"
                cargo="Vice-Presidente"
                mandato="2026 – presente"
                responsabilidades="Substituição do Presidente, apoio à gestão administrativa e decisória, cumprimento do Estatuto e Regimento Interno."
              />
              <DiretorCard
                nome="Allan de Carvalho Moreira"
                cargo="Diretor Administrativo"
                mandato="2026 – presente"
                responsabilidades="Secretaria institucional, registros de associados, comunicação interna e externa, organização de eventos e atividades."
              />
              <DiretorCard
                nome="Jafar Mohammed Untar"
                cargo="Diretor Técnico/Esportivo"
                mandato="2026 – presente"
                responsabilidades="Coordenação das modalidades esportivas, padrões técnicos e pedagógicos, supervisão dos professores, inscrições em campeonatos e filiações federativas."
              />
              <DiretorCard
                nome="Em definição"
                cargo="Diretor Financeiro"
                mandato="2026 – presente"
                responsabilidades="Controle de receitas e despesas, fluxo de caixa, assinatura de documentos financeiros, balancetes e prestação de contas."
                pending
              />
            </div>

            <SectionDivider />

            {/* ── Equipe Técnica ── */}
            <SectionTitle>Equipe Técnica</SectionTitle>

            <div className="my-4 space-y-4">
              <div className="py-3">
                <h3 className="text-base font-bold text-[var(--surface-midnight)]">Alex Sobreira</h3>
                <p className="text-sm text-[var(--surface-midnight)]/60 mt-0.5">Professor de Boxe e Kickboxing</p>
              </div>
              <div className="py-3 border-t border-[var(--surface-midnight)]/6">
                <h3 className="text-base font-bold text-[var(--surface-midnight)]">Linus Pauling Ferreira Pereira</h3>
                <p className="text-sm text-[var(--surface-midnight)]/60 mt-0.5">Professor de Jiu-Jitsu, Judô, Boxe, Xadrez e Educação Ambiental</p>
              </div>
              <div className="py-3 border-t border-[var(--surface-midnight)]/6">
                <h3 className="text-base font-bold text-[var(--surface-midnight)]">Cássia dos Santos Soranço</h3>
                <p className="text-sm text-[var(--surface-midnight)]/60 mt-0.5">Professora de Jiu-Jitsu, Judô, Boxe, Feminino e Infantil</p>
              </div>
            </div>

            <Quote>
              Professores não possuem poder de representação legal da associação,
              salvo delegação expressa por escrito da Diretoria.
            </Quote>

            <SectionDivider />

            {/* ── Documentos de Governança ── */}
            <SectionTitle>Documentos de Governança</SectionTitle>
            <P>
              Todos os documentos que formalizam a estrutura e o funcionamento da GŌKAI
              estão disponíveis publicamente:
            </P>

            <ul className="space-y-2 pl-0 my-4">
              {[
                { label: "Estatuto Social", id: "00000000-0000-0000-0000-000000000601" },
                { label: "Regimento Interno", id: "00000000-0000-0000-0000-000000000603" },
                { label: "Ata de Fundação", id: "00000000-0000-0000-0000-000000000602" },
                { label: "Termo de Posse da Diretoria", id: "00000000-0000-0000-0000-000000000605" },
                { label: "Organograma Institucional", id: "00000000-0000-0000-0000-000000000606" },
              ].map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/transparencia/${doc.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-carmine)] hover:brightness-125 transition-all"
                  >
                    {doc.label} <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>

          </article>
        </BrandContainer>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-16">
        <BrandContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">
              Transparência completa
            </h2>
            <p className="mt-3 text-sm text-[var(--text-ivory-dim)] leading-relaxed">
              Acesse todos os documentos institucionais, receitas, despesas e prestação de contas.
            </p>
            <div className="mt-6">
              <GokaiButton href="/transparencia" tone="primary">
                Ver transparência
              </GokaiButton>
            </div>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
