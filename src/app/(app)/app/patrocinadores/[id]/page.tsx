import { notFound, redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { PatrocinadorForm } from "./patrocinador-form"
import type { Patrocinador } from "@/types/database"

interface PatrocinadorDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PatrocinadorDetailPage({
  params,
}: PatrocinadorDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params

  const supabase = await createClient()
  const { data: patrocinador } = await supabase
    .from("patrocinador")
    .select("*")
    .eq("id", id)
    .single()

  if (!patrocinador) notFound()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={patrocinador.nome}
        description="Editar dados do patrocinador."
      />
      <PatrocinadorForm patrocinador={patrocinador as Patrocinador} />
    </div>
  )
}
