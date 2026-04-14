import Link from "next/link"
import { Download } from "lucide-react"

import { BrandContainer } from "@/components/branding/brand-container"
import { GokaiMarkSvg } from "@/components/branding/brand-svg"

interface DocumentHeaderProps {
  title: string
  subtitle?: string | null
  eyebrow?: string
  backHref?: string
  backLabel?: string
  meta?: string
  downloadHref?: string | null
}

/**
 * DocumentHeader — dark hero for institutional document pages.
 *
 * Shows the GŌKAI mark, document title, optional metadata,
 * a back link, and an optional download button.
 */
export function DocumentHeader({
  title,
  subtitle,
  eyebrow = "Documento Institucional",
  backHref = "/transparencia",
  backLabel = "Voltar para transparência",
  meta,
  downloadHref,
}: DocumentHeaderProps) {
  return (
    <section className="gokai-hero gokai-hero-compact">
      <BrandContainer className="relative">
        {/* Back navigation */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-white/90"
        >
          <span aria-hidden>←</span>
          {backLabel}
        </Link>

        {/* Content row */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Title block */}
          <div className="max-w-3xl">
            <div className="gokai-kicker text-white/72">{eyebrow}</div>

            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>

            {meta && (
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-white/52">
                {meta}
              </p>
            )}

            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/74 sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Mark + optional download */}
          <div className="flex flex-none items-center gap-4">
            {/* Emblem in glazed card */}
            <div className="rounded-[26px] border border-white/14 bg-white/10 p-3 shadow-[0_24px_60px_rgba(7,25,15,0.3)] backdrop-blur-sm">
              <GokaiMarkSvg className="h-16 w-16 rounded-[18px]" />
            </div>

            {/* Download button */}
            {downloadHref && (
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18"
              >
                <Download className="size-4" />
                Baixar arquivo
              </a>
            )}
          </div>
        </div>
      </BrandContainer>
    </section>
  )
}
