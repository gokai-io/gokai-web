import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Projeto, ProjetoTipo, ProjetoStatus } from "@/types/database"

const tipoLabel: Record<ProjetoTipo, string> = {
  social: "Social",
  esportivo: "Esportivo",
  educacional: "Educacional",
  outro: "Outro",
}

const statusLabel: Record<ProjetoStatus, string> = {
  planejamento: "Planejamento",
  ativo: "Ativo",
  concluido: "Concluído",
  cancelado: "Cancelado",
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProjetoDetailPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const [{ data: projeto }, { data: membros }] = await Promise.all([
    supabase.from("projeto").select("*").eq("id", id).single(),
    supabase
      .from("projeto_membro")
      .select("*, aluno(id, pessoa(nome_completo))")
      .eq("projeto_id", id)
      .order("data_entrada", { ascending: false }),
  ])

  if (!projeto) notFound()

  const p = projeto as Projeto

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={p.nome}
        description={p.descricao ?? "Sem descrição"}
      >
        <Button variant="outline" render={<Link href="/app/projetos" />}>
          Voltar
        </Button>
      </PageHeader>

      <div className="flex gap-3">
        <Badge variant="secondary">{tipoLabel[p.tipo]}</Badge>
        <Badge variant="outline">{statusLabel[p.status]}</Badge>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Membros do Projeto</h3>
        {(membros ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum membro associado.</p>
        ) : (
          <div className="space-y-2">
            {(membros ?? []).map((m: any) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm font-medium">
                  {m.aluno?.pessoa?.nome_completo ?? "—"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Desde {new Intl.DateTimeFormat("pt-BR").format(new Date(m.data_entrada))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
