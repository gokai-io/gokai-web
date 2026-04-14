import Link from "next/link"
import { BrandContainer } from "@/components/branding/brand-container"
import { BrandLogo } from "@/components/branding/brand-logo"
import { Separator } from "@/components/ui/separator"
import { CONTACT_ADDRESS_DISPLAY, LEGAL_ENTITY_NAME } from "@/lib/site"

const navLinks = [
  { href: "/sobre",         label: "Sobre" },
  { href: "/modalidades",   label: "Modalidades" },
  { href: "/professores",   label: "Professores" },
  { href: "/eventos",       label: "Eventos" },
  { href: "/conteudos",     label: "Conteúdos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/inscricao",     label: "Inscreva-se" },
] as const

const legalLinks = [
  { href: "/contato",     label: "Contato" },
  { href: "/governanca",  label: "Governança" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos",      label: "Termos de Uso" },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#071A0C] text-white">
      <BrandContainer className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* ── Coluna 1: Logo ── */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="GŌKAI — Página inicial">
              {/* Logo real em versão branca (filter invert) */}
              <BrandLogo
                className="h-16 w-auto"
                dark
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Disciplina, honra, respeito e formação humana em uma associação
              séria de artes marciais.
            </p>
            <p className="text-xs text-white/45">
              {LEGAL_ENTITY_NAME ?? "GŌKAI – Associação Esportiva e Ambiental"}
            </p>
            {CONTACT_ADDRESS_DISPLAY && (
              <p className="whitespace-pre-line text-xs text-white/38">
                {CONTACT_ADDRESS_DISPLAY}
              </p>
            )}
          </div>

          {/* ── Coluna 2: Navegação ── */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/38">
              Navegação
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé — navegação">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Coluna 3: Institucional ── */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/38">
              Institucional
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé — institucional">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/38 sm:flex-row">
          <p>© 2026 GŌKAI – Associação Esportiva e Ambiental. Todos os direitos reservados.</p>
          <Link href="/privacidade" className="transition-colors hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </BrandContainer>
    </footer>
  )
}
