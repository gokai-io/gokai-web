import { cn } from "@/lib/utils"

interface InstitutionalCardProps extends React.ComponentProps<"div"> {
  accent?: "green" | "red" | "neutral" | "none"
  dark?: boolean
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
  green:   "hover:border-primary/40 hover:shadow-[0_2px_8px_rgba(11,90,43,0.06),0_16px_40px_rgba(0,0,0,0.10)]",
  red:     "hover:border-secondary/35 hover:shadow-[0_2px_8px_rgba(207,46,36,0.06),0_16px_40px_rgba(0,0,0,0.10)]",
  neutral: "hover:border-accent/40 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.08)]",
  none:    "hover:shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.08)]",
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
  dark = false,
  children,
  ...props
}: InstitutionalCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6",
        // Surface — white for light sections, dark-alt for dark sections
        dark
          ? "bg-surface-dark-alt border border-white/8 shadow-[0_1px_4px_rgba(0,0,0,0.12),0_8px_28px_rgba(0,0,0,0.16)]"
          : "bg-white border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.06)]",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        accent !== "none" ? ACCENT_HOVER[accent] : ACCENT_HOVER.none,
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
