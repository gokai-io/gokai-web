import type { Metadata } from "next"
import { noIndexMetadata } from "@/lib/seo"

// Auth pages must never appear in search results.
// See src/lib/seo.ts → noIndexMetadata for the full indexing strategy.
export const metadata: Metadata = {
  ...noIndexMetadata,
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
