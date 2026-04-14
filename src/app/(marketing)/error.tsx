"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react"
import { GokaiMarkSvg } from "@/components/branding/brand-svg"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function MarketingError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Marketing Error]", error)
  }, [error])

  return (
    <div className="gokai-hero flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-8 text-center">
        {/* Brand mark */}
        <GokaiMarkSvg className="h-20 w-20 opacity-40" />

        {/* Error icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 ring-1 ring-secondary/28">
          <AlertTriangleIcon className="h-7 w-7 text-secondary" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-2xl font-semibold text-white">
            Algo deu errado
          </h1>
          <p className="text-sm leading-relaxed text-white/65">
            Ocorreu um erro inesperado ao carregar esta página. Por favor, tente
            novamente ou volte para a página inicial.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-white/30">
              Código: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <HomeIcon className="h-4 w-4" />
            Página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
