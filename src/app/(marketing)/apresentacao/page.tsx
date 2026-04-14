import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import Link from "next/link"
import Image from "next/image"
import {
  UsersRound,
  Scale,
  Sprout,
  Users,
  Trophy,
  Heart,
  TrendingUp,
  Shield,
  Award,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Quote,
  Presentation,
  UserPlus,
} from "lucide-react"
import { getStats, getPatrocinadores } from "@/lib/queries/apresentacao"

export const metadata: Metadata = {
  title: "Apresentação Institucional | GŌKAI",
  description:
    "Conheça o GŌKAI – Associação Esportiva e Ambiental. Nossa missão, estrutura, impacto e oportunidades de parceria.",
  alternates: {
    canonical: canonicalUrl("/apresentacao"),
  },
  openGraph: pageOpenGraph({
    title: "Apresentação Institucional | GŌKAI",
    description:
      "Conheça o GŌKAI – Associação Esportiva e Ambiental. Nossa missão, estrutura, impacto e oportunidades de parceria.",
    path: "/apresentacao",
  }),
  twitter: {
    ...twitterCard,
    title: "Apresentação Institucional | GŌKAI",
    description:
      "Conheça o GŌKAI – Associação Esportiva e Ambiental. Nossa missão, estrutura, impacto e oportunidades de parceria.",
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ApresentacaoPage() {
  const [stats, patrocinadores] = await Promise.all([getStats(), getPatrocinadores()])

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          PITCH DECK HUB
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0C2418] py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 30%, oklch(0.35 0.12 18 / 0.06) 0%, transparent 80%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              Apresentações
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Conheça o GŌKAI a fundo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/62">
              Explore nossas apresentações imersivas — cada uma pensada para um público diferente.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Presentation,
                title: "Entenda o Projeto",
                desc: "Quem somos, missão, governança e números. Ideal para quem quer conhecer o GŌKAI.",
                href: "/apresentacao/projeto",
                color: "text-red-500",
              },
              {
                icon: Handshake,
                title: "Seja Patrocinador",
                desc: "Por que apoiar, níveis de parceria e como funciona. Para empresas e parceiros.",
                href: "/apresentacao/patrocinador",
                color: "text-white/72",
              },
              {
                icon: UserPlus,
                title: "Participe do Projeto",
                desc: "Caminhos para atletas, voluntários e apoiadores individuais.",
                href: "/apresentacao/participe",
                color: "text-white/72",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex flex-col gap-5 rounded-xl border border-white/12 bg-white/5 p-8 transition-all hover:border-white/28 hover:bg-[#123020]"
              >
                <card.icon className={`size-8 ${card.color} transition-colors group-hover:text-red-500`} />
                <div>
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{card.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-white/62 transition-colors group-hover:text-white/85">
                  Abrir apresentação
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 1 — CAPA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Grid decorativo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
          aria-hidden
        />
        {/* Glow radial */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.35 0.12 18 / 0.07) 0%, transparent 80%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            Apresentação Institucional
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
            GŌKAI
          </h1>
          <p className="mt-2 text-lg font-medium tracking-widest text-white/62 sm:text-xl">
            ASSOCIAÇÃO ESPORTIVA E AMBIENTAL
          </p>

          <div className="mx-auto my-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-white/18" aria-hidden />
            <span className="h-1 w-8 rounded-full bg-white/28" aria-hidden />
            <span className="h-px w-16 bg-white/18" aria-hidden />
          </div>

          <p className="mx-auto max-w-xl text-base font-medium italic leading-relaxed text-white/45">
            &ldquo;A disciplina constrói o caminho. A evolução é o destino.&rdquo;
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/62">
            Formar atletas e cidadãos através das artes marciais.
            <br className="hidden sm:block" />
            Conheça nossa estrutura, impacto e oportunidades de parceria.
          </p>

          <div className="mt-12">
            <a
              href="#quem-somos"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/62 transition-colors hover:text-white/85"
            >
              Explorar apresentação
              <ArrowRight className="size-4 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 2 — QUEM SOMOS
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="quem-somos"
        className="relative overflow-hidden bg-[#123020] py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                Quem Somos
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Mais do que uma associação.
                <br />
                Uma filosofia de vida.
              </h2>

              <div className="mt-8 space-y-4 text-base leading-relaxed text-white/62">
                <p>
                  O <strong className="text-white/85">GŌKAI</strong> é uma associação dedicada à
                  prática e ao ensino das artes marciais, com foco na formação integral de seus
                  atletas — técnica, disciplina, caráter e saúde.
                </p>
                <p>
                  Fundada por praticantes apaixonados, a associação une tradição e modernidade em um
                  ambiente que promove o respeito, a superação pessoal e a excelência esportiva.
                </p>
                <p>
                  Operamos como associação sem fins lucrativos, com governança transparente,
                  conselho fiscal atuante e prestação de contas pública.
                </p>
                <p className="text-white/72 font-medium">
                  <strong>Nossa visão:</strong> Ser referência local e regional em formação
                  esportiva e desenvolvimento humano.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Disciplina",
                  desc: "A base de toda evolução. Dentro e fora do tatame.",
                },
                {
                  icon: Heart,
                  title: "Respeito",
                  desc: "Ao mestre, ao adversário, ao caminho e a si mesmo.",
                },
                {
                  icon: TrendingUp,
                  title: "Evolução Contínua",
                  desc: "Sempre buscar a próxima versão de si — técnica, mental e pessoal.",
                },
                {
                  icon: UsersRound,
                  title: "Inclusão Social",
                  desc: "O esporte como ferramenta de transformação e acesso para todos.",
                },
                {
                  icon: Scale,
                  title: "Cidadania",
                  desc: "Formar atletas conscientes de seus direitos e deveres na comunidade.",
                },
                {
                  icon: Award,
                  title: "Mérito",
                  desc: "Cada conquista é resultado de esforço real. Nada é dado.",
                },
                {
                  icon: Sprout,
                  title: "Desenvolvimento Humano",
                  desc: "Formar pessoas completas — corpo, mente e caráter — para a vida.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="flex flex-col gap-3 rounded-xl border border-white/12 bg-[#0C2418]/50 p-5 transition-colors hover:border-white/28"
                >
                  <v.icon className="size-6 text-white/62" />
                  <h3 className="text-sm font-semibold text-white">{v.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 3 — NÚMEROS
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0C2418] py-28 overflow-hidden">
        {/* Brilho dourado sutil */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.35 0.12 18 / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              O GŌKAI em números
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Impacto real, resultados concretos
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { value: stats.alunos || "—", label: "Alunos Ativos", icon: Users },
              { value: stats.turmas || "—", label: "Turmas", icon: Award },
              { value: stats.modalidades || "—", label: "Modalidades", icon: Trophy },
              { value: stats.professores || "—", label: "Professores", icon: Users },
              { value: stats.eventos || "—", label: "Eventos Realizados", icon: TrendingUp },
              { value: stats.patrocinadores || "—", label: "Parceiros", icon: Handshake },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/12/60 bg-[#123020]/40 p-6 text-center"
              >
                <stat.icon className="size-5 text-white/45" />
                <span className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-white/45">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 4 — ESTRUTURA E GOVERNANÇA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#123020] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              Estrutura
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Governança sólida e transparente
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/62">
              O GŌKAI é uma associação sem fins lucrativos, com estrutura diretiva formal,
              conselho fiscal atuante e publicação regular de documentos institucionais.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Diretoria Executiva",
                desc: "Presidente, Vice-Presidente, e três diretores (Administrativo, Financeiro e Técnico Esportivo) eleitos em assembleia.",
                icon: Shield,
              },
              {
                title: "Conselho Fiscal",
                desc: "Órgão independente que acompanha e fiscaliza as finanças e operações da associação.",
                icon: CheckCircle2,
              },
              {
                title: "Transparência Total",
                desc: "Atas, balanços, relatórios e estatuto disponíveis publicamente na seção de transparência do site.",
                icon: TrendingUp,
              },
              {
                title: "Equipe Técnica",
                desc: "Professores qualificados e registrados em federações, com acompanhamento pedagógico constante.",
                icon: Award,
              },
              {
                title: "Gestão de Alunos",
                desc: "Sistema digital de matrícula, frequência e acompanhamento do desenvolvimento de cada atleta.",
                icon: Users,
              },
              {
                title: "Eventos e Campeonatos",
                desc: "Calendário anual de eventos, seminários, campeonatos e atividades sociais.",
                icon: Trophy,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-white/12 bg-[#0C2418]/50 p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/8">
                  <item.icon className="size-5 text-white/62" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 5 — POR QUE APOIAR
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0C2418] py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 30% 50%, oklch(0.35 0.12 18 / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Razões */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                Oportunidade
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Por que apoiar o GŌKAI?
              </h2>

              <div className="mt-10 space-y-6">
                {[
                  {
                    title: "Visibilidade de marca",
                    desc: "Presença no site oficial, materiais impressos, redes sociais e eventos — com alcance direto a atletas, famílias e comunidade.",
                  },
                  {
                    title: "Associação a valores fortes",
                    desc: "Disciplina, respeito, excelência e superação. Sua marca vinculada aos valores que definem o esporte de alto rendimento.",
                  },
                  {
                    title: "Impacto social",
                    desc: "Contribua com a formação de jovens e adultos através do esporte, promovendo saúde, cidadania e desenvolvimento pessoal.",
                  },
                  {
                    title: "Relacionamento direto",
                    desc: "Acesso privilegiado a eventos, reuniões com a diretoria e relatórios de impacto — transparência total sobre onde seu investimento é aplicado.",
                  },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/8 text-xs font-bold text-white/62">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Depoimento / Quote */}
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-2xl border border-white/12 bg-[#123020] p-8 lg:p-10">
                <Quote className="mb-4 size-8 text-white/30" />
                <blockquote className="text-lg font-medium leading-relaxed text-white/72 italic">
                  &ldquo;Apoiar o GŌKAI é investir em uma comunidade que transforma vidas pelo
                  esporte. A seriedade e a transparência da associação nos deram total confiança para
                  firmar essa parceria.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/8 text-sm font-bold text-white/62">
                    P
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/85">Parceiro GŌKAI</p>
                    <p className="text-xs text-white/45">Apoiador desde 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 6 — PLANOS DE PARCERIA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#123020] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              Planos
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Níveis de Parceria
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/62">
              Escolha o nível que melhor se encaixa com o perfil da sua empresa ou contribuição pessoal.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Ouro */}
            <TierCard
              nivel="Ouro"
              badgeClass="bg-red-600 text-[#0C2418]"
              ringClass="ring-2 ring-red-600/40"
              featured
              benefits={[
                "Logo em destaque no site oficial",
                "Logo em todo material de divulgação",
                "Menção mensal nas redes sociais",
                "Banner na sede da associação",
                "Convites VIP para todos os eventos",
                "Relatório semestral de resultados",
                "Reunião trimestral com a diretoria",
              ]}
            />
            {/* Prata */}
            <TierCard
              nivel="Prata"
              badgeClass="bg-white/80 text-[#0C2418]"
              ringClass="ring-1 ring-white/28/40"
              benefits={[
                "Logo na página de patrocinadores",
                "Logo nos materiais dos eventos",
                "Menção bimestral nas redes sociais",
                "Banner na sede da associação",
                "Convites para os eventos",
                "Relatório anual de resultados",
              ]}
            />
            {/* Bronze */}
            <TierCard
              nivel="Bronze"
              badgeClass="bg-orange-700 text-orange-100"
              ringClass="ring-1 ring-orange-700/30"
              benefits={[
                "Logo na página de patrocinadores",
                "Menção trimestral nas redes sociais",
                "Logo nos eventos especiais",
                "Convite para eventos da associação",
              ]}
            />
            {/* Apoiador */}
            <TierCard
              nivel="Apoiador"
              badgeClass="bg-white/12 text-white/72"
              ringClass="ring-1 ring-white/12"
              benefits={[
                "Nome na página de apoiadores",
                "Menção nas redes sociais",
                "Convite para assembleia anual",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 7 — PARCEIROS ATUAIS
      ════════════════════════════════════════════════════════════════════════ */}
      {patrocinadores.length > 0 && (
        <section className="bg-[#0C2418] py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                Quem já apoia
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Nossos Parceiros
              </h2>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              {patrocinadores.map((p) => (
                <div
                  key={p.id}
                  className="group flex h-20 w-40 items-center justify-center rounded-xl border border-white/12 bg-[#123020]/60 p-4 transition-all hover:border-white/28"
                  title={p.nome}
                >
                  {p.logo_url ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={p.logo_url}
                        alt={`Logo ${p.nome}`}
                        fill
                        className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-xs font-medium text-white/45 transition-colors group-hover:text-white/72">
                      {p.nome}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          SLIDE 8 — CTA FINAL
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#123020] py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.35 0.12 18 / 0.06) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
            Próximo passo
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Vamos conversar?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/62">
            Entre em contato com nossa diretoria para discutir a melhor forma de parceria
            para sua empresa ou contribuição pessoal.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contato"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-8 text-sm font-semibold text-[#0C2418] shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 hover:shadow-red-500/30 active:scale-[0.98]"
            >
              Falar com a diretoria
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/seja-um-apoiador"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/18 px-8 text-sm font-medium text-white/72 transition-all hover:border-white/35 hover:text-white active:scale-[0.98]"
            >
              Ver planos detalhados
            </Link>
          </div>

          <p className="mt-10 text-xs text-white/30">
            GŌKAI – Associação Esportiva e Ambiental • Associação sem fins lucrativos
          </p>
        </div>
      </section>
    </>
  )
}

// ─── Tier Card Component ─────────────────────────────────────────────────────

function TierCard({
  nivel,
  badgeClass,
  ringClass,
  featured,
  benefits,
}: {
  nivel: string
  badgeClass: string
  ringClass: string
  featured?: boolean
  benefits: string[]
}) {
  return (
    <div
      className={`relative flex flex-col rounded-xl bg-[#0C2418]/50 p-6 ${ringClass} ${
        featured ? "lg:-mt-4 lg:mb-4 lg:shadow-lg lg:shadow-red-600/5" : ""
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-6">
          <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0C2418]">
            Recomendado
          </span>
        </div>
      )}

      <div className="mb-5 mt-1">
        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${badgeClass}`}>
          {nivel}
        </span>
      </div>

      <ul className="flex-1 space-y-2.5">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-white/62">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-white/45" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contato"
        className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
          featured
            ? "bg-red-600 text-[#0C2418] hover:bg-red-500"
            : "border border-white/18 text-white/72 hover:border-white/35 hover:text-white"
        }`}
      >
        Tenho interesse
      </Link>
    </div>
  )
}
