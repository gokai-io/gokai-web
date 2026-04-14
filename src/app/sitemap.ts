import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { SITE_URL } from "@/lib/seo"
import { professorSlug } from "@/lib/slug"
import { getAllArticles } from "@/lib/conteudos"
import { LOCATIONS } from "@/lib/locations"

// ─── Location entries — generated from confirmed LOCATIONS config ─────────────

function getLocationEntries(): MetadataRoute.Sitemap {
  return LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/localidades/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))
}

// ─── Static public routes ───────────────────────────────────────────────────
// Add new public marketing routes here as they are created.
const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/sobre", priority: 0.8, changeFrequency: "monthly" },
  { path: "/modalidades", priority: 0.9, changeFrequency: "weekly" },
  { path: "/professores", priority: 0.8, changeFrequency: "monthly" },
  { path: "/eventos", priority: 0.9, changeFrequency: "daily" },
  { path: "/transparencia", priority: 0.6, changeFrequency: "monthly" },
  { path: "/governanca", priority: 0.6, changeFrequency: "monthly" },
  { path: "/patrocinadores", priority: 0.5, changeFrequency: "monthly" },
  { path: "/apoiadores", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
  { path: "/inscricao", priority: 0.8, changeFrequency: "monthly" },
  { path: "/seja-um-apoiador", priority: 0.6, changeFrequency: "monthly" },
  { path: "/apresentacao", priority: 0.4, changeFrequency: "monthly" },
  { path: "/conteudos", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termos", priority: 0.3, changeFrequency: "yearly" },
  // /localidades is only included when at least one location is configured.
  // Individual /localidades/[cidade] entries are added dynamically below.
  ...(LOCATIONS.length > 0
    ? [{ path: "/localidades", priority: 0.8, changeFrequency: "monthly" as const }]
    : []),
]

// ─── Dynamic routes ──────────────────────────────────────────────────────────

async function getProfessorEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient()
    const { data: professores } = await supabase
      .from("professor")
      .select("*, pessoa:pessoa(nome_completo, updated_at)")
      .eq("exibir_site", true)
      .eq("status", "ativo")

    if (!professores) return []

    return (
      professores
        .filter((p: { pessoa?: { nome_completo?: string } }) => p.pessoa?.nome_completo)
        .map((p: { pessoa: { nome_completo: string }; updated_at?: string | null }) => ({
          url: `${SITE_URL}/professores/${professorSlug(p.pessoa.nome_completo)}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
    )
  } catch {
    // Supabase may not be reachable at build time.
    return []
  }
}

async function getModalidadeEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient()
    const { data: modalidades } = await supabase
      .from("modalidade")
      .select("slug, updated_at")
      .eq("ativa", true)
      .not("slug", "is", null)

    return (modalidades ?? []).map(
      (modalidade: { slug: string; updated_at: string | null }) => ({
        url: `${SITE_URL}/modalidades/${modalidade.slug}`,
        lastModified: modalidade.updated_at ? new Date(modalidade.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    )
  } catch {
    return []
  }
}

function getArticleEntries(): MetadataRoute.Sitemap {
  return getAllArticles().map((article) => ({
    url: `${SITE_URL}/conteudos/${article.slug}`,
    lastModified: new Date(article.atualizado_em),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
}

async function getEventoEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient()
    const { data: eventos } = await supabase
      .from("evento")
      .select("slug, updated_at")
      .eq("publicado", true)
      .not("slug", "is", null)

    return (eventos ?? []).map((evento: { slug: string; updated_at: string | null }) => ({
      url: `${SITE_URL}/eventos/${evento.slug}`,
      lastModified: evento.updated_at ? new Date(evento.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch {
    // Supabase may not be reachable at build time (missing env vars in CI).
    // Returning an empty array is safe; dynamic pages will still be crawlable
    // once Google discovers them via links or manual submission.
    return []
  }
}

// ─── Sitemap export ──────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  )

  const [eventoEntries, professorEntries, modalidadeEntries] = await Promise.all([
    getEventoEntries(),
    getProfessorEntries(),
    getModalidadeEntries(),
  ])

  const articleEntries = getArticleEntries()
  const locationEntries = getLocationEntries()

  return [
    ...staticEntries,
    ...modalidadeEntries,
    ...professorEntries,
    ...eventoEntries,
    ...articleEntries,
    ...locationEntries,
  ]
}
