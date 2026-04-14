import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Download } from "lucide-react"
import Link from "next/link"

import { BrandContainer } from "@/components/branding/brand-container"
import { getDocumento as getDocumentoStatic } from "@/lib/transparencia"
import { canonicalUrl, pageOpenGraph, twitterCard } from "@/lib/seo"

type DocumentPageProps = {
  params: Promise<{ id: string }>
}

type ContentBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function parseDocumentContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const paragraph: string[] = []
  const listItems: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push({ type: "p", text: paragraph.join(" ") })
    paragraph.length = 0
  }
  const flushList = () => {
    if (listItems.length === 0) return
    blocks.push({ type: "ul", items: [...listItems] })
    listItems.length = 0
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) { flushParagraph(); flushList(); continue }
    if (line === "---") { flushParagraph(); flushList(); blocks.push({ type: "hr" }); continue }
    if (line.startsWith("## ")) { flushParagraph(); flushList(); blocks.push({ type: "h2", text: line.slice(3) }); continue }
    if (line.startsWith("### ")) { flushParagraph(); flushList(); blocks.push({ type: "h3", text: line.slice(4) }); continue }
    if (line.startsWith("# ")) { flushParagraph(); flushList(); blocks.push({ type: "h1", text: line.slice(2) }); continue }
    if (line.startsWith("* ") || line.startsWith("- ")) { flushParagraph(); listItems.push(line.slice(2)); continue }
    flushList()
    paragraph.push(line)
  }
  flushParagraph()
  flushList()
  return blocks
}

function getDocumento(id: string) {
  return getDocumentoStatic(id) ?? null
}

export async function generateMetadata({ params }: DocumentPageProps): Promise<Metadata> {
  const { id } = await params
  const documento = getDocumento(id)
  if (!documento) return { title: "Documento não encontrado | GŌKAI" }
  return {
    title: `${documento.titulo} | Transparência | GŌKAI`,
    description: documento.descricao ?? `Documento institucional do GŌKAI: ${documento.titulo}.`,
    alternates: { canonical: canonicalUrl(`/transparencia/${documento.id}`) },
    openGraph: pageOpenGraph({
      title: `${documento.titulo} | Transparência | GŌKAI`,
      description: documento.descricao ?? `Documento institucional do GŌKAI: ${documento.titulo}.`,
      path: `/transparencia/${documento.id}`,
    }),
    twitter: {
      ...twitterCard,
      title: `${documento.titulo} | Transparência | GŌKAI`,
      description: documento.descricao ?? `Documento institucional do GŌKAI: ${documento.titulo}.`,
    },
  }
}

export default async function DocumentoTransparenciaPage({ params }: DocumentPageProps) {
  const { id } = await params
  const documento = getDocumento(id)

  if (!documento) notFound()
  if (!documento.conteudo && documento.arquivo_url) redirect(documento.arquivo_url)
  if (!documento.conteudo) notFound()

  const blocks = parseDocumentContent(documento.conteudo)

  return (
    <>
      {/* Hero — brand dark green, consistent with all document pages */}
      <section className="gokai-hero gokai-hero-compact">
        <BrandContainer className="relative">
          <Link
            href="/transparencia"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/62 transition-colors hover:text-white/88"
          >
            <span aria-hidden>←</span>
            Voltar para transparência
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="gokai-kicker text-white/68">Documento Institucional</div>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {documento.titulo}
              </h1>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-white/50">
                Referência: {formatDate(documento.data_referencia)}
              </p>
              {documento.descricao && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72">
                  {documento.descricao}
                </p>
              )}
            </div>

            {documento.arquivo_url && (
              <a
                href={documento.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18 lg:self-auto"
              >
                <Download className="size-4" />
                Baixar arquivo
              </a>
            )}
          </div>
        </BrandContainer>
      </section>

      {/* Document body — paper style on light background */}
      <section className="bg-background py-16">
        <BrandContainer>
          <article className="gokai-document-paper mx-auto max-w-3xl px-8 py-10 sm:px-12 sm:py-14">
            <div className="space-y-6">
              {blocks.map((block, index) => {
                switch (block.type) {
                  case "h1":
                    return (
                      <h2 key={index} className="font-heading text-3xl font-semibold text-foreground">
                        {block.text}
                      </h2>
                    )
                  case "h2":
                    return (
                      <h3 key={index} className="font-heading text-xl font-semibold text-foreground">
                        {block.text}
                      </h3>
                    )
                  case "h3":
                    return (
                      <h4 key={index} className="font-heading text-lg font-medium text-foreground">
                        {block.text}
                      </h4>
                    )
                  case "hr":
                    return <hr key={index} className="border-border/60" />
                  case "ul":
                    return (
                      <ul key={index} className="space-y-2 pl-5 text-foreground/80">
                        {block.items.map((item) => (
                          <li key={item} className="list-disc leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  case "p":
                    return (
                      <p key={index} className="text-base leading-relaxed text-foreground/80">
                        {block.text}
                      </p>
                    )
                }
              })}
            </div>
          </article>
        </BrandContainer>
      </section>
    </>
  )
}
