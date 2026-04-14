/**
 * ─── GŌKAI Location Configuration ───────────────────────────────────────────
 *
 * Single source of truth for all confirmed physical training locations.
 * Each entry in LOCATIONS generates a public landing page at:
 *
 *   /localidades/[slug]
 *
 * These pages are indexed by search engines and target local-intent queries
 * such as "artes marciais em São Paulo" or "jiu-jitsu em Pinheiros".
 *
 * ─── RULES — READ BEFORE EDITING ─────────────────────────────────────────────
 *
 *  1. NEVER add a city, neighborhood, or address that is not confirmed real.
 *     Fake location pages destroy trust and may draw Google penalties.
 *
 *  2. Add an entry only after the following are confirmed:
 *     - Physical address where students actually train
 *     - At least one active modality offered at that address
 *     - Contact or enrollment flow that works for that location
 *
 *  3. Leave LOCATIONS = [] until real data is available.
 *     An empty array means no local pages are generated — that is the safe default.
 *
 * ─── CHECKLIST (per location) ─────────────────────────────────────────────────
 *
 *  [ ] slug           → URL-safe string, lowercase, hyphens (e.g. "sao-paulo")
 *  [ ] cidade         → Display name (e.g. "São Paulo")
 *  [ ] estado         → UF abbreviation (e.g. "SP")
 *  [ ] bairro         → Neighborhood display name (optional but improves local SEO)
 *  [ ] descricao      → 1–2 sentence description for this location's landing page
 *  [ ] modalidades    → At least one confirmed modality with matching DB slug
 *  [ ] localNome      → Training venue name (must match Turma.local in Supabase)
 *  [ ] endereco       → Full address string for display (confirm before publishing)
 *  [ ] mapaUrl        → Google Maps URL for directions link
 */

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * A martial arts modality offered at a specific location.
 * `slug` must match the `modalidade.slug` column in Supabase exactly.
 */
export interface LocationModality {
  /** Display name, e.g. "Jiu-Jitsu" */
  nome: string
  /** Must match `modalidade.slug` in Supabase, e.g. "jiu-jitsu" */
  slug: string
  /** Short tagline for this modality at this location (optional) */
  tagline?: string
}

/**
 * A physical location where GŌKAI offers training.
 * Each confirmed location creates one public page at /localidades/[slug].
 */
export interface Location {
  /**
   * URL slug for this location page.
   * Use URL-safe lowercase with hyphens: "sao-paulo", "rio-de-janeiro".
   */
  slug: string

  /** Human-readable city name used in headings and metadata. */
  cidade: string

  /**
   * Neighborhood within the city.
   * Adds granularity for "artes marciais em [bairro]" queries.
   */
  bairro?: string

  /** State abbreviation (e.g. "SP", "RJ") */
  estado: string

  /**
   * 1–2 sentence description for SEO and the hero section.
   * Should include city + modalities naturally. No keyword stuffing.
   */
  descricao?: string

  /**
   * Modalities actively offered at this location.
   * Used to build modality cards and modality+city internal links.
   */
  modalidades: LocationModality[]

  /**
   * The training venue name — must match Turma.local values in Supabase
   * so schedule data can be filtered per location.
   */
  localNome?: string

  /**
   * Full postal address for display.
   * Only set once officially confirmed. Never use a placeholder.
   */
  endereco?: string

  /** Google Maps directions or embed URL */
  mapaUrl?: string
}

// ─── Location data ────────────────────────────────────────────────────────────

/**
 * ⚠️ TODO: Add entries here once real addresses and training data are confirmed.
 *
 * Keeping this empty is correct and safe — it means no local pages are published
 * before the business is ready to support them.
 *
 * Example structure (fill with verified data, then uncomment):
 *
 * {
 *   slug: "sao-paulo",
 *   cidade: "São Paulo",
 *   bairro: "Nome do Bairro",        // confirmed neighborhood
 *   estado: "SP",
 *   descricao: "O GŌKAI oferece treinos de [Modalidade] e [Modalidade] em São Paulo, " +
 *              "no bairro de [Bairro], com turmas para iniciantes e avançados.",
 *   modalidades: [
 *     { nome: "Jiu-Jitsu", slug: "jiu-jitsu", tagline: "Do iniciante ao competidor" },
 *     { nome: "Muay Thai", slug: "muay-thai" },
 *   ],
 *   localNome: "Nome Exato do Local de Treino",  // must match Turma.local in DB
 *   endereco: "Rua Confirmada, 000 — Bairro, São Paulo – SP, 00000-000",
 *   mapaUrl: "https://maps.google.com/?q=...",
 * },
 */
export const LOCATIONS: Location[] = [
  // ← Add confirmed locations here
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns a location by its slug, or undefined if not found. */
export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug)
}

/** True when at least one location is configured. */
export function hasLocations(): boolean {
  return LOCATIONS.length > 0
}

/**
 * Returns the full city+state display string.
 * @example cityDisplay({ cidade: "São Paulo", estado: "SP" }) → "São Paulo – SP"
 */
export function cityDisplay(loc: Pick<Location, "cidade" | "estado">): string {
  return `${loc.cidade} – ${loc.estado}`
}

/**
 * Returns the neighborhood + city label if bairro is set, otherwise city only.
 * @example localLabel({ cidade: "São Paulo", bairro: "Pinheiros" }) → "Pinheiros, São Paulo"
 */
export function localLabel(loc: Pick<Location, "cidade" | "bairro">): string {
  return loc.bairro ? `${loc.bairro}, ${loc.cidade}` : loc.cidade
}
