import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { PageHeader } from "@/components/app/page-header"
import { NovoProfessorForm } from "./novo-professor-form"

export default async function NovoProfessorPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Professor"
        description="Cadastre um novo professor na associação."
      />
      <NovoProfessorForm />
    </div>
  )
}
