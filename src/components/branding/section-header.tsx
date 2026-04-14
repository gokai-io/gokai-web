import { GokaiMarkSvg } from "@/components/branding/brand-svg"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
  eyebrow?: string
  /** Hides the brand mark beside the eyebrow when space is tight */
  hideMark?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "center",
  eyebrow = "GŌKAI",
  hideMark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* Eyebrow row: mark + kicker + divider */}
      <div
        className={cn(
          "flex items-center gap-3",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        {!hideMark && (
          <GokaiMarkSvg className="h-9 w-9 flex-none rounded-xl" />
        )}

        <div className="flex flex-col gap-1.5">
          <span className="gokai-kicker text-primary/70">{eyebrow}</span>
          {/* Gradient rule: red → lime — echoes the logo's energy */}
          <span
            className="block h-[1.5px] w-14 rounded-full"
            style={{ background: "linear-gradient(90deg, #CF2E24, #7AC943)" }}
            aria-hidden
          />
        </div>
      </div>

      {/* Title + optional subtitle */}
      <div
        className={cn(
          "flex flex-col gap-3",
          isCenter ? "items-center" : "items-start"
        )}
      >
        <h2
          className={cn(
            "max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl",
            isCenter && "text-balance"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              isCenter && "text-pretty"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
