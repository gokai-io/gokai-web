import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { PageHeader } from "@/components/app/page-header"
import { TransparenciaForm } from "./transparencia-form"

export default async function NovoTransparenciaPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Documento"
        description="Adicione um novo documento à área de transparência."
      />
      <TransparenciaForm />
    </div>
  )
}
