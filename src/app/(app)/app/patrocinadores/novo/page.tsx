import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { PageHeader } from "@/components/app/page-header"
import { NovoPatrocinadorForm } from "./novo-patrocinador-form"

export default async function NovoPatrocinadorPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Patrocinador"
        description="Cadastre um novo patrocinador da associação."
      />
      <NovoPatrocinadorForm />
    </div>
  )
}
