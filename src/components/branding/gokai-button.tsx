import Link from "next/link"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GokaiButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent"

const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  primary: "bg-[var(--accent-red)] text-white hover:brightness-110 active:scale-[0.98]",
  secondary: "bg-[var(--surface-forest)] text-white hover:brightness-110 active:scale-[0.98]",
  outline:
    "border-2 border-[var(--surface-ink)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-ink)] hover:text-white active:scale-[0.98]",
  ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-ink)]/5",
  accent: "bg-[var(--accent-red)] text-white font-bold hover:brightness-110 active:scale-[0.98]",
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
    "rounded-md px-6 py-2.5 font-bold uppercase tracking-wider text-xs transition-all duration-200",
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
