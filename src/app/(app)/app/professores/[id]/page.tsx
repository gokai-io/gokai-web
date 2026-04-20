import { notFound, redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { ProfessorForm } from "./professor-form"
import { AcessoCard } from "./acesso-card"
import type {
  Modalidade,
  ProfessorWithPessoa,
  UserRole,
} from "@/types/database"

interface ProfessorDetailPageProps {
  params: Promise<{ id: string }>
}

type UsuarioInternoRow = {
  id: string
  pessoa_id: string
  role: UserRole
  ativo: boolean
  pessoa: {
    id: string
    nome_completo: string
    email: string | null
  } | null
}

export default async function ProfessorDetailPage({
  params,
}: ProfessorDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params

  const supabase = await createClient()
  const [
    { data: professor },
    { data: modalidades },
    { data: allUsuarios },
    { data: professoresAll },
  ] = await Promise.all([
    supabase.from("professor").select("*, pessoa(*)").eq("id", id).single(),
    supabase
      .from("modalidade")
      .select("id, nome, slug")
      .eq("ativa", true)
      .order("ordem", { ascending: true }),
    supabase
      .from("usuario_interno")
      .select(
        "id, pessoa_id, role, ativo, pessoa:pessoa(id, nome_completo, email)"
      ),
    supabase.from("professor").select("pessoa_id"),
  ])

  if (!professor) notFound()

  const professorTyped = professor as ProfessorWithPessoa
  const pessoaId = professorTyped.pessoa.id
  const usuarios = (allUsuarios ?? []) as unknown as UsuarioInternoRow[]

  const vinculado = usuarios.find((u) => u.pessoa_id === pessoaId)
  const usuarioVinculado = vinculado
    ? { id: vinculado.id, role: vinculado.role, ativo: vinculado.ativo }
    : null

  const pessoaIdsComProfessor = new Set(
    ((professoresAll ?? []) as Array<{ pessoa_id: string }>).map((p) => p.pessoa_id)
  )

  const usuariosLivres = usuarios
    .filter((u) => !pessoaIdsComProfessor.has(u.pessoa_id))
    .filter((u) => u.pessoa)
    .map((u) => ({
      id: u.id,
      role: u.role,
      ativo: u.ativo,
      pessoa: {
        id: u.pessoa!.id,
        nome_completo: u.pessoa!.nome_completo,
        email: u.pessoa!.email,
      },
    }))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={professorTyped.pessoa.nome_completo}
        description="Editar dados do professor."
      />

      <AcessoCard
        professorId={professorTyped.id}
        pessoaId={pessoaId}
        pessoaNome={professorTyped.pessoa.nome_completo}
        pessoaEmail={professorTyped.pessoa.email}
        usuarioVinculado={usuarioVinculado}
        usuariosLivres={usuariosLivres}
      />

      <ProfessorForm
        professor={professorTyped}
        modalidades={(modalidades ?? []) as Modalidade[]}
      />
    </div>
  )
}
