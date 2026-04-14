import { cn } from "@/lib/utils"
import { BrandContainer } from "@/components/branding/brand-container"
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
      className={cn("py-20", className)}
    >
      <BrandContainer>
        {title && (
          <SectionHeading
            title={title}
            subtitle={subtitle}
            align={headingAlign}
            className="mb-14"
          />
        )}
        {children}
      </BrandContainer>
    </section>
  )
}
