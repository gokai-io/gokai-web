"use client"

import { useEffect } from "react"
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error("[App Error]", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
        <AlertTriangleIcon className="w-8 h-8 text-destructive" />
      </div>

      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-xl font-semibold">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground">
          Ocorreu um erro ao carregar esta página. Tente novamente ou entre em contato
          com o suporte se o problema persistir.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Código: {error.digest}
          </p>
        )}
      </div>

      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCwIcon className="w-4 h-4" />
        Tentar novamente
      </Button>
    </div>
  )
}
