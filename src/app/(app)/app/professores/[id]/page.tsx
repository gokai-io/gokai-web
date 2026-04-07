import { notFound, redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { ProfessorForm } from "./professor-form"
import type { ProfessorWithPessoa } from "@/types/database"

interface ProfessorDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProfessorDetailPage({
  params,
}: ProfessorDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params

  const supabase = await createClient()
  const { data: professor } = await supabase
    .from("professor")
    .select("*, pessoa(*)")
    .eq("id", id)
    .single()

  if (!professor) notFound()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={professor.pessoa.nome_completo}
        description="Editar dados do professor."
      />
      <ProfessorForm professor={professor as ProfessorWithPessoa} />
    </div>
  )
}
