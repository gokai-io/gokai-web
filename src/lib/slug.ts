/**
 * Slug utilities for GŌKAI public routes.
 *
 * ─── Professor slug strategy ──────────────────────────────────────────────────
 *
 * The `professor` table does not have a stored `slug` column.
 * Professor profile URLs (`/professores/[slug]`) are derived at runtime
 * from `pessoa.nome_completo` using the `professorSlug` helper below.
 *
 * Lookup strategy in detail pages:
 *   1. Fetch all active professors with their `pessoa` join.
 *   2. Run `professorSlug(pessoa.nome_completo)` for each record.
 *   3. Return the first match for the requested slug.
 *   4. If no match → `notFound()`.
 *
 * Collision handling:
 *   For a small team (< ~30 instructors) name-based collisions are unlikely.
 *   If two instructors share an identical slug in the future, the first DB
 *   record wins. The permanent solution is to add a `slug` column to
 *   `professor` via a migration and populate it once — that eliminates all
 *   ambiguity and enables efficient indexed lookups.
 *
 * Generating links in listing pages:
 *   import { professorSlug } from "@/lib/slug"
 *   href={`/professores/${professorSlug(prof.pessoa.nome_completo)}`}
 */

/**
 * Converts an arbitrary string to a URL-safe slug.
 *
 * Steps:
 *   1. NFD-normalize (decompose accented characters)
 *   2. Strip combining diacritical marks (ã → a, ç → c, etc.)
 *   3. Lowercase
 *   4. Replace any run of non-alphanumeric characters with a single hyphen
 *   5. Trim leading / trailing hyphens
 *
 * @example
 *   slugify("João Silva")   // "joao-silva"
 *   slugify("Ângela Côrte") // "angela-corte"
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Derives the public URL slug for a professor from their full name.
 * Thin wrapper over `slugify` — exists so call-sites are self-documenting
 * and so a future change (e.g. adding a DB slug column) has a single update
 * point.
 */
export function professorSlug(nomeCompleto: string): string {
  return slugify(nomeCompleto)
}
