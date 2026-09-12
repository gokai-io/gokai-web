import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="gokai-page-shell min-h-screen flex flex-col text-foreground">
      <SiteHeader />
      <a href="#conteudo" className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-white p-4 text-black focus:not-sr-only">Pular para o conteúdo</a>
      <main id="conteudo" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
