import Link from "next/link"
import { Separator } from "@/components/ui/separator"

// ─── Navigation columns ────────────────────────────────────────────────────────

const footerLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/modalidades", label: "Modalidades" },
  { href: "/professores", label: "Professores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/transparencia", label: "Transparência" },
] as const

// ─── Component ─────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="GŌKAI — Página inicial"
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-zinc-50 transition-colors group-hover:text-zinc-300">
                GŌKAI
              </span>
            </Link>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-zinc-400">
              A disciplina constrói o caminho. A evolução é o destino.
            </p>
          </div>

          {/* Column 2 — Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              NAVEGAÇÃO
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-50"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              CONTATO
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              {/* TODO: Replace with real contact data */}
              <li>
                <a
                  href="mailto:contato@gokai.com.br"
                  className="transition-colors hover:text-zinc-200"
                >
                  contato@gokai.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="transition-colors hover:text-zinc-200"
                >
                  (11) 99999-9999
                </a>
              </li>
              {/* TODO: Replace with real address */}
              <li className="text-zinc-500">
                Rua das Artes Marciais, 123
                <br />
                São Paulo – SP, 01234-000
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>© 2025 GŌKAI – Associação Esportiva e Ambiental. Todos os direitos reservados.</p>
          <Link
            href="/privacidade"
            className="transition-colors hover:text-zinc-200"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  )
}
