import { GokaiMarkSvg } from "@/components/branding/brand-svg"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
  eyebrow?: string
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
          <span className="gokai-kicker text-primary/68">{eyebrow}</span>
          {/* Gradient rule — red → lime, echoes the logo's energy */}
          <span
            className="block h-[2px] w-16 rounded-full"
            style={{
              background: "linear-gradient(90deg, #CF2E24 0%, #7AC943 100%)",
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
            "max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]",
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
