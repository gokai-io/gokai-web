"use client"

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  Megaphone,
  Quote,
  Shield,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"
import { PitchDeck } from "@/components/marketing/pitch-deck"

export default function PatrocinadorPage() {
  return (
    <PitchDeck>
      {/* ── Slide 1: Capa ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Oportunidade de Parceria
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Invista em quem forma
          <br />
          <span className="text-red-500">atletas e cidadãos</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          O GŌKAI transforma vidas através das artes marciais. Sua marca pode fazer
          parte dessa história.
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <ArrowDown className="size-4 animate-bounce" />
          <span>Role para conhecer</span>
        </div>
      </div>

      {/* ── Slide 2: Por Que Apoiar ───────────────────────────────── */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Por Que Apoiar
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Razões para investir no GŌKAI
            </h2>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Eye,
                  title: "Visibilidade de marca",
                  desc: "Presença no site, materiais, redes sociais e eventos com alcance direto à comunidade.",
                },
                {
                  icon: Shield,
                  title: "Valores fortes",
                  desc: "Sua marca vinculada a disciplina, respeito e excelência esportiva.",
                },
                {
                  icon: Heart,
                  title: "Impacto social",
                  desc: "Formação de jovens e adultos através do esporte — saúde, cidadania e desenvolvimento.",
                },
                {
                  icon: Target,
                  title: "Transparência",
                  desc: "Relatórios de impacto, reuniões com a diretoria e prestação de contas real.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-400">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 lg:p-10">
              <Quote className="mb-4 size-8 text-zinc-600" />
              <blockquote className="text-lg font-medium leading-relaxed italic text-zinc-300">
                &ldquo;Apoiar o GŌKAI é investir em uma comunidade que transforma vidas pelo
                esporte. A seriedade e a transparência nos deram total confiança.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-400">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Parceiro GŌKAI</p>
                  <p className="text-xs text-zinc-500">Apoiador desde 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide 3: Alcance ──────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Alcance
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Quem você vai impactar
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
          Sua marca terá visibilidade direta com toda a comunidade GŌKAI.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { icon: Users, label: "Atletas e famílias", desc: "Presença constante no dia a dia" },
            { icon: Megaphone, label: "Redes sociais", desc: "Menções e conteúdo compartilhado" },
            { icon: Target, label: "Eventos e campeonatos", desc: "Logo nos materiais oficiais" },
            { icon: Eye, label: "Site institucional", desc: "Logo em destaque permanente" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-center"
            >
              <item.icon className="size-6 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-100">{item.label}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 4: Níveis de Parceria ───────────────────────────── */}
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Planos
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Níveis de Parceria
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              nivel: "Ouro",
              badgeClass: "bg-red-600 text-zinc-950",
              ringClass: "ring-2 ring-red-600/40",
              featured: true,
              benefits: [
                "Logo em destaque no site",
                "Material de divulgação",
                "Menção mensal nas redes",
                "Banner na sede",
                "Convites VIP",
                "Relatório semestral",
                "Reunião trimestral",
              ],
            },
            {
              nivel: "Prata",
              badgeClass: "bg-zinc-300 text-zinc-900",
              ringClass: "ring-1 ring-zinc-600/40",
              benefits: [
                "Logo na página de parceiros",
                "Logo nos eventos",
                "Menção bimestral",
                "Banner na sede",
                "Convites para eventos",
                "Relatório anual",
              ],
            },
            {
              nivel: "Bronze",
              badgeClass: "bg-orange-700 text-orange-100",
              ringClass: "ring-1 ring-orange-700/30",
              benefits: [
                "Logo na página de parceiros",
                "Menção trimestral",
                "Logo nos eventos especiais",
                "Convite para eventos",
              ],
            },
            {
              nivel: "Apoiador",
              badgeClass: "bg-zinc-700 text-zinc-300",
              ringClass: "ring-1 ring-zinc-700/40",
              benefits: [
                "Nome na página",
                "Menção nas redes",
                "Convite para assembleia",
              ],
            },
          ].map((tier) => (
            <div
              key={tier.nivel}
              className={`relative flex flex-col rounded-xl bg-zinc-950/50 p-5 ${tier.ringClass} ${
                tier.featured ? "lg:-mt-2 lg:mb-2 lg:shadow-lg lg:shadow-red-600/5" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-5">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-950">
                    Recomendado
                  </span>
                </div>
              )}
              <div className="mb-4 mt-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${tier.badgeClass}`}
                >
                  {tier.nivel}
                </span>
              </div>
              <ul className="flex-1 space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-zinc-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 5: Como Funciona ────────────────────────────────── */}
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Processo
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Como funciona a parceria
          </h2>
        </div>

        <div className="mt-12 space-y-0">
          {[
            { step: "01", title: "Contato inicial", desc: "Fale com nossa diretoria pelo site ou redes sociais." },
            { step: "02", title: "Reunião de alinhamento", desc: "Apresentamos os níveis e definimos a melhor opção." },
            { step: "03", title: "Formalização", desc: "Contrato transparente com benefícios e prazos claros." },
            { step: "04", title: "Ativação", desc: "Sua marca integrada em todos os canais do GŌKAI." },
            { step: "05", title: "Acompanhamento", desc: "Relatórios periódicos e reuniões de resultado." },
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

      {/* ── Slide 6: CTA ──────────────────────────────────────────── */}
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
            Vamos conversar?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Entre em contato com nossa diretoria para discutir a melhor forma de parceria
            para sua empresa.
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
              href="/apresentacao"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-8 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-50 active:scale-[0.98]"
            >
              Voltar à apresentação
            </Link>
          </div>

          <p className="mt-10 text-xs text-zinc-600">
            GŌKAI – Associação Esportiva e Ambiental
          </p>
        </div>
      </div>
    </PitchDeck>
  )
}
