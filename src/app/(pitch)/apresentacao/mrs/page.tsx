import type { Metadata } from "next"
import { noIndexMetadata } from "@/lib/seo"
import { getModalidadesNomes, getStats } from "@/lib/queries/apresentacao"
import { MrsDeck } from "./mrs-deck"

export const metadata: Metadata = {
  title: "GŌKAI × MRS | GŌKAI",
  description:
    "Proposta de patrocínio incentivado da GŌKAI – Associação Esportiva e Ambiental para a MRS.",
  ...noIndexMetadata,
}

export default async function MrsPage() {
  const [stats, modalidades] = await Promise.all([getStats(), getModalidadesNomes()])

  return <MrsDeck stats={stats} modalidades={modalidades} />
}
