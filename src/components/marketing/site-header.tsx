"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, X } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { BrandLogo } from "@/components/branding/brand-logo"
import { GokaiButton } from "@/components/branding/gokai-button"
import { cn } from "@/lib/utils"

// ─── Navigation ────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/sobre",         label: "Sobre" },
  { href: "/modalidades",   label: "Modalidades" },
  { href: "/professores",   label: "Professores" },
  { href: "/eventos",       label: "Eventos" },
  { href: "/conteudos",     label: "Conteúdos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/contato",       label: "Contato" },
] as const

// ─── Component ─────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-400",
          scrolled
            ? "border-b border-border bg-white py-3"
            : "bg-transparent py-5"
        )}
      >
        <BrandContainer className="flex items-center justify-between gap-8">

          {/* ── Logo — PNG oficial, com/sem filtro conforme fundo ── */}
          <Link
            href="/"
            className="flex flex-none items-center"
            aria-label="GŌKAI — página inicial"
          >
            <BrandLogo
              className="h-[52px] w-auto transition-all duration-300"
              dark={!scrolled}
              priority
            />
          </Link>

          {/* ── Desktop navigation — clean text links ── */}
          <nav
            className="hidden flex-1 items-center justify-center gap-7 lg:flex"
            aria-label="Navegação principal"
          >
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative text-[13px] font-medium transition-colors duration-200",
                    // Underline via pseudo — grows on hover
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full",
                    "after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
                    isActive
                      ? scrolled
                        ? "text-foreground after:bg-foreground after:scale-x-100"
                        : "text-white after:bg-white after:scale-x-100"
                      : scrolled
                        ? "text-foreground/80 hover:text-foreground after:bg-foreground hover:after:scale-x-100"
                        : "text-white/80 hover:text-white after:bg-white hover:after:scale-x-100"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <GokaiButton
              href="/inscricao"
              tone="primary"
              className={cn(
                "h-9 px-5 text-[13px]",
                // On dark hero: off-white button = max contrast
                !scrolled && "bg-surface-light text-primary hover:bg-white border-0"
              )}
            >
              Associe-se
            </GokaiButton>
            <GokaiButton
              href="/login"
              tone="outline"
              className={cn(
                "h-9 px-4 text-[13px]",
                !scrolled && "border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
              )}
            >
              Área Restrita
            </GokaiButton>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={cn(
              "inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg transition-colors lg:hidden",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X className="size-5" />
              : <MenuIcon className="size-5" />
            }
          </button>

        </BrandContainer>
      </header>

      {/* ── Mobile menu — full-width dropdown ── */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-surface-dark pt-20 pb-8 transition-all duration-300 lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <BrandContainer>
          <nav className="flex flex-col gap-1" aria-label="Navegação mobile">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "py-3 text-lg font-medium border-b border-white/10 transition-colors",
                    isActive ? "text-white" : "text-white/85 hover:text-white"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <GokaiButton href="/inscricao" tone="secondary" className="w-full justify-center">
              Associe-se
            </GokaiButton>
            <GokaiButton href="/login" tone="outline" className="w-full justify-center border-white/40 text-white">
              Área Restrita
            </GokaiButton>
          </div>
        </BrandContainer>
      </div>
    </>
  )
}
