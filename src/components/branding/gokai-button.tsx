import Link from "next/link"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GokaiButtonVariant = "primary" | "secondary" | "outline" | "ghost"

const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  // Brand green — clean, no artificial shadow
  primary:
    "bg-primary text-primary-foreground hover:bg-[#0d4a22] active:scale-[0.98]",

  // Brand red — clean, no artificial shadow
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-[#b82218] active:scale-[0.98]",

  // Outline — visible border, green tint on hover
  outline:
    "border-2 border-primary/35 bg-transparent text-primary hover:border-primary hover:bg-primary/6 active:scale-[0.98]",

  // Ghost — text only
  ghost:
    "bg-transparent text-foreground hover:bg-primary/8 hover:text-primary",
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
    "rounded-full px-5 font-semibold transition-all duration-200",
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
