"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function usePitchDeck(slideCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slideRefs.current.indexOf(entry.target as HTMLElement)
            if (index !== -1) setCurrentSlide(index)
          }
        }
      },
      { root: container, threshold: 0.5 },
    )

    for (const slide of slideRefs.current) {
      if (slide) observer.observe(slide)
    }

    return () => observer.disconnect()
  }, [slideCount])

  const goToSlide = useCallback((index: number) => {
    const slide = slideRefs.current[index]
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return

      switch (e.key) {
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault()
          goToSlide(Math.min(currentSlide + 1, slideCount - 1))
          break
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          goToSlide(Math.max(currentSlide - 1, 0))
          break
        case "Home":
          e.preventDefault()
          goToSlide(0)
          break
        case "End":
          e.preventDefault()
          goToSlide(slideCount - 1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, slideCount, goToSlide])

  const setSlideRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      slideRefs.current[index] = el
    },
    [],
  )

  return { containerRef, setSlideRef, currentSlide, goToSlide }
}
