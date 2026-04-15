import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Download, ArrowLeft } from "lucide-react"
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
    if (line.startsWith("### ")) { flushParagraph(); flushList(); blocks.push({ type: "h3", text: line.slice(4) }); continue }
    if (line.startsWith("## ")) { flushParagraph(); flushList(); blocks.push({ type: "h2", text: line.slice(3) }); continue }
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
      {/* ── Hero — dark, compact ─────────────────────────────── */}
      <section className="gokai-hero-spotlight pt-28 pb-16">
        <BrandContainer>
          <Link
            href="/transparencia"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-ivory-dim)] transition-colors hover:text-[var(--text-ivory)] mb-10"
          >
            <ArrowLeft className="size-4" />
            Voltar para transparência
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="gokai-kicker mb-4">Documento Institucional</div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-ivory)]">
                {documento.titulo}
              </h1>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-ivory-muted)]">
                Referência: {formatDate(documento.data_referencia)}
              </p>
              {documento.descricao && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-ivory-dim)]">
                  {documento.descricao}
                </p>
              )}
            </div>

            {documento.arquivo_url && (
              <a
                href={documento.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--accent-gold)]/25 bg-white/[0.04] px-5 py-3 text-sm font-bold text-[var(--text-ivory)] transition-all hover:bg-white/[0.08] lg:self-auto"
              >
                <Download className="size-4" />
                Baixar arquivo
              </a>
            )}
          </div>
        </BrandContainer>
      </section>

      {/* ── Document body — paper style, light bg for readability ── */}
      <section className="bg-[#F4F2ED] py-16">
        <BrandContainer>
          <article className="mx-auto max-w-3xl rounded-2xl border border-[var(--surface-midnight)]/8 bg-white px-8 py-12 sm:px-14 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl bg-gradient-to-b from-[var(--accent-carmine)] to-[var(--accent-gold)]" />

            <div className="space-y-6">
              {blocks.map((block, index) => {
                switch (block.type) {
                  case "h1":
                    return (
                      <h2 key={index} className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--surface-midnight)] mt-4">
                        {block.text}
                      </h2>
                    )
                  case "h2":
                    return (
                      <h3 key={index} className="font-heading text-xl font-extrabold text-[var(--surface-midnight)] mt-2">
                        {block.text}
                      </h3>
                    )
                  case "h3":
                    return (
                      <h4 key={index} className="font-heading text-lg font-bold text-[var(--surface-midnight)]/90">
                        {block.text}
                      </h4>
                    )
                  case "hr":
                    return <hr key={index} className="border-[var(--surface-midnight)]/10 my-2" />
                  case "ul":
                    return (
                      <ul key={index} className="space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item} className="list-disc text-[var(--surface-midnight)]/75 leading-[1.8] text-[15px]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  case "p":
                    return (
                      <p key={index} className="text-[var(--surface-midnight)]/75 leading-[1.8] text-[15px]">
                        {block.text}
                      </p>
                    )
                }
              })}
            </div>
          </article>
        </BrandContainer>
      </section>

      {/* ── Footer nav — dark ──────────────────────────────────── */}
      <section className="bg-[var(--surface-midnight)] py-12">
        <BrandContainer>
          <div className="mx-auto max-w-3xl flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/transparencia"
              className="text-sm text-[var(--text-ivory-muted)] hover:text-[var(--text-ivory)] transition-colors"
            >
              ← Todos os documentos
            </Link>
            <Link
              href="/contato"
              className="text-sm text-[var(--text-ivory-muted)] hover:text-[var(--text-ivory)] transition-colors ml-auto"
            >
              Solicitar documento →
            </Link>
          </div>
        </BrandContainer>
      </section>
    </>
  )
}
