/**
 * GŌKAI Brand Logo — usa a imagem PNG oficial com fundo transparente.
 *
 * gokai_logo_transparent.png (588×508) — logo completa (marca + wordmark).
 *
 * Exports:
 *   BrandLogo       — logo completa (PNG oficial), adaptável para fundo claro e escuro
 *   BrandMark       — apenas o emblema circular (SVG, para ícones pequenos)
 *   BrandWordmark   — apenas o texto wordmark (SVG, adaptável por cor)
 */

import Image from "next/image"
import { cn } from "@/lib/utils"
import { GokaiMarkSvg, GokaiWordmarkSvg } from "./brand-svg"

// ─── Logo completa (PNG oficial) ───────────────────────────────────────────────

interface BrandLogoProps {
  className?: string
  /**
   * dark=true → aplica filter brightness(0) invert(1), tornando tudo branco.
   * Use em fundos escuros (hero verde, footer, mobile menu).
   */
  dark?: boolean
  priority?: boolean
  /** No-op legacy — kept for call-site compat */
  variant?: string
  /** No-op legacy */
  sizes?: string
}

/**
 * BrandLogo — logo completa GŌKAI (samurai + sol + folha + "GŌKAI").
 *
 * Usa a imagem PNG oficial com fundo transparente.
 * Em fundos escuros, use dark={true} para versão branca.
 *
 * @example
 *   // Fundo claro (header scrollado, seções off-white)
 *   <BrandLogo className="h-12 w-auto" />
 *
 *   // Fundo escuro (hero verde, footer)
 *   <BrandLogo className="h-14 w-auto" dark />
 */
export function BrandLogo({
  className,
  dark = false,
  priority = false,
  variant: _variant,
  sizes: _sizes,
}: BrandLogoProps) {
  return (
    <Image
      src="/assets/branding/gokai_logo_transparent.png"
      alt="GŌKAI — Associação Esportiva e Ambiental"
      // Dimensões originais 588×508 — Next.js calcula o aspect ratio
      width={588}
      height={508}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={dark ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  )
}

// ─── Marca circular (SVG — escala perfeita em ícones pequenos) ─────────────────

/**
 * BrandMark — apenas o emblema circular (samurai + sol + folha).
 * Usa SVG para perfeita nitidez em contextos de ícone (section headers, etc.).
 * Dimensione via className: h-9 w-9, h-10 w-10, etc.
 */
export function BrandMark({
  className,
  priority: _p,
  sizes: _s,
}: Omit<BrandLogoProps, "variant" | "dark">) {
  return <GokaiMarkSvg className={cn("block", className)} />
}

// ─── Wordmark de texto (SVG — cor via currentColor) ────────────────────────────

/**
 * BrandWordmark — "GŌKAI" em Outfit 700.
 * Cor via CSS `color` / Tailwind `text-*` no elemento ou no pai.
 */
export function BrandWordmark({
  className,
  priority: _p,
  sizes: _s,
}: Omit<BrandLogoProps, "variant" | "dark">) {
  return <GokaiWordmarkSvg className={className} />
}
