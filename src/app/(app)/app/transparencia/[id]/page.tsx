import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { MarkdownRenderer } from "@/components/shared/markdown-renderer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, PencilIcon, DownloadIcon } from "lucide-react"
import type { Transparencia, TransparenciaVersao } from "@/types/database"

interface TransparenciaDetailPageProps {
  params: Promise<{ id: string }>
}

const tipoLabel: Record<Transparencia["tipo"], string> = {
  ata: "Ata",
  balanco: "Balanço",
  relatorio: "Relatório",
  estatuto: "Estatuto",
  outro: "Outro",
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export default async function TransparenciaDetailPage({ params }: TransparenciaDetailPageProps) {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("transparencia")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) notFound()

  const documento = data as Transparencia

  // Fetch version history
  const { data: versoes } = await supabase
    .from("transparencia_versao")
    .select("id, versao, created_at, editado_por")
    .eq("transparencia_id", id)
    .order("versao", { ascending: false })

  const versionList = (versoes ?? []) as Pick<TransparenciaVersao, "id" | "versao" | "created_at" | "editado_por">[]

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={documento.titulo}
        description={`${tipoLabel[documento.tipo]} — ${dateFormatter.format(new Date(`${documento.data_referencia}T00:00:00`))}`}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          render={<Link href="/app/transparencia" />}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          {documento.arquivo_url && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={documento.arquivo_url} target="_blank" rel="noopener noreferrer" />}
            >
              <DownloadIcon />
              Baixar arquivo
            </Button>
          )}
          <Button
            size="sm"
            render={<Link href={`/app/transparencia/${documento.id}/editar`} />}
          >
            <PencilIcon />
            Editar
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <Badge variant={documento.publicado ? "default" : "outline"}>
          {documento.publicado ? "Publicado" : "Rascunho"}
        </Badge>
      </div>

      {/* Description */}
      {documento.descricao && (
        <Card>
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{documento.descricao}</p>
          </CardContent>
        </Card>
      )}

      {/* Markdown content */}
      {documento.conteudo && (
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={documento.conteudo} />
          </CardContent>
        </Card>
      )}

      {/* Version history */}
      {versionList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Versões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {versionList.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                >
                  <span className="font-medium">Versão {v.versao}</span>
                  <span className="text-muted-foreground">
                    {v.created_at
                      ? dateTimeFormatter.format(new Date(v.created_at))
                      : "—"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
