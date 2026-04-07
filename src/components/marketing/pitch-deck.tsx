"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { usePitchDeck } from "@/hooks/use-pitch-deck"
import { PitchSlide } from "./pitch-slide"
import { cn } from "@/lib/utils"

interface PitchDeckProps {
  children: React.ReactNode[]
  exitHref?: string
}

export function PitchDeck({ children, exitHref = "/apresentacao" }: PitchDeckProps) {
  const slideCount = children.length
  const { containerRef, setSlideRef, currentSlide, goToSlide } = usePitchDeck(slideCount)

  return (
    <div
      ref={containerRef}
      className="h-dvh snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth"
    >
      {/* Exit button */}
      <Link
        href={exitHref}
        className="fixed left-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-zinc-900/80 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        aria-label="Voltar"
      >
        <X className="size-5" />
      </Link>

      {/* Dot indicators */}
      <nav
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2"
        aria-label="Navegação dos slides"
      >
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className={cn(
              "size-2.5 rounded-full transition-all duration-300",
              i === currentSlide
                ? "scale-125 bg-red-600"
                : "bg-zinc-600 hover:bg-zinc-400",
            )}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === currentSlide ? "true" : undefined}
          />
        ))}
      </nav>

      {/* Slide counter */}
      <div className="fixed bottom-4 right-4 z-50 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium tabular-nums text-zinc-400 backdrop-blur-sm">
        {currentSlide + 1} / {slideCount}
      </div>

      {/* Slides */}
      {children.map((child, i) => (
        <PitchSlide key={i} ref={setSlideRef(i)} active={i === currentSlide}>
          {child}
        </PitchSlide>
      ))}
    </div>
  )
}
