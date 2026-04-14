import { cn } from "@/lib/utils"

interface InstitutionalCardProps extends React.ComponentProps<"div"> {
  accent?: "green" | "red" | "neutral" | "none"
  dark?: boolean
}

// Top accent bar color per variant
const ACCENT_BAR: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "before:bg-[var(--surface-forest)]",
  red:     "before:bg-[var(--accent-red)]",
  neutral: "before:bg-[var(--accent-bronze)]",
  none:    "",
}

// Border glow on hover per variant
const ACCENT_HOVER: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "hover:border-[var(--surface-forest)]/40",
  red:     "hover:border-[var(--accent-red)]/40",
  neutral: "hover:border-[var(--accent-bronze)]/50",
  none:    "hover:border-foreground/20",
}

/**
 * InstitutionalCard — primary surface for the GŌKAI marketing site.
 *
 * Adaptive card using the "Pergaminho e Nanquim" palette.
 * Uses 1px borders instead of heavy shadows for a more rigid, traditional feel.
 *
 * Accents: green | red | neutral | none
 */
export function InstitutionalCard({
  className,
  accent = "green",
  dark = false,
  children,
  ...props
}: InstitutionalCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md p-6",
        // Surface — white for light sections, surface-ink for dark sections
        dark
          ? "bg-[var(--surface-ink)] border border-white/8"
          : "bg-white border border-[var(--accent-bronze)]/20 shadow-sm",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        accent !== "none" ? ACCENT_HOVER[accent] : ACCENT_HOVER.none,
        accent !== "none" && [
          "before:absolute before:left-6 before:top-0",
          "before:h-[3px] before:w-20",
          ACCENT_BAR[accent],
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
