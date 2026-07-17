"use client"

import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Eye,
  Handshake,
  Heart,
  Leaf,
  MapPin,
  Shield,
  Sprout,
  Trophy,
  TrendingUp,
  Users,
  UsersRound,
} from "lucide-react"
import Link from "next/link"
import { PitchDeck } from "@/components/marketing/pitch-deck"
import type { Stats } from "@/lib/queries/apresentacao"

const MODALIDADES_FALLBACK = [
  "Jiu-Jitsu",
  "Judô",
  "Boxe",
  "Xadrez",
  "Defesa Pessoal Feminina",
]

interface MrsDeckProps {
  stats: Stats
  modalidades: string[]
}

export function MrsDeck({ stats, modalidades }: MrsDeckProps) {
  const modalidadesList = modalidades.length > 0 ? modalidades : MODALIDADES_FALLBACK

  return (
    <PitchDeck>
      {/* ── Slide 1: Capa ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Proposta de Patrocínio &bull; MRS
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

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
          Esporte, educação e meio ambiente em Juiz de Fora/MG —
          <br className="hidden sm:block" />
          no coração do território atendido pela malha da MRS.
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <ArrowDown className="size-4 animate-bounce" />
          <span>Role para explorar</span>
        </div>
      </div>

      {/* ── Slide 2: Quem Somos ───────────────────────────────────── */}
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Quem Somos
        </p>
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Esporte como ferramenta
          <br />
          de <span className="text-red-500">transformação social</span>
        </h2>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
          <p>
            A <strong className="text-zinc-200">GŌKAI</strong> é uma associação civil sem
            fins lucrativos fundada em 2026, em Juiz de Fora/MG, dedicada à promoção das
            artes marciais, esportes de combate e ações socioeducativas, culturais e
            ambientais.
          </p>
          <p>
            Atendemos crianças, jovens e adultos de todas as idades, sem qualquer
            discriminação de origem, gênero ou condição socioeconômica, priorizando o
            acesso de jovens em situação de vulnerabilidade.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {modalidadesList.map((m) => (
            <span
              key={m}
              className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ── Slide 3: Alinhamento com as linhas da MRS ─────────────── */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Alinhamento
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Três linhas de atuação da MRS,
            <br />
            <span className="text-red-500">um só projeto</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            A GŌKAI atua diretamente em três das linhas priorizadas pela MRS em seus
            patrocínios incentivados.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: Trophy,
              title: "Esporte, Saúde e Bem-estar",
              desc: "Prática regular de artes marciais e esportes de combate para crianças, jovens e adultos, com acompanhamento técnico qualificado.",
            },
            {
              icon: BookOpen,
              title: "Educação e Cultura",
              desc: "Ações socioeducativas e culturais integradas ao treino — formação de cidadãos, não apenas de atletas.",
            },
            {
              icon: Leaf,
              title: "Meio Ambiente",
              desc: "Ações ambientais fazem parte da identidade da associação, unindo esporte e consciência ecológica.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 ring-1 ring-red-600/20"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800">
                <item.icon className="size-5 text-red-500" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 4: Território ───────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Território
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Juiz de Fora/MG — território de interface da ferrovia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Nossos dois polos ficam em Juiz de Fora, município atendido pela malha da MRS —
            atendendo ao critério de elegibilidade territorial dos patrocínios incentivados.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
            <MapPin className="mt-0.5 size-5 shrink-0 text-red-500" />
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Polo São Mateus — Sede</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Rua Melo Franco, 68 — Bairro São Mateus, Juiz de Fora/MG
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Espaço principal da associação, com estrutura completa para a prática das
                modalidades.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
            <MapPin className="mt-0.5 size-5 shrink-0 text-red-500" />
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Polo Linhares</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Rua Roberto Hargreaves, 64 — Bairro Linhares, Juiz de Fora/MG
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Unidade de expansão da GŌKAI, com atividades voltadas à comunidade local.
              </p>
            </div>
          </div>
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
              { value: stats.alunos || "—", label: "Alunos Ativos", icon: Users },
              { value: stats.turmas || "—", label: "Turmas", icon: Award },
              { value: stats.modalidades || "—", label: "Modalidades", icon: Trophy },
              { value: stats.professores || "—", label: "Professores", icon: Users },
              { value: stats.eventos || "—", label: "Eventos", icon: TrendingUp },
              { value: stats.patrocinadores || "—", label: "Parceiros", icon: Handshake },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-center"
              >
                <stat.icon className="size-5 text-zinc-500" />
                <span className="text-3xl font-bold text-zinc-50">{stat.value}</span>
                <span className="text-xs font-medium text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            Dados carregados em tempo real do sistema de gestão.
          </p>
        </div>
      </div>

      {/* ── Slide 6: Impacto ──────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Impacto
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Impacto social e ambiental
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              icon: UsersRound,
              title: "Inclusão social",
              desc: "Atendimento a crianças, jovens e adultos sem discriminação de origem, gênero ou condição socioeconômica.",
            },
            {
              icon: Heart,
              title: "Acesso prioritário",
              desc: "Prioridade de acesso a jovens em situação de vulnerabilidade social.",
            },
            {
              icon: Leaf,
              title: "Ações ambientais",
              desc: "Ações socioeducativas, culturais e ambientais integradas ao trabalho esportivo da associação.",
            },
            {
              icon: Sprout,
              title: "Formação integral",
              desc: "Formar pessoas completas — corpo, mente e caráter — para a vida.",
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
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 7: Governança ───────────────────────────────────── */}
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Credibilidade
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Governança sólida, documentação em ordem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Estrutura institucional formal e prestação de contas pública — a base para uma
            parceria incentivada segura.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Diretoria Executiva",
              desc: "Eleita em Assembleia Geral, com mandato de 3 anos.",
            },
            {
              icon: CheckCircle2,
              title: "Conselho Fiscal",
              desc: "Órgão independente de fiscalização das finanças e operações.",
            },
            {
              icon: Eye,
              title: "Documentos públicos",
              desc: "Estatuto, Regimento, Atas e balanços disponíveis na página de Transparência.",
            },
            {
              icon: Award,
              title: "Equipe técnica",
              desc: "Professores qualificados e registrados em federações.",
            },
            {
              icon: Users,
              title: "Gestão digital",
              desc: "Sistema de matrícula, frequência e acompanhamento de cada atleta.",
            },
            {
              icon: Trophy,
              title: "Eventos e campeonatos",
              desc: "Calendário anual de eventos, seminários e atividades sociais.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5"
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

      {/* ── Slide 8: Caminho do patrocínio ────────────────────────── */}
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Como viabilizar
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Patrocínio via leis de incentivo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Seguindo o guia de solicitação de patrocínio incentivado da MRS.
          </p>
        </div>

        <div className="mt-12 space-y-0">
          {[
            {
              step: "01",
              title: "Enquadramento",
              desc: "Projeto esportivo e socioambiental alinhado às linhas de atuação priorizadas pela MRS.",
            },
            {
              step: "02",
              title: "Elegibilidade territorial",
              desc: "Execução em Juiz de Fora/MG, município atendido pela malha da MRS.",
            },
            {
              step: "03",
              title: "Documentação",
              desc: "Apresentação comercial, plano de trabalho e documentação institucional organizada e pública.",
            },
            {
              step: "04",
              title: "Submissão",
              desc: "Envio da proposta pelo canal oficial da MRS, dentro do prazo anual de 30 de julho.",
            },
            {
              step: "05",
              title: "Execução e prestação de contas",
              desc: "Relatórios de impacto e transparência total durante toda a vigência do patrocínio.",
            },
          ].map((item, i) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-bold text-zinc-300">
                  {item.step}
                </div>
                {i < 4 && <div className="h-full w-px bg-zinc-800" />}
              </div>
              <div className="pb-8">
                <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 9: CTA ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.35 0.12 18 / 0.06) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Próximo passo
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            MRS + GŌKAI:
            <br />
            transformação no território da ferrovia
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Vamos conversar sobre como o patrocínio incentivado da MRS pode ampliar o
            impacto do esporte em Juiz de Fora.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contato"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-8 text-sm font-semibold text-zinc-950 shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 hover:shadow-red-500/30 active:scale-[0.98]"
            >
              Falar com a diretoria
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/transparencia"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-8 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-50 active:scale-[0.98]"
            >
              Ver documentos institucionais
            </Link>
          </div>

          <p className="mt-10 text-xs text-zinc-600">
            GŌKAI – Associação Esportiva e Ambiental &bull; Juiz de Fora/MG
          </p>
        </div>
      </div>
    </PitchDeck>
  )
}
