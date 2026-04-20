"use client"

import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--accent-gold)]/25 bg-white/[0.04] px-5 py-3 text-sm font-bold text-[var(--text-ivory)] transition-all hover:bg-white/[0.08] lg:self-auto print:hidden"
    >
      <Printer className="size-4" />
      Salvar como PDF
    </button>
  )
}
