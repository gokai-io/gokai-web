import type { Metadata } from "next"
import { Manrope, Montserrat, Outfit } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SITE_URL, siteConfig, organizationJsonLd, DEFAULT_OG_IMAGE, twitterCard } from "@/lib/seo"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Brand wordmark font — specified in the official GŌKAI brand guide
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteConfig.fullName,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "pt_BR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    ...twitterCard,
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${manrope.variable} ${montserrat.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Organization JSON-LD – helps search engines understand the entity.
            React 19 supports rendering <script> with string children for SSR. */}
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
