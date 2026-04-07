import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/marketing/section-heading"

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  className?: string
  headingAlign?: "left" | "center"
  children: React.ReactNode
}

export function Section({
  id,
  title,
  subtitle,
  className,
  headingAlign = "center",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="mx-auto max-w-7xl">
        {title && (
          <SectionHeading
            title={title}
            subtitle={subtitle}
            align={headingAlign}
            className="mb-14"
          />
        )}
        {children}
      </div>
    </section>
  )
}
