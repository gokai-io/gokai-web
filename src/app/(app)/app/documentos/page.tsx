import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { DocumentosClient } from "./documentos-client"

export default async function DocumentosPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data } = await supabase
    .from("documento_comprobatorio")
    .select("*, aluno(id, pessoa(nome_completo))")
    .order("data_upload", { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Documentos"
        description="Documentos comprobatórios dos alunos."
      />
      <DocumentosClient documentos={(data ?? []) as any[]} />
    </div>
  )
}
