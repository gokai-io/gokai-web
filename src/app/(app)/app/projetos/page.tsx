import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { ProjetosClient } from "./projetos-client"
import type { Projeto } from "@/types/database"

export default async function ProjetosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data } = await supabase
    .from("projeto")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projetos"
        description="Projetos sociais, esportivos e educacionais."
      >
        <Button render={<Link href="/app/projetos/novo" />}>
          Novo Projeto
        </Button>
      </PageHeader>
      <ProjetosClient projetos={(data ?? []) as Projeto[]} />
    </div>
  )
}
