import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { OcorrenciasClient } from "./ocorrencias-client"

export default async function OcorrenciasPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data } = await supabase
    .from("ocorrencia_disciplinar")
    .select("*, aluno(id, pessoa(nome_completo))")
    .order("data", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ocorrências Disciplinares"
        description="Registro de ocorrências disciplinares dos alunos."
      >
        <Button render={<Link href="/app/ocorrencias/novo" />}>
          Nova Ocorrência
        </Button>
      </PageHeader>
      <OcorrenciasClient ocorrencias={(data ?? []) as any[]} />
    </div>
  )
}
