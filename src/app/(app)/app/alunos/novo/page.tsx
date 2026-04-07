import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { AlunoForm } from "../[id]/aluno-form"

export default async function NovoAlunoPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()

  // Get max existing matricula number to generate next one
  const { data: lastAluno } = await supabase
    .from("aluno")
    .select("matricula")
    .like("matricula", `GOKAI-${new Date().getFullYear()}-%`)
    .order("matricula", { ascending: false })
    .limit(1)
    .maybeSingle()

  const year = new Date().getFullYear()
  let nextNumber = 1
  if (lastAluno?.matricula) {
    const parts = lastAluno.matricula.split("-")
    const last = parseInt(parts[parts.length - 1], 10)
    if (!isNaN(last)) nextNumber = last + 1
  }
  const generatedMatricula = `GOKAI-${year}-${String(nextNumber).padStart(4, "0")}`

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Novo Aluno" description="Preencha os dados para cadastrar um novo aluno.">
        <Button variant="outline" render={<Link href="/app/alunos" />}>
          Voltar
        </Button>
      </PageHeader>
      <AlunoForm generatedMatricula={generatedMatricula} />
    </div>
  )
}
