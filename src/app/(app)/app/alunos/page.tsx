import { redirect } from "next/navigation"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { AlunosClient } from "./alunos-client"
import type { AlunoWithPessoa } from "@/types/database"

export default async function AlunosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: alunos } = await supabase
    .from("aluno")
    .select("*, pessoa(nome_completo, email, telefone, foto_url)")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Alunos"
        description="Gerencie os alunos matriculados na associação."
      >
        <Button render={<Link href="/app/alunos/novo" />}>
          <PlusIcon />
          Novo Aluno
        </Button>
      </PageHeader>
      <AlunosClient alunos={(alunos ?? []) as unknown as AlunoWithPessoa[]} />
    </div>
  )
}
