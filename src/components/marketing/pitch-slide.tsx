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
          "relative flex h-dvh w-full shrink-0 snap-start items-center justify-center overflow-hidden bg-zinc-950",
          className,
        )}
      >
        <div
          className={cn(
            "w-full px-6 transition-all duration-700 ease-out sm:px-10 lg:px-16",
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
