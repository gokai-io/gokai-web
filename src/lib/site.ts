/**
 * ─── GŌKAI Business Identity Configuration ──────────────────────────────────
 *
 * Single source of truth for all real-world business data used across:
 *   • Footer contact column
 *   • Contact page info cards
 *   • Organization JSON-LD (schema.org)
 *   • Privacy and terms pages
 *   • Local SEO pages (future)
 *
 * ─── HOW TO COMPLETE THIS FILE ───────────────────────────────────────────────
 *
 *  1. Replace `null` with the real string value once confirmed.
 *  2. The UI reads these values and handles `null` gracefully — it will NOT
 *     expose placeholder or fake data publicly. Missing data is simply omitted
 *     or replaced with a neutral "coming soon" message.
 *  3. Do NOT put fake data here (e.g. "(11) 99999-9999"). Use `null` instead.
 *  4. After filling in, search for "⚠️ TODO" to find remaining items.
 *
 * ─── TEAM CHECKLIST ──────────────────────────────────────────────────────────
 *
 *  [ ] CONTACT_EMAIL          → primary public contact email
 *  [ ] CONTACT_PHONE_DISPLAY  → phone/WhatsApp display string
 *  [ ] CONTACT_PHONE_HREF     → same number in E.164 format (e.g. +5511...)
 *  [ ] CONTACT_HOURS          → opening / attendance hours
 *  [ ] CONTACT_ADDRESS_DISPLAY → formatted address for display
 *  [ ] CONTACT_ADDRESS_SCHEMA  → structured address for JSON-LD
 *  [ ] CONTACT_MAP_URL        → Google Maps embed or directions link
 *  [ ] SOCIAL_PROFILES        → real social media URLs
 *  [ ] LEGAL_ENTITY_NAME      → official registered name
 *  [ ] LEGAL_CNPJ             → CNPJ for legal disclosures
 *  [ ] LEGAL_DPO_EMAIL        → email for LGPD / data requests
 */

// ─── Postal address shape (schema.org PostalAddress) ─────────────────────────

export interface PostalAddressSchema {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────

/**
 * ⚠️ TODO: Primary public contact email.
 * Example: "contato@gokai.com.br"
 */
export const CONTACT_EMAIL: string | null = null

/**
 * ⚠️ TODO: Primary public phone / WhatsApp — human-readable display format.
 * Example: "(11) 99000-0000"
 */
export const CONTACT_PHONE_DISPLAY: string | null = null

/**
 * ⚠️ TODO: Same number in E.164 format for `tel:` links.
 * Example: "+5511990000000"
 */
export const CONTACT_PHONE_HREF: string | null = null

/**
 * ⚠️ TODO: Office / reception hours in display format.
 * Example: "Segunda a Sexta: 8h às 20h\nSábado: 8h às 14h"
 */
export const CONTACT_HOURS: string | null = null

// ─── Physical location ────────────────────────────────────────────────────────

/**
 * ⚠️ TODO: Full address for display on the contact page.
 * Example: "Rua das Flores, 456\nSão Paulo – SP, 04123-000"
 * Use \n to separate the two address lines.
 */
export const CONTACT_ADDRESS_DISPLAY: string | null =
  "Rua Melo Franco, nº 68\nSão Mateus, Juiz de Fora/MG"

/**
 * ⚠️ TODO: Structured address for schema.org JSON-LD.
 * Only used when CONTACT_ADDRESS_DISPLAY is non-null.
 */
export const CONTACT_ADDRESS_SCHEMA: PostalAddressSchema | null = null

/**
 * ⚠️ TODO (OPTIONAL): Google Maps embed URL or directions URL.
 * Shown as a "Ver no mapa" link on the contact page.
 * Example: "https://maps.google.com/?q=Rua+das+Flores+456+São+Paulo"
 */
export const CONTACT_MAP_URL: string | null = null

// ─── Social profiles ──────────────────────────────────────────────────────────

/**
 * ⚠️ TODO: Real social media profile URLs.
 * Used in Organization JSON-LD (sameAs) and the social block on /contato.
 *
 * Example:
 *   [
 *     "https://www.instagram.com/gokai_associacao",
 *     "https://www.facebook.com/gokai.associacao",
 *     "https://www.youtube.com/@gokai",
 *   ]
 */
export const SOCIAL_PROFILES: string[] = []

// ─── Legal entity ─────────────────────────────────────────────────────────────

/**
 * ⚠️ TODO: Official registered legal entity name.
 * Used in privacy policy and terms of use documents.
 * Example: "Associação Esportiva e Ambiental GŌKAI"
 */
export const LEGAL_ENTITY_NAME: string | null = "Associação Esportiva e Ambiental GŌKAI"

/**
 * ⚠️ TODO: CNPJ of the organization.
 * Required for formal legal disclosures and public documents.
 * Example: "00.000.000/0001-00"
 */
export const LEGAL_CNPJ: string | null = null

/**
 * ⚠️ TODO: Dedicated email for LGPD / privacy requests (DPO contact).
 * Can be the same as CONTACT_EMAIL initially.
 * Example: "privacidade@gokai.com.br"
 */
export const LEGAL_DPO_EMAIL: string | null = null
