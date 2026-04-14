import Link from "next/link"
import { BrandContainer } from "@/components/branding/brand-container"
import { BrandLogo, BrandWordmark } from "@/components/branding/brand-logo"
import { Separator } from "@/components/ui/separator"
import { CONTACT_ADDRESS_DISPLAY, LEGAL_ENTITY_NAME } from "@/lib/site"

// ─── Navigation columns ────────────────────────────────────────────────────────

const navLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/modalidades", label: "Modalidades" },
  { href: "/professores", label: "Professores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/inscricao", label: "Inscreva-se" },
] as const

const legalLinks = [
  { href: "/contato", label: "Contato" },
  { href: "/governanca", label: "Governança" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
] as const

// ─── Component ─────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0C2418] text-white">
      <BrandContainer className="py-14">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="GŌKAI — Página inicial"
            >
              <BrandLogo variant="full" className="h-16 w-16 rounded-[22px]" sizes="64px" />
              <div className="flex flex-col gap-2">
                <BrandWordmark className="h-8 w-auto" sizes="180px" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  Associação Esportiva e Ambiental
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-white/78">
              Disciplina, honra, respeito e formação humana em uma associação séria de artes
              marciais.
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-white/54">
              {LEGAL_ENTITY_NAME ?? "GŌKAI – Associação Esportiva e Ambiental"}
            </p>
            {CONTACT_ADDRESS_DISPLAY && (
              <p className="max-w-sm whitespace-pre-line text-xs leading-relaxed text-white/46">
                {CONTACT_ADDRESS_DISPLAY}
              </p>
            )}
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              NAVEGAÇÃO
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé — navegação">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Institutional / Legal */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              INSTITUCIONAL
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé — institucional">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/46 sm:flex-row">
          <p>© 2026 GŌKAI – Associação Esportiva e Ambiental. Todos os direitos reservados.</p>
          <Link
            href="/privacidade"
            className="transition-colors hover:text-white"
          >
            Política de Privacidade
          </Link>
        </div>
      </BrandContainer>
    </footer>
  )
}
