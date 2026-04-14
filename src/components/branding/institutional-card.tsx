import { cn } from "@/lib/utils"

interface InstitutionalCardProps extends React.ComponentProps<"div"> {
  accent?: "green" | "red" | "neutral" | "none"
}

// Top accent bar color per variant
const ACCENT_BAR: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "before:bg-primary",
  red:     "before:bg-secondary",
  neutral: "before:bg-accent",
  none:    "",
}

// Border glow on hover per variant
const ACCENT_HOVER: Record<NonNullable<InstitutionalCardProps["accent"]>, string> = {
  green:   "hover:border-primary/40 hover:shadow-[0_2px_8px_rgba(11,90,43,0.08),0_20px_48px_rgba(11,90,43,0.10)]",
  red:     "hover:border-secondary/35 hover:shadow-[0_2px_8px_rgba(207,46,36,0.08),0_20px_48px_rgba(207,46,36,0.09)]",
  neutral: "hover:border-accent/40 hover:shadow-[0_2px_8px_rgba(122,201,67,0.08),0_20px_48px_rgba(11,90,43,0.08)]",
  none:    "hover:shadow-[0_2px_8px_rgba(18,48,32,0.08),0_20px_48px_rgba(18,48,32,0.09)]",
}

/**
 * InstitutionalCard — primary surface for the GŌKAI marketing site.
 *
 * Pure white card that clearly separates from the off-white page background.
 * Multi-layer shadow system creates real depth. Colored top accent bar and
 * per-variant hover border glow reinforce brand identity.
 *
 * Accents: green | red | neutral | none
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
        // Shape — rounded-xl (14px): mais institucional que rounded-2xl (18px)
        "relative overflow-hidden rounded-xl p-6",
        // Surface — pure white so it reads cleanly on the off-white bg
        "bg-white border border-border",
        // Depth — layered shadows: fine near-shadow + ambient far-shadow
        "shadow-[0_1px_4px_rgba(18,48,32,0.06),0_8px_28px_rgba(18,48,32,0.07)]",
        // Transitions
        "transition-all duration-300",
        // Lift + per-accent glow on hover
        "hover:-translate-y-0.5",
        accent !== "none" ? ACCENT_HOVER[accent] : ACCENT_HOVER.none,
        // Accent bar — 4px wide, runs from left-6, clips at top-0
        accent !== "none" && [
          "before:absolute before:left-6 before:top-0",
          "before:h-[4px] before:w-20 before:rounded-b-full",
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
