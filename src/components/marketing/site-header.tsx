"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, ArrowRight } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { BrandMark, BrandWordmark } from "@/components/branding/brand-logo"
import { GokaiButton } from "@/components/branding/gokai-button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// ─── Navigation links ──────────────────────────────────────────────────────────

const navLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/modalidades", label: "Modalidades" },
  { href: "/professores", label: "Professores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/apresentacao", label: "Apresentação" },
  { href: "/contato", label: "Contato" },
] as const

// ─── Component ─────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-primary/12 bg-[rgba(247,246,242,0.9)] py-3 shadow-[0_18px_48px_rgba(18,48,32,0.12)] backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <BrandContainer className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="GŌKAI — Página inicial"
        >
          <div
            className={cn(
              "rounded-2xl border p-1.5 shadow-[0_14px_28px_rgba(18,48,32,0.14)] transition-colors",
              scrolled
                ? "border-primary/12 bg-card"
                : "border-white/15 bg-white/10 backdrop-blur"
            )}
          >
            <BrandMark className="h-10 w-10 rounded-xl" priority sizes="40px" />
          </div>
          <div className="flex flex-col gap-1">
            <BrandWordmark
              className={cn(
                "h-7 w-auto transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
              priority
              sizes="160px"
            />
            <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em]", scrolled ? "text-primary/60" : "text-white/58")}>
              Associação Esportiva e Ambiental
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegação principal">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all",
                  scrolled
                    ? isActive
                      ? "bg-primary/10 text-primary"
                      : "text-primary/72 hover:bg-primary/6 hover:text-primary"
                    : isActive
                      ? "bg-white/14 text-white"
                      : "text-white/72 hover:bg-white/8 hover:text-white"
                )}
              >
                {label}
                {/* Active dot indicator */}
                {isActive && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                      scrolled ? "bg-secondary" : "bg-accent"
                    )}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <div className="flex items-center gap-3">
            <GokaiButton
              href="/inscricao"
              tone={scrolled ? "primary" : "secondary"}
              className="h-10 px-5 text-[11px] uppercase tracking-[0.18em]"
            >
              Associe-se
            </GokaiButton>
            <GokaiButton
              href="/login"
              tone="outline"
              className={cn(
                "h-10 px-5 text-[11px] uppercase tracking-[0.18em]",
                !scrolled && "border-white/20 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Área Restrita
            </GokaiButton>
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-2xl transition-colors lg:hidden",
              scrolled
                ? "bg-card text-primary shadow-[0_10px_24px_rgba(18,48,32,0.12)] hover:bg-primary/6"
                : "bg-white/10 text-white backdrop-blur hover:bg-white/18"
            )}
            aria-label="Abrir menu"
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-80 border-primary/12 bg-background text-foreground"
          >
            <SheetHeader className="px-4 pt-2">
              <SheetTitle className="text-left">
                <div className="flex items-center gap-3">
                  <BrandMark className="h-11 w-11 rounded-2xl" sizes="44px" />
                  <div className="flex flex-col gap-1">
                    <BrandWordmark className="h-7 w-auto text-foreground" sizes="150px" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/58">
                      Associação Esportiva e Ambiental
                    </span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-2 px-4" aria-label="Navegação mobile">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-border/80 bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/18 hover:bg-primary/6"
                >
                  {label}
                  <ArrowRight className="size-4 text-primary/48" />
                </Link>
              ))}

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border/80 pt-5">
                <GokaiButton
                  href="/inscricao"
                  tone="primary"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Associe-se
                </GokaiButton>
                <GokaiButton
                  href="/login"
                  tone="outline"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Área Restrita
                </GokaiButton>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </BrandContainer>
    </header>
  )
}
