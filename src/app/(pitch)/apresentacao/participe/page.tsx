"use client"

import {
  ArrowDown,
  ArrowRight,
  Dumbbell,
  HandHelping,
  Heart,
  Mail,
  Medal,
  Shield,
  Star,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react"
import Link from "next/link"
import { PitchDeck } from "@/components/marketing/pitch-deck"

export default function ParticipePage() {
  return (
    <PitchDeck>
      {/* ── Slide 1: Capa ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Faça Parte
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Sua jornada
          <br />
          <span className="text-red-500">começa aqui</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Existem muitas formas de fazer parte do GŌKAI. Encontre a que melhor combina
          com você.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Dumbbell, title: "Atleta", desc: "Treine e evolua com a gente" },
            { icon: HandHelping, title: "Voluntário", desc: "Contribua com seu tempo e talento" },
            { icon: Heart, title: "Apoiador", desc: "Apoie financeiramente" },
          ].map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-600"
            >
              <card.icon className="size-7 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-100">{card.title}</h3>
              <p className="text-xs text-zinc-500">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <ArrowDown className="size-4 animate-bounce" />
          <span>Conheça cada caminho</span>
        </div>
      </div>

      {/* ── Slide 2: Para Atletas ─────────────────────────────────── */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Para Atletas
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Treine com quem leva o esporte a sério
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              O GŌKAI oferece treinamento de qualidade em diversas modalidades de artes
              marciais, com professores qualificados e infraestrutura adequada.
            </p>

            <div className="mt-8">
              <Link
                href="/inscricao"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-zinc-950 transition-all hover:bg-red-500 active:scale-[0.98]"
              >
                Quero me inscrever
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Medal, title: "Professores registrados", desc: "Instrutores com formação e credenciamento." },
              { icon: Trophy, title: "Competições", desc: "Calendário anual de campeonatos." },
              { icon: Users, title: "Turmas por nível", desc: "Iniciantes a avançados em todas as idades." },
              { icon: Star, title: "Formação integral", desc: "Técnica, disciplina, caráter e saúde." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5"
              >
                <item.icon className="size-5 text-zinc-400" />
                <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slide 3: Para Voluntários ─────────────────────────────── */}
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Para Voluntários
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Contribua com seu tempo e talento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
          O GŌKAI conta com voluntários em diversas áreas. Sua experiência pode fazer
          a diferença.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { title: "Eventos", desc: "Organização e logística de campeonatos e seminários." },
            { title: "Comunicação", desc: "Redes sociais, fotografia e design." },
            { title: "Administrativo", desc: "Suporte à gestão e documentação." },
            { title: "Social", desc: "Ações comunitárias e projetos de inclusão." },
          ].map((area) => (
            <div
              key={area.title}
              className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{area.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/contato"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-50 active:scale-[0.98]"
          >
            <Mail className="size-4" />
            Quero ser voluntário
          </Link>
        </div>
      </div>

      {/* ── Slide 4: Para Apoiadores ──────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Para Apoiadores
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Apoie individualmente o projeto
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
          Pessoas físicas também podem contribuir com a sustentabilidade da associação
          e receber reconhecimento por isso.
        </p>

        <div className="mx-auto mt-12 max-w-md rounded-xl border border-zinc-700/40 bg-zinc-900/50 p-8 ring-1 ring-zinc-700/40">
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-zinc-700 px-3 py-1 text-sm font-bold text-zinc-300">
              Apoiador Individual
            </span>
          </div>
          <ul className="space-y-3 text-left">
            {[
              "Nome na página de apoiadores",
              "Menção nas redes sociais",
              "Convite para assembleia anual",
              "Acompanhamento do impacto social",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-zinc-400">
                <Shield className="mt-0.5 size-3.5 shrink-0 text-zinc-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contato"
            className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-zinc-950 transition-all hover:bg-red-500 active:scale-[0.98]"
          >
            Quero apoiar
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* ── Slide 5: CTA Final ────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.35 0.12 18 / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Escolha seu caminho
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Faça parte do GŌKAI
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: UserPlus,
                title: "Inscrição",
                desc: "Matricule-se como atleta.",
                href: "/inscricao",
                primary: true,
              },
              {
                icon: HandHelping,
                title: "Voluntariado",
                desc: "Ajude como voluntário.",
                href: "/contato",
              },
              {
                icon: Heart,
                title: "Apoio",
                desc: "Contribua financeiramente.",
                href: "/seja-um-apoiador",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group flex flex-col items-center gap-4 rounded-xl border p-8 transition-all ${
                  card.primary
                    ? "border-red-600/40 bg-red-600/5 hover:border-red-500/60 hover:bg-red-600/10"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
                }`}
              >
                <card.icon
                  className={`size-8 transition-colors ${
                    card.primary
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-zinc-400 group-hover:text-zinc-300"
                  }`}
                />
                <h3 className="text-lg font-semibold text-zinc-100">{card.title}</h3>
                <p className="text-sm text-zinc-500">{card.desc}</p>
                <ArrowRight className="size-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-400" />
              </Link>
            ))}
          </div>

          <p className="mt-10 text-xs text-zinc-600">
            GŌKAI – Associação Esportiva e Ambiental
          </p>
        </div>
      </div>
    </PitchDeck>
  )
}
