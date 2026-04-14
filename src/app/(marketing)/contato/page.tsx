import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react"

import { GokaiButton } from "@/components/branding/gokai-button"
import { InstitutionalCard } from "@/components/branding/institutional-card"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_ADDRESS_DISPLAY,
  CONTACT_MAP_URL,
  CONTACT_HOURS,
  SOCIAL_PROFILES,
} from "@/lib/site"
import { ContatoForm } from "./contato-form"

export const metadata: Metadata = {
  title: "Contato | GŌKAI",
  description: "Entre em contato com o GŌKAI – Associação Esportiva e Ambiental.",
  alternates: {
    canonical: canonicalUrl("/contato"),
  },
  openGraph: pageOpenGraph({
    title: "Contato | GŌKAI",
    description:
      "Entre em contato com o GŌKAI. Tire dúvidas, saiba mais sobre nossas modalidades ou inicie sua inscrição.",
    path: "/contato",
  }),
  twitter: {
    ...twitterCard,
    title: "Contato | GŌKAI",
    description:
      "Entre em contato com o GŌKAI. Tire dúvidas, saiba mais sobre nossas modalidades ou inicie sua inscrição.",
  },
}

type ContactItem = {
  icon: typeof Mail
  label: string
  value: string
  href: string | null
}

function buildContactItems(): ContactItem[] {
  const items: ContactItem[] = []

  if (CONTACT_EMAIL) {
    items.push({
      icon: Mail,
      label: "E-mail",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    })
  }

  if (CONTACT_PHONE_DISPLAY) {
    items.push({
      icon: Phone,
      label: "Telefone / WhatsApp",
      value: CONTACT_PHONE_DISPLAY,
      href: CONTACT_PHONE_HREF,
    })
  }

  if (CONTACT_ADDRESS_DISPLAY) {
    items.push({
      icon: MapPin,
      label: "Endereço",
      value: CONTACT_ADDRESS_DISPLAY,
      href: CONTACT_MAP_URL,
    })
  }

  if (CONTACT_HOURS) {
    items.push({
      icon: Clock,
      label: "Horário de atendimento",
      value: CONTACT_HOURS,
      href: null,
    })
  }

  return items
}

const contactItems = buildContactItems()

export default function ContatoPage() {
  return (
    <div className="min-h-screen">
      <section className="gokai-hero gokai-hero-compact">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="gokai-kicker justify-center text-[var(--text-on-dark-secondary)]">Fale Conosco</p>
          <h1 className="mt-5 text-4xl font-semibold text-[var(--text-on-dark)] sm:text-5xl">Contato</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-on-dark-secondary)]">
            Tem alguma dúvida ou quer saber mais sobre o GŌKAI? Envie uma mensagem e responderemos
            em breve.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 pt-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <InstitutionalCard accent="green" className="p-6 sm:p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">Envie uma mensagem</h2>
              <ContatoForm />
            </InstitutionalCard>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactItems.length > 0 ? (
              contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <InstitutionalCard key={item.label} accent="neutral" className="flex items-start gap-4 p-5">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/8">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary/58">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-start gap-1 whitespace-pre-line text-sm text-foreground hover:text-primary"
                        >
                          {item.value}
                          {item.href.startsWith("http") && (
                            <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-primary/50" />
                          )}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </InstitutionalCard>
                )
              })
            ) : (
              <InstitutionalCard accent="neutral" className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/58">
                  Retorno
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Após o envio do formulário, nossa equipe entrará em contato pelo e-mail informado
                  em breve.
                </p>
              </InstitutionalCard>
            )}

            {SOCIAL_PROFILES.length > 0 ? (
              <InstitutionalCard accent="red" className="p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Redes Sociais</h3>
                <ul className="flex flex-col gap-2">
                  {SOCIAL_PROFILES.map((url) => {
                    const display = url.replace(/^https?:\/\/(www\.)?/, "")
                    return (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                        >
                          {display}
                          <ExternalLink className="h-3 w-3 shrink-0 text-primary/50" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </InstitutionalCard>
            ) : (
              <InstitutionalCard accent="red" className="p-5">
                <h3 className="mb-2 text-sm font-semibold text-foreground">Redes Sociais</h3>
                <p className="text-sm text-muted-foreground">
                  Siga o GŌKAI nas redes sociais para ficar por dentro de eventos, resultados e
                  novidades da associação.
                </p>
              </InstitutionalCard>
            )}

            <GokaiButton href="/sobre" tone="outline" className="justify-center">
              Conhecer a associação
            </GokaiButton>
          </div>
        </div>
      </section>
    </div>
  )
}
