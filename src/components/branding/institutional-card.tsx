import { cn } from "@/lib/utils"

interface InstitutionalCardProps extends React.ComponentProps<"div"> {
  accent?: "green" | "red" | "neutral" | "none"
}

// Accent bar CSS class per variant
const ACCENT_BAR: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "before:bg-primary",
  red:     "before:bg-secondary",
  neutral: "before:bg-accent",
  none:    "",
}

// Hover border tint per variant — visible when the card is hovered
const ACCENT_HOVER: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "hover:border-primary/30",
  red:     "hover:border-secondary/30",
  neutral: "hover:border-accent/40",
  none:    "",
}

/**
 * InstitutionalCard — primary surface for the GŌKAI marketing site.
 *
 * A white/card surface with:
 * - A 3px coloured accent bar clipped at the top-left edge
 * - Subtle shadow and border
 * - Hover: shadow lift + matching border-color tint
 *
 * Accent: green (institutional) | red (energy/CTA) | neutral (lime) | none
 */
export function InstitutionalCard({
  className,
  accent = "green",
  children,
  ...props
}: InstitutionalCardProps) {
  return (
    <div
      className={cn(
        // Shape & layout
        "relative overflow-hidden rounded-[26px] p-6",
        // Surface
        "border border-border/70 bg-card/96",
        // Depth
        "shadow-[0_16px_44px_rgba(18,48,32,0.07)]",
        // Transitions — shadow lift + border colour on hover
        "transition-[box-shadow,border-color] duration-300",
        "hover:shadow-[0_24px_60px_rgba(18,48,32,0.13)]",
        // Per-accent hover border
        accent !== "none" && ACCENT_HOVER[accent],
        // Accent bar pseudo — 3px wide, top-left, rounded-bottom
        accent !== "none" && [
          "before:absolute before:left-6 before:top-0",
          "before:h-[3px] before:w-16 before:rounded-b-full",
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
