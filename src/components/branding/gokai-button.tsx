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

type GokaiButtonProps = {
  tone?: GokaiButtonVariant
  className?: string
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<typeof Button>, "variant" | "className">)
)

export function GokaiButton({
  tone = "primary",
  className,
  href,
  children,
  ...props
}: GokaiButtonProps) {
  const classes = cn(
    "min-h-11 rounded-md px-6 py-3 text-sm font-semibold tracking-normal shadow-none transition-[color,background-color,border-color,transform,filter] duration-200",
    VARIANT_CLASS[tone],
    className
  )

  if (href) {
    return (
      <Link href={href} className={cn("inline-flex items-center justify-center gap-2", classes)} {...props as Omit<ComponentProps<typeof Link>, "href">}>
        {children}
      </Link>
    )
  }

  return (
    <Button className={classes} {...props as ComponentProps<typeof Button>}>
      {children}
    </Button>
  )
}
