import { redirect, notFound } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { EditarTransparenciaForm } from "./editar-transparencia-form"
import type { Transparencia } from "@/types/database"

interface EditarTransparenciaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditarTransparenciaPage({ params }: EditarTransparenciaPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("transparencia")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) notFound()

  const documento = data as Transparencia

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Editar Documento"
        description={`Editando: ${documento.titulo}`}
      />
      <EditarTransparenciaForm documento={documento} />
    </div>
  )
}
