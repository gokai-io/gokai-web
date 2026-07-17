"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface PitchSlideProps {
  active?: boolean
  className?: string
  children: React.ReactNode
}

export const PitchSlide = forwardRef<HTMLElement, PitchSlideProps>(
  function PitchSlide({ active, className, children }, ref) {
    return (
      <section
        ref={ref}
        data-active={active || undefined}
        className={cn(
          // overflow-y-auto + m-auto no filho: centraliza quando o conteúdo
          // cabe e permite rolar dentro do slide quando não cabe (mobile).
          "relative flex h-dvh w-full shrink-0 snap-start overflow-y-auto overflow-x-hidden bg-zinc-950",
          className,
        )}
      >
        <div
          className={cn(
            "m-auto w-full px-6 py-14 transition-all duration-700 ease-out sm:px-10 lg:px-16",
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          )}
        >
          {children}
        </div>
      </section>
    )
  },
)
