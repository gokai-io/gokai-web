/**
 * GŌKAI Brand Logo — unified export
 *
 * Renders the brand identity using inline SVG components (no external images,
 * no broken references). All sizing is controlled via Tailwind classes.
 *
 * Exports:
 *   BrandLogo       — flexible: "full"/"mark" = emblem, "wordmark" = text
 *   BrandMark       — circular emblem only
 *   BrandWordmark   — "GŌKAI" text wordmark (currentColor → set via text-* class)
 */

import { cn } from "@/lib/utils"
import { GokaiMarkSvg, GokaiWordmarkSvg } from "./brand-svg"

// ─── Types ─────────────────────────────────────────────────────────────────────

type LogoVariant = "full" | "full-light" | "mark" | "wordmark"

interface BrandLogoProps {
  /** Which asset variant to display */
  variant?: LogoVariant
  className?: string
  /** No-op — kept for call-site compatibility. Inline SVGs need no preloading. */
  priority?: boolean
  /** No-op — kept for call-site compatibility. Inline SVGs have no sizes hint. */
  sizes?: string
}

// ─── BrandLogo ─────────────────────────────────────────────────────────────────

/**
 * Unified brand logo component.
 *
 * - "full" / "full-light" / "mark"  → circular emblem SVG
 * - "wordmark"                       → "GŌKAI" text (inherits parent CSS color)
 */
export function BrandLogo({
  variant = "full",
  className,
  priority: _priority,
  sizes: _sizes,
}: BrandLogoProps) {
  if (variant === "wordmark") {
    return <GokaiWordmarkSvg className={className} />
  }

  // "full", "full-light", "mark" → all render the circular emblem
  return <GokaiMarkSvg className={cn("block", className)} />
}

// ─── Convenience exports ────────────────────────────────────────────────────────

/** Circular emblem — use for square icon contexts (headers, cards, favicons) */
export function BrandMark({
  className,
  priority: _p,
  sizes: _s,
}: Omit<BrandLogoProps, "variant">) {
  return <GokaiMarkSvg className={cn("block", className)} />
}

/**
 * Text wordmark — "GŌKAI" rendered via inline SVG.
 * Color follows the CSS `color` / Tailwind `text-*` set on this element or a parent.
 *
 * Common usage:
 *   Light bg:  <BrandWordmark className="h-7 w-auto text-foreground" />
 *   Dark bg:   <BrandWordmark className="h-7 w-auto text-white" />
 */
export function BrandWordmark({
  className,
  priority: _p,
  sizes: _s,
}: Omit<BrandLogoProps, "variant">) {
  return <GokaiWordmarkSvg className={className} />
}
