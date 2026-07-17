import type { Metadata } from "next"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import { getModalidadesNomes, getStats } from "@/lib/queries/apresentacao"
import { InstitucionalDeck } from "./institucional-deck"

export const metadata: Metadata = {
  title: "GŌKAI Institucional | GŌKAI",
  description:
    "Apresentação institucional completa da GŌKAI – Associação Esportiva e Ambiental de Juiz de Fora/MG: quem somos, modalidades, números, impacto e parcerias.",
  alternates: {
    canonical: canonicalUrl("/apresentacao/institucional"),
  },
  openGraph: pageOpenGraph({
    title: "GŌKAI Institucional",
    description:
      "Apresentação institucional completa da GŌKAI – Associação Esportiva e Ambiental de Juiz de Fora/MG.",
    path: "/apresentacao/institucional",
  }),
  twitter: {
    ...twitterCard,
    title: "GŌKAI Institucional | GŌKAI",
    description:
      "Apresentação institucional completa da GŌKAI – Associação Esportiva e Ambiental de Juiz de Fora/MG.",
  },
}

export default async function InstitucionalPage() {
  const [stats, modalidades] = await Promise.all([getStats(), getModalidadesNomes()])

  return <InstitucionalDeck stats={stats} modalidades={modalidades} />
}
