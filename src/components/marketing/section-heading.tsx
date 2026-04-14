import { SectionHeader } from "@/components/branding/section-header"

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
  return <SectionHeader title={title} subtitle={subtitle} className={className} align={align} />
}
