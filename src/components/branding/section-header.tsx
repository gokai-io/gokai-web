import { GokaiMarkSvg } from "@/components/branding/brand-svg"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
  eyebrow?: string
  hideMark?: boolean
  dark?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "center",
  eyebrow = "GŌKAI",
  hideMark = false,
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* Eyebrow row: mark + kicker + gradient rule */}
      <div
        className={cn(
          "flex items-center gap-3",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        {!hideMark && (
          <GokaiMarkSvg className="h-10 w-10 flex-none rounded-xl" />
        )}

        <div className="flex flex-col gap-2">
          <span className={cn("gokai-kicker", dark ? "text-[var(--text-on-dark-muted)]" : "text-muted-foreground")}>{eyebrow}</span>
          {/* Gradient rule — thematic red-to-gold feel */}
          <span
            className="block h-[2px] w-16 rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--accent-red) 0%, var(--accent-bronze) 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Title + subtitle */}
      <div
        className={cn(
          "flex flex-col gap-4",
          isCenter ? "items-center" : "items-start"
        )}
      >
        <h2
          className={cn(
            "max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]",
            dark ? "text-[var(--text-on-dark)]" : "text-foreground",
            isCenter && "text-balance"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-lg",
              dark ? "text-[var(--text-on-dark-secondary)]" : "text-muted-foreground",
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
