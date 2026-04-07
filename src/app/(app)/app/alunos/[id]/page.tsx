import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlunoForm } from "./aluno-form"
import { AlunoTurmas } from "./aluno-turmas"
import type { AlunoWithResponsavel, DocumentoTipo, OcorrenciaTipo } from "@/types/database"

interface Props {
  params: Promise<{ id: string }>
}

export default async function AlunoDetailPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()

  const [{ data: aluno }, { data: alunoTurmas }, { data: allTurmas }, { data: documentos }, { data: ocorrencias }, { data: avaliacoes }, { data: projetosMembro }] = await Promise.all([
    supabase
      .from("aluno")
      .select("*, pessoa(nome_completo, cpf, email, telefone, data_nascimento, foto_url), responsavel_legal(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("aluno_turma")
      .select("*, turma(*, modalidade(nome), professor(*, pessoa(nome_completo)))")
      .eq("aluno_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("turma")
      .select("id, nome, status")
      .eq("status", "ativa")
      .order("nome"),
    supabase
      .from("documento_comprobatorio")
      .select("*")
      .eq("aluno_id", id)
      .order("data_upload", { ascending: false }),
    supabase
      .from("ocorrencia_disciplinar")
      .select("*")
      .eq("aluno_id", id)
      .order("data", { ascending: false }),
    supabase
      .from("avaliacao_evolucao")
      .select("*")
      .eq("aluno_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("projeto_membro")
      .select("*, projeto(nome, tipo, status)")
      .eq("aluno_id", id)
      .order("data_entrada", { ascending: false }),
  ])

  if (!aluno) notFound()

  const nome = (aluno as any).pessoa?.nome_completo ?? "Aluno"

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={nome}
        description="Edite os dados do aluno ou gerencie suas matrículas em turmas."
      >
        <Button variant="outline" render={<Link href="/app/alunos" />}>
          Voltar
        </Button>
      </PageHeader>

      <AlunoForm aluno={aluno as unknown as AlunoWithResponsavel} />

      <Separator />

      <AlunoTurmas
        alunoId={id}
        alunoTurmas={(alunoTurmas ?? []) as unknown as any[]}
        allTurmas={(allTurmas ?? []) as { id: string; nome: string; status: string }[]}
      />

      <Separator />

      <Tabs defaultValue="documentos">
        <TabsList>
          <TabsTrigger value="documentos">Documentos ({(documentos ?? []).length})</TabsTrigger>
          <TabsTrigger value="ocorrencias">Ocorrências ({(ocorrencias ?? []).length})</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações ({(avaliacoes ?? []).length})</TabsTrigger>
          <TabsTrigger value="projetos">Projetos ({(projetosMembro ?? []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="mt-4">
          {(documentos ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum documento registrado.</p>
          ) : (
            <div className="space-y-2">
              {(documentos as any[]).map((d: any) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <span className="text-sm font-medium">{(({ boletim_escolar: "Boletim Escolar", comprovante_matricula: "Comprov. Matrícula", comprovante_trabalho: "Comprov. Trabalho", historico_escolar: "Histórico Escolar", outro: "Outro" }) as Record<string, string>)[d.tipo as string] ?? d.tipo}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("pt-BR").format(new Date(d.data_upload))}
                    </span>
                  </div>
                  <Badge variant={d.validado ? "default" : "secondary"}>
                    {d.validado ? "Validado" : "Pendente"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ocorrencias" className="mt-4">
          {(ocorrencias ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma ocorrência registrada.</p>
          ) : (
            <div className="space-y-2">
              {(ocorrencias as any[]).map((o: any) => (
                <div key={o.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Badge variant="secondary" className="mr-2">
                      {(({ advertencia: "Advertência", suspensao: "Suspensão", exclusao: "Exclusão" }) as Record<string, string>)[o.tipo as string] ?? o.tipo}
                    </Badge>
                    <span className="text-sm">{o.motivo}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("pt-BR").format(new Date(o.data))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="avaliacoes" className="mt-4">
          {(avaliacoes ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma avaliação registrada.</p>
          ) : (
            <div className="space-y-2">
              {(avaliacoes as any[]).map((a: any) => (
                <Link
                  key={a.id}
                  href={`/app/avaliacoes/${a.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-medium">{a.periodo}</span>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    {a.comportamento != null && <span>Comp: {a.comportamento}</span>}
                    {a.disciplina != null && <span>Disc: {a.disciplina}</span>}
                    {a.frequencia != null && <span>Freq: {a.frequencia}</span>}
                    {a.desempenho != null && <span>Desemp: {a.desempenho}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projetos" className="mt-4">
          {(projetosMembro ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum projeto associado.</p>
          ) : (
            <div className="space-y-2">
              {(projetosMembro as any[]).map((pm: any) => (
                <Link
                  key={pm.id}
                  href={`/app/projetos/${pm.projeto_id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-medium">{pm.projeto?.nome ?? "—"}</span>
                  <span className="text-xs text-muted-foreground">
                    Desde {new Intl.DateTimeFormat("pt-BR").format(new Date(pm.data_entrada))}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
