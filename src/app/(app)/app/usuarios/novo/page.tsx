import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"
import { PageHeader } from "@/components/app/page-header"
import { NovoUsuarioForm } from "./novo-usuario-form"

export default async function NovoUsuarioPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")
  if (!isAdmin(user.role)) redirect("/app/dashboard")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/app/usuarios"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeftIcon className="size-3.5" />
          Voltar para Usuários
        </Link>
        <PageHeader
          title="Novo Usuário"
          description="Cadastre um novo usuário interno no sistema."
        />
      </div>

      <div className="max-w-lg">
        <NovoUsuarioForm />
      </div>
    </div>
  )
}
