import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { BootstrapForm } from "./bootstrap-form"

export default async function BootstrapPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login")
  }

  const admin = createAdminClient()
  const { count } = await admin
    .from("usuario_interno")
    .select("id", { count: "exact", head: true })

  if (count && count > 0) {
    redirect("/login")
  }

  return <BootstrapForm />
}
