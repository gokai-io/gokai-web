"use client"

import {
  Shield,
  Heart,
  TrendingUp,
  UsersRound,
  Award,
  Users,
  Trophy,
  Handshake,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Dumbbell,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { PitchDeck } from "@/components/marketing/pitch-deck"

export default function ProjetoPage() {
  return (
    <PitchDeck>
      {/* ── Slide 1: Capa ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Apresentação Institucional
        </p>
        <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-zinc-50 sm:text-7xl lg:text-8xl">
          GŌKAI
        </h1>
        <p className="mt-2 text-lg font-medium tracking-widest text-zinc-400 sm:text-xl">
          ASSOCIAÇÃO ESPORTIVA E AMBIENTAL
        </p>

        <div className="mx-auto my-10 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-zinc-700" aria-hidden />
          <span className="h-1 w-8 rounded-full bg-zinc-600" aria-hidden />
          <span className="h-px w-16 bg-zinc-700" aria-hidden />
        </div>

        <p className="mx-auto max-w-xl text-base font-medium italic leading-relaxed text-zinc-500">
          &ldquo;A disciplina constrói o caminho. A evolução é o destino.&rdquo;
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Formar atletas e cidadãos através das artes marciais.
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <ArrowDown className="size-4 animate-bounce" />
          <span>Role para explorar</span>
        </div>
      </div>

      {/* ── Slide 2: Quem Somos ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Quem Somos
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Mais do que uma associação.
              <br />
              Uma filosofia de vida.
            </h2>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-zinc-400">
              <p>
                O <strong className="text-zinc-200">GŌKAI</strong> é uma associação
                dedicada à prática e ao ensino das artes marciais, com foco na formação
                integral de seus atletas — técnica, disciplina, caráter e saúde.
              </p>
              <p>
                Fundada por praticantes apaixonados, une tradição e modernidade em um
                ambiente que promove o respeito, a superação pessoal e a excelência
                esportiva.
              </p>
              <p>
                Operamos como associação sem fins lucrativos, com governança transparente,
                conselho fiscal atuante e prestação de contas pública.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Disciplina", desc: "A base de toda evolução." },
              { icon: Heart, title: "Respeito", desc: "Ao mestre, ao adversário, a si." },
              { icon: TrendingUp, title: "Evolução", desc: "Buscar sempre a próxima versão." },
              { icon: UsersRound, title: "Inclusão", desc: "Esporte como transformação." },
            ].map((v) => (
              <div
                key={v.title}
                className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5 transition-colors hover:border-zinc-600"
              >
                <v.icon className="size-6 text-zinc-400" />
                <h3 className="text-sm font-semibold text-zinc-100">{v.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slide 3: Missão e Visão ───────────────────────────────── */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Propósito
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Missão &amp; Visão
        </h2>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 lg:p-10">
          <p className="text-lg font-medium italic leading-relaxed text-zinc-300">
            &ldquo;Formar atletas e cidadãos completos através das artes marciais,
            promovendo disciplina, saúde, respeito e desenvolvimento humano.&rdquo;
          </p>
          <div className="mx-auto my-6 h-px w-16 bg-zinc-700" />
          <p className="text-sm font-medium text-zinc-400">
            Nossa Missão
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Referência regional",
            "Excelência esportiva",
            "Formação integral",
            "Impacto social",
            "Transparência total",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
            >
              {pill}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-400">
          <strong className="text-zinc-200">Visão:</strong> Ser referência local e regional
          em formação esportiva e desenvolvimento humano através das artes marciais.
        </p>
      </div>

      {/* ── Slide 4: Governança ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Estrutura
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Governança sólida e transparente
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Diretoria Executiva",
              desc: "Presidente, Vice e três diretores eleitos em assembleia.",
            },
            {
              icon: CheckCircle2,
              title: "Conselho Fiscal",
              desc: "Órgão independente de fiscalização das finanças.",
            },
            {
              icon: TrendingUp,
              title: "Transparência Total",
              desc: "Atas, balanços e relatórios disponíveis publicamente.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                <item.icon className="size-5 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 5: Números ──────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.35 0.12 18 / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            O GŌKAI em números
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Impacto real, resultados concretos
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Alunos Ativos", icon: Users },
              { label: "Turmas", icon: Award },
              { label: "Modalidades", icon: Trophy },
              { label: "Professores", icon: Users },
              { label: "Eventos", icon: TrendingUp },
              { label: "Parceiros", icon: Handshake },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-center"
              >
                <stat.icon className="size-5 text-zinc-500" />
                <span className="text-3xl font-bold text-zinc-50">—</span>
                <span className="text-xs font-medium text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            Dados carregados em tempo real do sistema de gestão.
          </p>
        </div>
      </div>

      {/* ── Slide 6: CTA ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Explore
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Continue conhecendo o GŌKAI
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          Escolha o caminho mais relevante para você.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: Dumbbell,
              title: "Modalidades",
              desc: "Conheça nossas artes marciais e turmas.",
              href: "/modalidades",
            },
            {
              icon: UserPlus,
              title: "Participe",
              desc: "Seja atleta, voluntário ou apoiador.",
              href: "/apresentacao/participe",
            },
            {
              icon: Handshake,
              title: "Patrocine",
              desc: "Invista em quem transforma vidas.",
              href: "/apresentacao/patrocinador",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all hover:border-zinc-600 hover:bg-zinc-900"
            >
              <card.icon className="size-8 text-zinc-400 transition-colors group-hover:text-red-500" />
              <h3 className="text-lg font-semibold text-zinc-100">{card.title}</h3>
              <p className="text-sm text-zinc-500">{card.desc}</p>
              <ArrowRight className="size-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-400" />
            </Link>
          ))}
        </div>
      </div>
    </PitchDeck>
  )
}
