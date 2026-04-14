import Link from "next/link"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GokaiButtonVariant = "primary" | "secondary" | "outline" | "ghost"

const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_18px_40px_rgba(11,90,43,0.22)] hover:bg-[#124c29]",
  secondary:
    "bg-secondary text-secondary-foreground shadow-[0_18px_40px_rgba(207,46,36,0.18)] hover:bg-[#b8271d]",
  outline:
    "border border-primary/20 bg-transparent text-primary hover:bg-primary/6 hover:text-primary",
  ghost:
    "bg-transparent text-foreground hover:bg-primary/6 hover:text-primary",
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
  const classes = cn("rounded-full px-5 font-semibold", VARIANT_CLASS[tone], className)

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
