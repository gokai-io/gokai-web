import Link from "next/link"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GokaiButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent"

const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]",

  secondary:
    "bg-secondary text-secondary-foreground hover:brightness-110 active:scale-[0.98]",

  outline:
    "border-2 border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/6 active:scale-[0.98]",

  ghost:
    "bg-transparent text-foreground hover:bg-primary/8 hover:text-primary",

  // Red — for CTAs on dark sections
  accent:
    "bg-secondary text-white font-bold hover:brightness-110 active:scale-[0.98]",
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
