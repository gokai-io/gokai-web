import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Section } from "@/components/marketing/section"
import { FileText, Download } from "lucide-react"
import type { Transparencia, TransparenciaTipo } from "@/types/database"

export const metadata: Metadata = {
  title: "Transparência | GŌKAI",
  description: "Acesso aos documentos institucionais do GŌKAI – Associação Esportiva e Ambiental.",
}

const tipoLabels: Record<TransparenciaTipo, string> = {
  ata: "Atas",
  balanco: "Balanços",
  relatorio: "Relatórios",
  estatuto: "Estatuto",
  outro: "Outros",
}

const tipoOrder: TransparenciaTipo[] = ["estatuto", "ata", "balanco", "relatorio", "outro"]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })
}

export default async function TransparenciaPage() {
  const supabase = await createClient()

  const { data: documentos } = await supabase
    .from("transparencia")
    .select("*")
    .eq("publicado", true)
    .order("data_referencia", { ascending: false })

  const list = (documentos ?? []) as Transparencia[]

  // Group by tipo
  const grouped: Partial<Record<TransparenciaTipo, Transparencia[]>> = {}
  for (const doc of list) {
    const tipo = doc.tipo as TransparenciaTipo
    if (!grouped[tipo]) grouped[tipo] = []
    grouped[tipo]!.push(doc)
  }

  const sections = tipoOrder.filter((tipo) => (grouped[tipo]?.length ?? 0) > 0)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Prestação de Contas
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Transparência</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Acesso aos documentos institucionais do GŌKAI. Comprometidos com a gestão transparente
            e responsável.
          </p>
        </div>
      </section>

      {/* Documents */}
      <Section className="bg-zinc-950">
        {sections.length > 0 ? (
          <div className="space-y-14">
            {sections.map((tipo) => {
              const docs = grouped[tipo] ?? []
              return (
                <div key={tipo}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px flex-1 bg-zinc-800" />
                    <h2 className="text-xl font-bold text-zinc-100 whitespace-nowrap">
                      {tipoLabels[tipo]}
                    </h2>
                    <span className="h-px flex-1 bg-zinc-800" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-zinc-900 rounded-xl p-5 ring-1 ring-zinc-800 hover:ring-zinc-600 transition-all duration-200 flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 transition-colors">
                          <FileText className="w-5 h-5 text-zinc-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-zinc-100 leading-snug">
                            {doc.titulo}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-1 capitalize">
                            {formatDate(doc.data_referencia)}
                          </p>
                          {doc.descricao && (
                            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                              {doc.descricao}
                            </p>
                          )}
                          {doc.arquivo_url && (
                            <a
                              href={doc.arquivo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Baixar documento
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">Novos documentos serão disponibilizados em breve.</p>
          </div>
        )}
      </Section>

      {/* Info box */}
      <Section className="bg-zinc-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-zinc-100 mb-3">
            Solicitação de Documentos
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Caso necessite de algum documento não listado aqui, entre em contato conosco.
            Atendemos às solicitações conforme previsto em nosso estatuto social.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-50 transition-colors text-sm font-medium"
          >
            Entrar em contato
          </a>
        </div>
      </Section>
    </>
  )
}
