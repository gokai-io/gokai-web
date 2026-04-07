"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function MarketingError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Marketing Error]", error)
  }, [error])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center max-w-md">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 ring-1 ring-red-500/20">
          <AlertTriangleIcon className="w-10 h-10 text-red-400" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-zinc-100">Algo deu errado</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Ocorreu um erro inesperado ao carregar esta página. Por favor, tente
            novamente ou volte para a página inicial.
          </p>
          {error.digest && (
            <p className="text-xs text-zinc-600 font-mono">
              Código: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-zinc-950 font-semibold text-sm hover:bg-red-500 transition-colors"
          >
            <RefreshCwIcon className="w-4 h-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-zinc-500 hover:text-zinc-50 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            Página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
