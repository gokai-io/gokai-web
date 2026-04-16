import { redirect } from "next/navigation"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { ProfessoresClient } from "./professores-client"
import type { ProfessorWithPessoa } from "@/types/database"

export default async function ProfessoresPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: professores } = await supabase
    .from("professor")
    .select("*, pessoa(*, usuario_interno(id, role, ativo))")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Professores"
        description="Gerencie os professores da associação."
      >
        <Button render={<Link href="/app/professores/novo" />}>
          <PlusIcon />
          Novo Professor
        </Button>
      </PageHeader>
      <ProfessoresClient
        professores={(professores ?? []) as ProfessorWithPessoa[]}
      />
    </div>
  )
}
