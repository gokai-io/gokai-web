import type { Metadata } from "next"
import { ContatoForm } from "./contato-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato | GŌKAI",
  description: "Entre em contato com o GŌKAI – Associação Esportiva e Ambiental.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@gokai.com.br",
    href: "mailto:contato@gokai.com.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 99999-9999",
    href: "tel:+5511999999999",
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua das Artes Marciais, 123\nSão Paulo – SP, 01234-000", // TODO: Replace with real address
    href: null,
  },
  {
    icon: Clock,
    label: "Horário de atendimento",
    value: "Segunda a Sexta: 8h às 20h\nSábado: 8h às 14h",
    href: null,
  },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-4">
            Fale Conosco
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Contato</h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Tem alguma dúvida ou quer saber mais sobre o GŌKAI? Entre em contato conosco.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="bg-zinc-900 rounded-xl p-6 sm:p-8 ring-1 ring-zinc-800">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">
                  Envie uma mensagem
                </h2>
                <ContatoForm />
              </div>
            </div>

            {/* Info column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="bg-zinc-900 rounded-xl p-5 ring-1 ring-zinc-800 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-zinc-300 hover:text-zinc-200 transition-colors whitespace-pre-line"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-zinc-300 whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Social note */}
              <div className="bg-zinc-900 rounded-xl p-5 ring-1 ring-zinc-800">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">Redes Sociais</h3>
                <p className="text-sm text-zinc-400">
                  Siga o GŌKAI nas redes sociais para ficar por dentro de eventos, resultados e
                  novidades da associação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
