import { notFound, redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { EventoForm } from "./evento-form"
import type { EventoWithCampeonatoRelations, Modalidade } from "@/types/database"

interface EventoDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EventoDetailPage({ params }: EventoDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params
  const supabase = await createClient()

  const [{ data: evento }, { data: modalidades }] = await Promise.all([
    supabase
      .from("evento")
      .select("*, campeonato(*, modalidade(*))")
      .eq("id", id)
      .single(),
    supabase.from("modalidade").select("*").eq("ativa", true).order("nome"),
  ])

  if (!evento) notFound()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={evento.titulo}
        description="Editar dados do evento."
      />
      <EventoForm
        evento={evento as unknown as EventoWithCampeonatoRelations}
        modalidades={(modalidades ?? []) as Modalidade[]}
      />
    </div>
  )
}
