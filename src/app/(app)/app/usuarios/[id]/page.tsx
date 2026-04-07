import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { isAdmin } from "@/lib/auth/permissions"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Badge } from "@/components/ui/badge"
import { ROLE_LABELS } from "../usuarios-client"
import type { UsuarioInternoWithPessoa, UserRole } from "@/types/database"

interface Props {
  params: Promise<{ id: string }>
}

export default async function UsuarioDetailPage({ params }: Props) {
  const { id } = await params

  const user = await getServerUser()
  if (!user) redirect("/login")
  if (!isAdmin(user.role)) redirect("/app/dashboard")

  const supabase = await createClient()
  const { data: usuario } = await supabase
    .from("usuario_interno")
    .select("*, pessoa(*)")
    .eq("id", id)
    .single()

  if (!usuario) notFound()

  const u = usuario as UsuarioInternoWithPessoa
  const role = u.role as UserRole

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
          title={u.pessoa.nome_completo}
          description="Detalhes do usuário interno"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Nome completo</p>
          <p className="font-medium">{u.pessoa.nome_completo}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">E-mail</p>
          <p className="font-medium">{u.pessoa.email ?? "—"}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Cargo</p>
          <Badge variant={role === "presidente" || role === "vice_presidente" ? "default" : "secondary"}>
            {ROLE_LABELS[role] ?? role}
          </Badge>
        </div>
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge variant={u.ativo ? "default" : "outline"}>
            {u.ativo ? "Ativo" : "Inativo"}
          </Badge>
        </div>
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Telefone</p>
          <p className="font-medium">{u.pessoa.telefone ?? "—"}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Criado em</p>
          <p className="font-medium">
            {u.created_at
              ? new Date(u.created_at).toLocaleDateString("pt-BR")
              : "—"}
          </p>
        </div>
      </div>
    </div>
  )
}
