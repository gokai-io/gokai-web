import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { TurmasClient } from "./turmas-client"
import type { TurmaWithRelations } from "@/types/database"

export default async function TurmasPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: turmas } = await supabase
    .from("turma")
    .select("*, modalidade(nome), professor(*, pessoa(nome_completo))")
    .order("nome", { ascending: true })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Turmas"
        description="Gerencie as turmas e horários da associação."
      >
        <Button render={<Link href="/app/turmas/novo" />}>
          Nova Turma
        </Button>
      </PageHeader>
      <TurmasClient turmas={(turmas ?? []) as unknown as TurmaWithRelations[]} />
    </div>
  )
}
