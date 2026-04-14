import { cn } from "@/lib/utils"

interface BrandContainerProps {
  className?: string
  children: React.ReactNode
}

export function BrandContainer({ className, children }: BrandContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
