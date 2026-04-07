/**
 * Detects if Supabase is properly configured.
 * Returns false when env vars are placeholders (local dev without Supabase).
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
