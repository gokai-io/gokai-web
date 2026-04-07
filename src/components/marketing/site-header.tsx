"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

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
  { href: "/transparencia", label: "Transparência" },
  { href: "/apresentacao", label: "Apresentação" },
  { href: "/contato", label: "Contato" },
] as const

// ─── Component ─────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          ? "bg-zinc-950/90 py-3 shadow-2xl shadow-black/40 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="GŌKAI — Página inicial"
        >
          <span className="font-heading text-2xl font-bold tracking-tight text-zinc-50 transition-colors group-hover:text-zinc-300">
            GŌKAI
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegação principal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-300 transition-all hover:border-zinc-400 hover:text-zinc-50"
          >
            <span className="relative z-10">Área Restrita</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 lg:hidden"
            aria-label="Abrir menu"
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 border-zinc-800 bg-zinc-950 text-zinc-100"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-xl font-bold tracking-wide text-zinc-100">
                GŌKAI
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-1 px-4" aria-label="Navegação mobile">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
                >
                  {label}
                </Link>
              ))}

              <div className="mt-4 border-t border-zinc-800 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-zinc-50"
                >
                  Área Restrita
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
