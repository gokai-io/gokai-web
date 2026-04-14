import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { LEGAL_ENTITY_NAME, LEGAL_CNPJ, LEGAL_DPO_EMAIL, CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Política de Privacidade | GŌKAI",
  description:
    "Como o GŌKAI coleta, usa e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  alternates: {
    canonical: canonicalUrl("/privacidade"),
  },
  openGraph: pageOpenGraph({
    title: "Política de Privacidade | GŌKAI",
    description:
      "Saiba como o GŌKAI trata seus dados pessoais em conformidade com a LGPD (Lei 13.709/2018).",
    path: "/privacidade",
  }),
  twitter: {
    ...twitterCard,
    title: "Política de Privacidade | GŌKAI",
    description: "Política de privacidade do GŌKAI – tratamento de dados em conformidade com a LGPD.",
  },
}

// ─── Identity helpers ─────────────────────────────────────────────────────────

/** Resolved entity name for display — falls back to brand name. */
const entityName = LEGAL_ENTITY_NAME ?? "GŌKAI – Associação Esportiva e Ambiental"

/** Contact for data/privacy requests — prefers DPO email, then general contact. */
const privacyEmail = LEGAL_DPO_EMAIL ?? CONTACT_EMAIL

// ─── Shared prose styles ──────────────────────────────────────────────────────

const prose = {
  h2: "text-xl font-semibold text-foreground mt-10 mb-3 scroll-mt-24",
  h3: "text-base font-semibold text-foreground/85 mt-6 mb-2",
  p: "text-sm text-muted-foreground leading-relaxed mb-3",
  ul: "list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-3 pl-1",
  li: "leading-relaxed",
  a: "text-secondary hover:text-secondary/75 underline underline-offset-2 transition-colors",
  aside:
    "mt-10 border border-border rounded-[20px] p-5 bg-muted/40 text-sm text-muted-foreground leading-relaxed",
  badge:
    "inline-block text-[10px] font-semibold uppercase tracking-widest text-secondary bg-secondary/10 rounded px-2 py-0.5 mr-2",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gokai-hero gokai-hero-compact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gokai-kicker text-[var(--text-on-dark-secondary)]">Institucional</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[var(--text-on-dark)] sm:text-5xl">
            Política de Privacidade
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-on-dark-muted)]">
            <span>
              Última atualização:{" "}
              <time dateTime="2026-04-12" className="text-[var(--text-on-dark-secondary)]">
                abril de 2026
              </time>
            </span>
            <span aria-hidden>·</span>
            <span>Lei Geral de Proteção de Dados — Lei nº 13.709/2018</span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Content */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* ── 1. Introdução ─────────────────────────────────────────── */}
          <p className={prose.p}>
            Esta Política de Privacidade descreve como a <strong className="font-semibold text-foreground">{entityName}</strong>{" "}
            (&ldquo;GŌKAI&rdquo;, &ldquo;nós&rdquo; ou &ldquo;nossa associação&rdquo;) coleta, usa, armazena e
            protege os dados pessoais de visitantes, associados e pessoas que interagem com nosso
            site e serviços.
          </p>
          <p className={prose.p}>
            Atuamos em conformidade com a{" "}
            <strong className="font-semibold text-foreground">Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>,
            Lei nº 13.709/2018. Ao utilizar nosso site ou enviar qualquer formulário, você declara
            ter lido e compreendido esta política.
          </p>

          {LEGAL_CNPJ && (
            <p className={prose.p}>
              CNPJ: <span className="font-semibold text-foreground">{LEGAL_CNPJ}</span>
            </p>
          )}

          {/* ── 2. Dados que coletamos ────────────────────────────────── */}
          <h2 className={prose.h2}>2. Dados que coletamos</h2>

          <h3 className={prose.h3}>2.1 Formulário de contato</h3>
          <p className={prose.p}>
            Quando você nos envia uma mensagem pelo formulário em <Link href="/contato" className={prose.a}>/contato</Link>,
            coletamos:
          </p>
          <ul className={prose.ul}>
            <li className={prose.li}>Nome completo (obrigatório)</li>
            <li className={prose.li}>Endereço de e-mail (obrigatório)</li>
            <li className={prose.li}>Telefone (opcional)</li>
            <li className={prose.li}>Assunto e conteúdo da mensagem (obrigatório)</li>
          </ul>

          <h3 className={prose.h3}>2.2 Dados de associados e inscrição</h3>
          <p className={prose.p}>
            Para processar inscrições e manter o vínculo associativo, podemos coletar dados
            cadastrais como nome, data de nascimento, documentos de identificação, endereço, contato
            de emergência e informações relevantes para a prática esportiva (condição de saúde,
            autorizações de responsáveis para menores de idade).
          </p>

          <h3 className={prose.h3}>2.3 Dados de navegação</h3>
          <p className={prose.p}>
            Nosso servidor pode registrar automaticamente informações técnicas como endereço IP,
            tipo de navegador, páginas visitadas e horário de acesso. Esses dados são usados
            exclusivamente para fins de segurança e diagnóstico técnico, e não são associados à sua
            identidade.
          </p>

          <h3 className={prose.h3}>2.4 Cookies</h3>
          <p className={prose.p}>
            Utilizamos apenas cookies técnicos estritamente necessários para o funcionamento do
            site (como sessão autenticada para associados). Não utilizamos cookies de rastreamento,
            publicidade ou analytics de terceiros neste momento.
          </p>

          {/* ── 3. Como usamos seus dados ────────────────────────────── */}
          <h2 className={prose.h2}>3. Como usamos seus dados</h2>
          <p className={prose.p}>Os dados coletados são usados para:</p>
          <ul className={prose.ul}>
            <li className={prose.li}>Responder às suas dúvidas e solicitações de contato</li>
            <li className={prose.li}>Processar inscrições e manter o cadastro de associados</li>
            <li className={prose.li}>
              Enviar comunicações relacionadas a eventos, resultados e atividades da associação,
              mediante consentimento prévio
            </li>
            <li className={prose.li}>
              Cumprir obrigações legais e estatutárias da associação
            </li>
            <li className={prose.li}>Garantir a segurança do site e dos sistemas</li>
          </ul>
          <p className={prose.p}>
            Não utilizamos seus dados para fins de publicidade de terceiros nem os vendemos ou
            cedemos a outras organizações sem sua autorização, exceto nas hipóteses legais descritas
            nesta política.
          </p>

          {/* ── 4. Base legal (LGPD) ─────────────────────────────────── */}
          <h2 className={prose.h2}>4. Base legal para o tratamento</h2>
          <p className={prose.p}>
            O tratamento dos seus dados pessoais pelo GŌKAI é realizado com fundamento nas
            seguintes bases legais previstas no art. 7º da LGPD:
          </p>
          <ul className={prose.ul}>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Consentimento</strong> — para envio de
              comunicações e marketing, quando você nos autoriza expressamente
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Execução de contrato ou procedimentos
              preliminares</strong> — para processar inscrições e formalizar o vínculo associativo
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Interesse legítimo</strong> — para responder
              mensagens de contato e garantir a segurança dos sistemas
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Obrigação legal</strong> — quando a legislação
              aplicável exige a retenção ou divulgação de dados
            </li>
          </ul>

          {/* ── 5. Compartilhamento ───────────────────────────────────── */}
          <h2 className={prose.h2}>5. Compartilhamento de dados</h2>
          <p className={prose.p}>
            Não vendemos dados pessoais. Podemos compartilhá-los apenas nas seguintes situações:
          </p>
          <ul className={prose.ul}>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Prestadores de serviço</strong> — empresas que
              auxiliam na operação técnica do site (hospedagem, banco de dados), contratadas com
              obrigações de confidencialidade
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Autoridades competentes</strong> — quando exigido
              por lei, ordem judicial ou para proteção de direitos
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Federações e entidades esportivas</strong> —
              quando necessário para inscrição em competições, com base no consentimento ou
              execução de contrato
            </li>
          </ul>

          {/* ── 6. Retenção ───────────────────────────────────────────── */}
          <h2 className={prose.h2}>6. Retenção de dados</h2>
          <p className={prose.p}>
            Mantemos seus dados apenas pelo tempo necessário para as finalidades declaradas ou
            enquanto houver obrigação legal de guarda. Dados de mensagens de contato são retidos
            por período razoável para registro e acompanhamento. Dados de associados são mantidos
            durante o vínculo e conforme exigências do estatuto e da legislação associativa.
          </p>
          <p className={prose.p}>
            Após o período de retenção, os dados são eliminados de forma segura ou anonimizados.
          </p>

          {/* ── 7. Seus direitos ──────────────────────────────────────── */}
          <h2 className={prose.h2}>7. Seus direitos (LGPD, art. 18)</h2>
          <p className={prose.p}>
            Como titular de dados pessoais, você tem os seguintes direitos garantidos pela LGPD:
          </p>
          <ul className={prose.ul}>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Confirmação e acesso</strong> — saber se tratamos
              seus dados e acessar uma cópia
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Correção</strong> — solicitar a atualização de
              dados incompletos, inexatos ou desatualizados
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Anonimização, bloqueio ou eliminação</strong> —
              de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Portabilidade</strong> — receber seus dados em
              formato estruturado e interoperável
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Eliminação</strong> — dos dados tratados com base
              em consentimento, salvo exceções legais
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Informação sobre compartilhamento</strong> —
              saber com quais entidades públicas ou privadas compartilhamos seus dados
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Revogação do consentimento</strong> — a qualquer
              momento, sem prejuízo do tratamento realizado anteriormente
            </li>
            <li className={prose.li}>
              <strong className="font-semibold text-foreground">Oposição</strong> — ao tratamento realizado com
              base em outras hipóteses legais em caso de descumprimento da LGPD
            </li>
          </ul>
          <p className={prose.p}>
            Para exercer qualquer desses direitos, entre em contato conforme indicado na{" "}
            <a href="#contato-dpo" className={prose.a}>seção 10</a> abaixo. Responderemos no
            prazo de até 15 dias úteis.
          </p>

          {/* ── 8. Segurança ──────────────────────────────────────────── */}
          <h2 className={prose.h2}>8. Segurança da informação</h2>
          <p className={prose.p}>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais
            contra acesso não autorizado, perda, alteração ou divulgação indevida, incluindo
            transmissão criptografada (HTTPS) e controles de acesso ao banco de dados.
          </p>
          <p className={prose.p}>
            Nenhum sistema é completamente infalível. Em caso de incidente que possa afetar seus
            direitos, cumpriremos as obrigações de notificação previstas na LGPD.
          </p>

          {/* ── 9. Menores de idade ───────────────────────────────────── */}
          <h2 className={prose.h2}>9. Menores de idade</h2>
          <p className={prose.p}>
            O GŌKAI é uma associação esportiva que oferece atividades para todas as idades,
            incluindo crianças e adolescentes. Para inscrição de menores de 18 anos, exigimos o
            consentimento expresso de pais ou responsáveis legais, que assumem a responsabilidade
            pelas informações fornecidas.
          </p>
          <p className={prose.p}>
            Não coletamos intencionalmente dados de menores de idade sem o consentimento do
            responsável legal. Se identificarmos dados coletados indevidamente, tomaremos
            providências para eliminá-los.
          </p>

          {/* ── 10. Alterações a esta política ───────────────────────── */}
          <h2 className={prose.h2}>10. Alterações a esta política</h2>
          <p className={prose.p}>
            Podemos atualizar esta Política de Privacidade periodicamente. Sempre que houver
            mudanças significativas, publicaremos a versão atualizada nesta página com a nova data
            de revisão. Recomendamos a consulta periódica.
          </p>
          <p className={prose.p}>
            A continuidade do uso do site após a publicação de alterações implica aceite das
            condições atualizadas.
          </p>

          {/* ── 11. Contato e exercício de direitos ──────────────────── */}
          <h2 id="contato-dpo" className={prose.h2}>
            11. Contato e exercício de direitos
          </h2>
          <p className={prose.p}>
            Para exercer seus direitos como titular de dados, esclarecer dúvidas sobre esta política
            ou registrar uma solicitação de privacidade, entre em contato:
          </p>

          {privacyEmail ? (
            <div className={prose.aside}>
              <p className="mb-1">
                <strong className="font-semibold text-foreground">E-mail para solicitações de privacidade:</strong>
              </p>
              <a href={`mailto:${privacyEmail}`} className={prose.a}>
                {privacyEmail}
              </a>
              <p className="mt-3 text-xs text-muted-foreground/50">
                Prazo de resposta: até 15 dias úteis, conforme art. 19 da LGPD.
              </p>
            </div>
          ) : (
            <div className={prose.aside}>
              {/* ⚠️ TODO: Set LEGAL_DPO_EMAIL or CONTACT_EMAIL in src/lib/site.ts */}
              <p className="mb-1">
                <strong className="font-semibold text-foreground">Solicitações de privacidade:</strong>
              </p>
              <p>
                Utilize o{" "}
                <Link href="/contato" className={prose.a}>
                  formulário de contato
                </Link>{" "}
                e informe no campo assunto &ldquo;Solicitação LGPD&rdquo;.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/50">
                Prazo de resposta: até 15 dias úteis, conforme art. 19 da LGPD.
              </p>
            </div>
          )}

          {/* ── Links úteis ───────────────────────────────────────────── */}
          <div className="mt-12 border-t border-border pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground/55">
            <Link href="/termos" className="hover:font-semibold text-foreground transition-colors">
              Termos de Uso →
            </Link>
            <Link href="/contato" className="hover:font-semibold text-foreground transition-colors">
              Formulário de Contato →
            </Link>
            <Link href="/transparencia" className="hover:font-semibold text-foreground transition-colors">
              Transparência →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
