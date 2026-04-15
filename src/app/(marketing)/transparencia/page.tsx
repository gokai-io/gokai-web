import type { Metadata } from "next"
import Link from "next/link"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiButton } from "@/components/branding/gokai-button"
import { FileText, ArrowRight, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Transparência | GŌKAI",
  description: "Transparência institucional da GŌKAI — estrutura, governança, receitas, despesas e documentos públicos.",
  alternates: { canonical: canonicalUrl("/transparencia") },
  openGraph: pageOpenGraph({
    title: "Transparência | GŌKAI",
    description: "Transparência institucional da GŌKAI — estrutura, governança, receitas, despesas e documentos públicos.",
    path: "/transparencia",
  }),
  twitter: {
    ...twitterCard,
    title: "Transparência | GŌKAI",
    description: "Transparência institucional da GŌKAI — estrutura, governança, receitas, despesas e documentos públicos.",
  },
}

// ─── Reusable components ─────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[var(--surface-midnight)] tracking-tight mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  )
}

function SectionDivider() {
  return <hr className="border-[var(--surface-midnight)]/8 my-10" />
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  )
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`text-left py-2.5 px-3 font-bold text-[var(--surface-midnight)] border-b-2 border-[var(--surface-midnight)]/12 ${className ?? ""}`}>
      {children}
    </th>
  )
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`py-2.5 px-3 text-[var(--surface-midnight)]/75 border-b border-[var(--surface-midnight)]/6 ${className ?? ""}`}>
      {children}
    </td>
  )
}

function TdBold({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`py-2.5 px-3 font-bold text-[var(--surface-midnight)] border-b border-[var(--surface-midnight)]/6 ${className ?? ""}`}>
      {children}
    </td>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 pl-4 border-l-2 border-[var(--accent-carmine)]/30 text-sm text-[var(--surface-midnight)]/65 italic">
      {children}
    </blockquote>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-base font-bold text-[var(--surface-midnight)] mt-8 mb-3">
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-[var(--surface-midnight)]/75 leading-[1.8] my-3">{children}</p>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransparenciaPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer className="text-center">
          <div className="gokai-kicker justify-center mb-4">Prestação de Contas</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-ivory)]">
            Transparência Institucional
          </h1>
          <p className="mx-auto mt-4 text-sm font-bold uppercase tracking-[0.15em] text-[var(--text-ivory-muted)]">
            Associação Gōkai – Clube de Artes Marciais · Juiz de Fora – MG · Fundada em 2026 · Sem fins lucrativos
          </p>
        </BrandContainer>
      </section>

      {/* ── Content — paper background ───────────────────────── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white px-8 py-12 sm:px-14 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {/* ── O que é a Gōkai? ── */}
            <SectionTitle>O que é a Gōkai?</SectionTitle>
            <P>
              A Gōkai é uma associação civil sem fins lucrativos dedicada à promoção das artes marciais,
              esportes de combate e ações socioeducativas em Juiz de Fora/MG. Nosso propósito é usar o esporte
              como ferramenta de transformação social, com foco em inclusão, cidadania e formação de valores.
            </P>

            <SectionDivider />

            {/* ── Estrutura Organizacional ── */}
            <SectionTitle>Estrutura Organizacional</SectionTitle>

            <SubHeading>Diretoria Executiva</SubHeading>
            <Table>
              <thead>
                <tr><Th>Cargo</Th><Th>Responsável</Th></tr>
              </thead>
              <tbody>
                <tr><Td>Presidente</Td><TdBold>Thiago Mello</TdBold></tr>
                <tr><Td>Vice-Presidente</Td><TdBold>Renan Winter Spatin</TdBold></tr>
                <tr><Td>Diretor Administrativo</Td><TdBold>Allan Henrique</TdBold></tr>
                <tr><Td>Diretor Financeiro</Td><Td className="italic">A definir</Td></tr>
                <tr><Td>Diretor Técnico/Esportivo</Td><TdBold>Jafar Mohammed Untar</TdBold></tr>
              </tbody>
            </Table>

            <SubHeading>Equipe Técnica</SubHeading>
            <Table>
              <thead>
                <tr><Th>Professor</Th><Th>Modalidades</Th></tr>
              </thead>
              <tbody>
                <tr><TdBold>Alex Sobreira</TdBold><Td>Boxe</Td></tr>
                <tr><TdBold>Linus Pauling Ferreira Pereira</TdBold><Td>Jiu-Jitsu · Judô · Boxe · Xadrez</Td></tr>
                <tr><TdBold>Cássia dos Santos Soranço</TdBold><Td>Jiu-Jitsu · Judô · Boxe · Educação Ambiental</Td></tr>
              </tbody>
            </Table>

            <Quote>Os professores <strong>não integram a Diretoria Executiva</strong>.</Quote>

            <SectionDivider />

            {/* ── Projetos Parceiros ── */}
            <SectionTitle>Projetos Parceiros</SectionTitle>
            <P>
              A Gōkai conta com o apoio institucional dos seguintes projetos, que atuam como apoiadores não financeiros da associação:
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

            <SectionDivider />

            {/* ── Polos de Atividade ── */}
            <SectionTitle>Polos de Atividade</SectionTitle>
            <ul className="space-y-3 my-3">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-[var(--accent-carmine)] mt-1 shrink-0" />
                <div className="text-[15px]">
                  <strong className="text-[var(--surface-midnight)]">São Mateus</strong>
                  <span className="text-[var(--surface-midnight)]/60"> – Sede principal · Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-[var(--accent-carmine)] mt-1 shrink-0" />
                <span className="text-[15px] text-[var(--surface-midnight)]"><strong>Linhares</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-[var(--accent-carmine)] mt-1 shrink-0" />
                <span className="text-[15px] text-[var(--surface-midnight)]"><strong>São Pedro</strong></span>
              </li>
            </ul>

            <SectionDivider />

            {/* ── Modalidades ── */}
            <SectionTitle>Modalidades Oferecidas</SectionTitle>
            <P>
              Jiu-Jitsu · Judô · Boxe · Xadrez · Defesa Pessoal Feminina · Educação Ambiental
            </P>

            <SectionDivider />

            {/* ── Associados ── */}
            <SectionTitle>Associados</SectionTitle>
            <P>A Gōkai tem as seguintes categorias de membros:</P>
            <ul className="space-y-2 pl-5 my-3">
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Fundadores</strong> – participaram da constituição da associação
              </li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Efetivos</strong> – participam regularmente das atividades
              </li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Colaboradores</strong> – pessoas físicas ou jurídicas que apoiam sem participação na gestão
              </li>
              <li className="list-disc text-[15px] text-[var(--surface-midnight)]/75 leading-relaxed">
                <strong className="text-[var(--surface-midnight)]">Atletas/Alunos</strong> – participantes das atividades esportivas
              </li>
            </ul>

            <SectionDivider />

            {/* ── Receitas e Despesas ── */}
            <SectionTitle>Receitas e Despesas</SectionTitle>

            <SubHeading>Fontes de receita</SubHeading>
            <P>
              Contribuições de associados · Doações · Patrocínios · Contrapartidas de parceiros · Editais públicos · Convênios
            </P>

            <SubHeading>Custos fixos mensais</SubHeading>
            <Table>
              <thead>
                <tr><Th className="w-16 text-center">Prio</Th><Th>Item</Th><Th className="text-right">Valor</Th></tr>
              </thead>
              <tbody>
                <tr><Td className="text-center">1</Td><Td>Aluguel — São Mateus</Td><Td className="text-right">R$ 2.000,00</Td></tr>
                <tr><Td className="text-center">1</Td><Td>Aluguel — Linhares</Td><Td className="text-right">R$ 2.000,00</Td></tr>
                <tr><Td className="text-center">1</Td><Td>Professores (2×)</Td><Td className="text-right">R$ 4.000,00</Td></tr>
                <tr><Td className="text-center">1</Td><Td>Coordenador/Professor</Td><Td className="text-right">R$ 2.000,00</Td></tr>
                <tr>
                  <td className="py-2.5 px-3" />
                  <TdBold>Total fixo mensal</TdBold>
                  <TdBold className="text-right">R$ 10.000,00</TdBold>
                </tr>
              </tbody>
            </Table>

            <Quote>
              Nenhum resultado, excedente ou patrimônio é distribuído a associados ou dirigentes.
            </Quote>

            <SubHeading>Como o dinheiro é gasto — ordem de prioridade</SubHeading>
            <P>Quando a arrecadação do mês não cobre todos os custos, os recursos são aplicados nesta ordem:</P>
            <Table>
              <thead>
                <tr><Th className="w-16 text-center">Prio</Th><Th>Destino</Th><Th className="text-center w-20">%</Th></tr>
              </thead>
              <tbody>
                <tr><Td className="text-center">1</Td><Td>Aluguel + pagamento de professores</Td><Td className="text-center">65%</Td></tr>
                <tr><Td className="text-center">2</Td><Td>Filiações federativas + inscrições em campeonatos</Td><Td className="text-center">15%</Td></tr>
                <tr><Td className="text-center">3</Td><Td>Uniformes e equipamentos dos atletas</Td><Td className="text-center">12%</Td></tr>
                <tr><Td className="text-center">4</Td><Td>Alimentação e transporte em competições</Td><Td className="text-center">8%</Td></tr>
              </tbody>
            </Table>

            <SubHeading>Filiações anuais por modalidade</SubHeading>
            <Table>
              <thead>
                <tr><Th>Modalidade</Th><Th className="text-center">Filiação federativa</Th></tr>
              </thead>
              <tbody>
                <tr><Td>Jiu-Jitsu</Td><Td className="text-center">R$ 40,00</Td></tr>
                <tr><Td>Judô</Td><Td className="text-center">R$ 100,00</Td></tr>
                <tr><Td>Boxe</Td><Td className="text-center">R$ 100,00</Td></tr>
              </tbody>
            </Table>

            <SubHeading>Custo por atleta em campeonato</SubHeading>
            <Table>
              <thead>
                <tr><Th>Modalidade</Th><Th className="text-center">Inscrição</Th><Th className="text-center">Transporte</Th><Th className="text-center">Alimentação</Th><Th className="text-center">Total</Th></tr>
              </thead>
              <tbody>
                <tr><Td>Judô</Td><Td className="text-center">R$ 100,00</Td><Td className="text-center">R$ 100,00</Td><Td className="text-center">R$ 150,00</Td><TdBold className="text-center">R$ 350,00</TdBold></tr>
                <tr><Td>Jiu-Jitsu</Td><Td className="text-center">R$ 150,00</Td><Td className="text-center">R$ 100,00</Td><Td className="text-center">R$ 150,00</Td><TdBold className="text-center">R$ 400,00</TdBold></tr>
                <tr><Td>Boxe</Td><Td className="text-center">R$ 200,00</Td><Td className="text-center">R$ 100,00</Td><Td className="text-center">R$ 150,00</Td><TdBold className="text-center">R$ 450,00</TdBold></tr>
              </tbody>
            </Table>

            <SubHeading>Kit de equipamentos por modalidade</SubHeading>

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--surface-midnight)]/50 mt-6 mb-2">Judô</p>
            <Table>
              <tbody>
                <tr><Td>Filiação</Td><Td className="text-right">R$ 100,00</Td></tr>
                <tr><Td>Kimono</Td><Td className="text-right">R$ 260,00</Td></tr>
                <tr><TdBold>Total</TdBold><TdBold className="text-right">R$ 360,00</TdBold></tr>
              </tbody>
            </Table>

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--surface-midnight)]/50 mt-6 mb-2">Jiu-Jitsu</p>
            <Table>
              <tbody>
                <tr><Td>Filiação</Td><Td className="text-right">R$ 40,00</Td></tr>
                <tr><Td>Kimono</Td><Td className="text-right">R$ 260,00</Td></tr>
                <tr><TdBold>Total</TdBold><TdBold className="text-right">R$ 300,00</TdBold></tr>
              </tbody>
            </Table>

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--surface-midnight)]/50 mt-6 mb-2">Boxe</p>
            <Table>
              <tbody>
                <tr><Td>Filiação</Td><Td className="text-right">R$ 100,00</Td></tr>
                <tr><Td>Luvas</Td><Td className="text-right">R$ 260,00</Td></tr>
                <tr><Td>Bandagem</Td><Td className="text-right">R$ 60,00</Td></tr>
                <tr><Td>Protetor bucal</Td><Td className="text-right">R$ 40,00</Td></tr>
                <tr><Td>Coquilha</Td><Td className="text-right">R$ 150,00</Td></tr>
                <tr><Td>Bota de boxe</Td><Td className="text-right">R$ 200,00</Td></tr>
                <tr><Td>Uniforme</Td><Td className="text-right">R$ 200,00</Td></tr>
                <tr><TdBold>Total</TdBold><TdBold className="text-right">R$ 1.010,00</TdBold></tr>
              </tbody>
            </Table>

            <SectionDivider />

            {/* ── Para Patrocinadores ── */}
            <SectionTitle>Para Patrocinadores</SectionTitle>
            <div className="my-4 rounded-xl bg-[var(--surface-midnight)]/[0.03] border border-[var(--surface-midnight)]/8 p-6">
              <P>
                Com <strong className="text-[var(--surface-midnight)]">R$ 1.000,00/mês</strong> é possível equipar 3 atletas de judô ou jiu-jitsu,
                ou custear 2 atletas de boxe em um campeonato (inscrição + transporte + alimentação).
              </P>
              <P>
                Com <strong className="text-[var(--surface-midnight)]">R$ 4.000,00/mês</strong> a Gōkai cobre integralmente os dois aluguéis e
                mantém suas portas abertas.
              </P>
              <P>
                Todo recurso recebido é aplicado diretamente nas atividades e nos atletas — a Gōkai não distribui
                lucros, excedentes ou patrimônio a dirigentes ou associados.
              </P>
            </div>

            <SectionDivider />

            {/* ── Documentos Institucionais ── */}
            <SectionTitle>Documentos Institucionais</SectionTitle>
            <Table>
              <thead>
                <tr><Th>Documento</Th><Th>Status</Th><Th className="w-40">{""}</Th></tr>
              </thead>
              <tbody>
                <tr>
                  <TdBold>Estatuto Social</TdBold>
                  <Td>Aprovado em Assembleia de Fundação</Td>
                  <Td>
                    <Link
                      href="/transparencia/00000000-0000-0000-0000-000000000601"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-carmine)] hover:brightness-125 transition-all"
                    >
                      <FileText className="size-3.5" /> Visualizar <ArrowRight className="size-3" />
                    </Link>
                  </Td>
                </tr>
                <tr>
                  <TdBold>Regimento Interno</TdBold>
                  <Td>Vigente</Td>
                  <Td>
                    <Link
                      href="/transparencia/00000000-0000-0000-0000-000000000603"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-carmine)] hover:brightness-125 transition-all"
                    >
                      <FileText className="size-3.5" /> Visualizar <ArrowRight className="size-3" />
                    </Link>
                  </Td>
                </tr>
                <tr>
                  <TdBold>Ata de Fundação</TdBold>
                  <Td>Lavrada em assembleia</Td>
                  <Td>
                    <Link
                      href="/transparencia/00000000-0000-0000-0000-000000000602"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-carmine)] hover:brightness-125 transition-all"
                    >
                      <FileText className="size-3.5" /> Visualizar <ArrowRight className="size-3" />
                    </Link>
                  </Td>
                </tr>
                <tr>
                  <TdBold>Memorando de Parceria</TdBold>
                  <Td>Assinado com projetos parceiros</Td>
                  <Td>{""}</Td>
                </tr>
                <tr>
                  <TdBold>Prestação de Contas</TdBold>
                  <Td>Publicada anualmente até março</Td>
                  <Td>{""}</Td>
                </tr>
              </tbody>
            </Table>

            <P>
              Para solicitar cópia integral do Estatuto ou Regimento Interno, entre em contato pelo e-mail institucional.
            </P>

            <SectionDivider />

            {/* ── Princípios ── */}
            <SectionTitle>Princípios</SectionTitle>
            <blockquote className="my-6 text-center text-xl font-heading font-extrabold italic text-[var(--surface-midnight)]/80">
              &ldquo;Disciplina, Respeito e Superação&rdquo;
            </blockquote>
            <P>
              A Gōkai veda qualquer manifestação político-partidária, discriminatória ou preconceituosa
              em suas dependências e atividades.
            </P>

            <div className="mt-10 pt-6 border-t border-[var(--surface-midnight)]/8 text-xs text-[var(--surface-midnight)]/40 text-center">
              Última atualização: abril de 2026
            </div>

          </article>
        </BrandContainer>
      </section>

      {/* ── CTA — contato ──────────────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-16">
        <BrandContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-xl font-extrabold text-[var(--text-ivory)]">
              Solicitação de Documentos
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-ivory-dim)]">
              Caso necessite de algum documento não listado aqui, entre em contato conosco.
              Atendemos às solicitações conforme previsto em nosso estatuto social.
            </p>
            <div className="mt-6">
              <GokaiButton href="/contato" tone="primary">
                Entrar em contato
              </GokaiButton>
            </div>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
