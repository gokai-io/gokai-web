import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2",
          align === "center" ? "items-center" : "items-start"
        )}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
          GŌKAI
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>

      {align === "center" && (
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-zinc-700" aria-hidden />
          <span className="h-1 w-6 bg-zinc-600" aria-hidden />
          <span className="h-px w-12 bg-zinc-700" aria-hidden />
        </div>
      )}

      {subtitle && (
        <p className="max-w-2xl text-lg font-normal text-zinc-400 sm:text-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
