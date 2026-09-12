"use client"

import { useState, useEffect, useRef } from "react"
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
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (!mobileOpen) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener("keydown", onEscape)
    return () => document.removeEventListener("keydown", onEscape)
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-200",
          scrolled
            ? "bg-[rgba(8,16,13,0.72)] backdrop-blur-xl border-b border-[var(--accent-gold)]/12 py-3"
            : "bg-[var(--surface-midnight)]/95 py-4"
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
              className="h-[52px] w-auto"
              dark
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
                    "group relative text-[13px] font-medium transition-colors duration-400",
                    // Underline via pseudo — grows on hover
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full",
                    "after:origin-left after:scale-x-0 after:transition-transform after:duration-400",
                    isActive
                      ? "text-[var(--text-ivory)] after:bg-[var(--accent-gold)] after:scale-x-100"
                      : "text-[var(--text-ivory)]/80 hover:text-[var(--accent-gold)] hover:after:scale-x-100 after:bg-[var(--accent-gold)]"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <GokaiButton
              href="/inscricao"
              tone="primary"
              className="h-9 px-5 text-[13px]"
            >
              Associe-se
            </GokaiButton>
            <GokaiButton
              href="/login"
              tone="outline"
              className="h-9 px-4 text-[13px]"
            >
              Área Restrita
            </GokaiButton>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            ref={menuButton}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg text-[var(--text-ivory)] transition-colors hover:bg-[var(--accent-gold)]/10 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
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
        id="mobile-navigation"
        inert={!mobileOpen}
        className={cn(
          "fixed inset-x-0 top-0 z-40 max-h-[100dvh] overflow-y-auto border-b border-white/10 bg-[var(--surface-midnight)] pt-24 pb-8 transition-[opacity,transform,visibility] duration-200 lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <BrandContainer>
          <nav className="flex flex-col gap-1" aria-label="Navegação mobile" onClick={() => setMobileOpen(false)}>
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "py-3 text-lg font-medium border-b border-[var(--accent-gold)]/12 transition-colors duration-400",
                    isActive ? "text-[var(--text-ivory)]" : "text-[var(--text-ivory)]/80 hover:text-[var(--accent-gold)]"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-8 flex flex-col gap-3" onClick={() => setMobileOpen(false)}>
            <GokaiButton href="/inscricao" tone="primary" className="w-full justify-center">
              Associe-se
            </GokaiButton>
            <GokaiButton href="/login" tone="outline" className="w-full justify-center">
              Área Restrita
            </GokaiButton>
          </div>
        </BrandContainer>
      </div>
    </>
  )
}
