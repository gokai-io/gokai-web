import Link from "next/link"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GokaiButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent"

const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  primary: "bg-[var(--accent-carmine)] text-[var(--text-ivory)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-[var(--surface-obsidian)] text-[var(--text-ivory)] border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/40 active:scale-[0.98]",
  outline:
    "border border-[var(--accent-gold)] bg-transparent text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/5 active:scale-[0.98]",
  ghost: "bg-transparent text-[var(--text-ivory)] hover:bg-white/5",
  accent: "bg-[var(--accent-carmine)] text-[var(--text-ivory)] font-extrabold hover:brightness-110 active:scale-[0.98]",
}

interface GokaiButtonProps extends Omit<ComponentProps<typeof Button>, "variant"> {
  tone?: GokaiButtonVariant
  href?: string
}

export function GokaiButton({
  tone = "primary",
  className,
  href,
  children,
  ...props
}: GokaiButtonProps) {
  const classes = cn(
    "rounded-[0.25rem] px-6 py-2.5 font-extrabold uppercase tracking-[0.2em] text-[11px] transition-all duration-300",
    VARIANT_CLASS[tone],
    className
  )

  if (href) {
    return (
      <Button render={<Link href={href} />} className={classes} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <Button className={classes} {...props}>
      {children}
    </Button>
  )
}
