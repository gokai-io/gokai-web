import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { AvaliacoesClient } from "./avaliacoes-client"

export default async function AvaliacoesPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data } = await supabase
    .from("avaliacao_evolucao")
    .select("*, aluno(id, pessoa(nome_completo))")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Avaliações de Evolução"
        description="Avaliações periódicas de evolução dos alunos."
      >
        <Button render={<Link href="/app/avaliacoes/novo" />}>
          Nova Avaliação
        </Button>
      </PageHeader>
      <AvaliacoesClient avaliacoes={(data ?? []) as any[]} />
    </div>
  )
}
