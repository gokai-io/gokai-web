import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app/app-sidebar"
import { AppHeader } from "@/components/app/app-header"
import { noIndexMetadata } from "@/lib/seo"

// All /app/* surfaces are private and must never appear in search results.
// See src/lib/seo.ts → noIndexMetadata for the full indexing strategy.
export const metadata: Metadata = {
  ...noIndexMetadata,
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <AppHeader user={user} />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
