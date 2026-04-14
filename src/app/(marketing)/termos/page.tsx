import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { LEGAL_ENTITY_NAME, LEGAL_CNPJ } from "@/lib/site"

export const metadata: Metadata = {
  title: "Termos de Uso | GŌKAI",
  description:
    "Termos de uso do site e serviços do GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/termos"),
  },
  openGraph: pageOpenGraph({
    title: "Termos de Uso | GŌKAI",
    description: "Termos e condições de uso do site e serviços do GŌKAI.",
    path: "/termos",
  }),
  twitter: {
    ...twitterCard,
    title: "Termos de Uso | GŌKAI",
    description: "Termos e condições de uso do site e serviços do GŌKAI.",
  },
}

const entityName = LEGAL_ENTITY_NAME ?? "GŌKAI – Associação Esportiva e Ambiental"

const prose = {
  h2: "text-xl font-semibold text-foreground mt-10 mb-3",
  p: "text-sm text-muted-foreground leading-relaxed mb-3",
  ul: "list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-3 pl-1",
  li: "leading-relaxed",
  a: "text-secondary hover:text-secondary/75 underline underline-offset-2 transition-colors",
  notice:
    "mt-6 border border-secondary/25 rounded-[20px] p-5 bg-secondary/6 text-sm text-foreground/75 leading-relaxed",
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="gokai-kicker text-white/68">
            Institucional
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">Termos de Uso</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
            <span>
              Última atualização:{" "}
              <time dateTime="2026-04-12" className="text-white/72">
                abril de 2026
              </time>
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Content */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* In-progress notice */}
          {/* ⚠️ TODO: Replace this notice with the finalized terms document.
               Remove the <div className={prose.notice}> block below when complete. */}
          <div className={prose.notice}>
            <strong className="text-amber-300">Documento em elaboração.</strong> Os Termos de Uso
            completos estão sendo finalizados pela equipe jurídica e serão publicados nesta página
            em breve. As disposições gerais abaixo aplicam-se ao uso do site até a publicação da
            versão final.
          </div>

          {/* ── 1. Aceitação ──────────────────────────────────────────── */}
          <h2 className={prose.h2}>1. Aceitação dos termos</h2>
          <p className={prose.p}>
            Ao acessar ou utilizar o site da{" "}
            <strong className="font-semibold text-foreground">{entityName}</strong>
            {LEGAL_CNPJ && (
              <span className="text-muted-foreground/65"> (CNPJ: {LEGAL_CNPJ})</span>
            )}{" "}
            (&ldquo;GŌKAI&rdquo;, &ldquo;nós&rdquo; ou &ldquo;nossa associação&rdquo;), você concorda
            com estas condições de uso. Caso não concorde, não utilize o site.
          </p>

          {/* ── 2. Uso do site ────────────────────────────────────────── */}
          <h2 className={prose.h2}>2. Uso do site</h2>
          <p className={prose.p}>Este site destina-se a:</p>
          <ul className={prose.ul}>
            <li className={prose.li}>Divulgar as atividades, eventos e modalidades do GŌKAI</li>
            <li className={prose.li}>Receber contatos e solicitações de informação</li>
            <li className={prose.li}>
              Oferecer recursos de gestão a associados autorizados (área restrita)
            </li>
          </ul>
          <p className={prose.p}>
            É vedado o uso do site para fins ilícitos, envio de conteúdo difamatório, spam ou
            qualquer atividade que prejudique terceiros ou a infraestrutura do serviço.
          </p>

          {/* ── 3. Propriedade intelectual ────────────────────────────── */}
          <h2 className={prose.h2}>3. Propriedade intelectual</h2>
          <p className={prose.p}>
            Todo o conteúdo deste site — incluindo textos, imagens, logotipos, marcas e código —
            é de propriedade do GŌKAI ou de seus respectivos titulares e está protegido pela
            legislação de propriedade intelectual brasileira. A reprodução, distribuição ou uso
            comercial sem autorização prévia por escrito é proibida.
          </p>

          {/* ── 4. Responsabilidade ───────────────────────────────────── */}
          <h2 className={prose.h2}>4. Limitação de responsabilidade</h2>
          <p className={prose.p}>
            O GŌKAI envida esforços para manter as informações do site atualizadas e precisas,
            mas não garante a ausência de erros ou interrupções. O acesso ao site é fornecido
            &ldquo;no estado em que se encontra&rdquo;, sem garantias de disponibilidade contínua.
          </p>

          {/* ── 5. Links externos ─────────────────────────────────────── */}
          <h2 className={prose.h2}>5. Links externos</h2>
          <p className={prose.p}>
            Este site pode conter links para sites de terceiros (patrocinadores, parceiros,
            federações). O GŌKAI não se responsabiliza pelo conteúdo, práticas de privacidade ou
            disponibilidade desses sites.
          </p>

          {/* ── 6. Privacidade ────────────────────────────────────────── */}
          <h2 className={prose.h2}>6. Privacidade e proteção de dados</h2>
          <p className={prose.p}>
            O tratamento de dados pessoais é regido pela nossa{" "}
            <Link href="/privacidade" className={prose.a}>
              Política de Privacidade
            </Link>
            , em conformidade com a LGPD (Lei nº 13.709/2018).
          </p>

          {/* ── 7. Legislação aplicável ───────────────────────────────── */}
          <h2 className={prose.h2}>7. Legislação aplicável</h2>
          <p className={prose.p}>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer
            controvérsia decorrente do uso deste site será submetida ao foro da comarca da sede
            do GŌKAI, com renúncia a qualquer outro por mais privilegiado que seja.
          </p>

          {/* ── 8. Alterações ────────────────────────────────────────── */}
          <h2 className={prose.h2}>8. Alterações a estes termos</h2>
          <p className={prose.p}>
            O GŌKAI reserva-se o direito de atualizar estes Termos de Uso a qualquer momento.
            Alterações significativas serão comunicadas nesta página. O uso continuado do site após
            a publicação de alterações constitui aceite das condições atualizadas.
          </p>

          {/* ── Links úteis ───────────────────────────────────────────── */}
          <div className="mt-12 border-t border-border pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground/55">
            <Link href="/privacidade" className="hover:font-semibold text-foreground transition-colors">
              Política de Privacidade →
            </Link>
            <Link href="/contato" className="hover:font-semibold text-foreground transition-colors">
              Formulário de Contato →
            </Link>
            <Link href="/governanca" className="hover:font-semibold text-foreground transition-colors">
              Governança →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
