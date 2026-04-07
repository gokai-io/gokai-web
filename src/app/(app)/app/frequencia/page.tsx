import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerUser } from "@/lib/auth/server"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/app/page-header"
import { EmptyState } from "@/components/app/empty-state"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import type { TurmaWithRelations } from "@/types/database"

const DAY_NAMES: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
}

function formatTime(time: string | null): string {
  if (!time) return "—"
  return time.slice(0, 5)
}

function formatDays(days: number[] | null): string {
  if (!days || days.length === 0) return "—"
  return days.map((d) => DAY_NAMES[d] ?? d).join(", ")
}

export default async function FrequenciaPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const supabase = await createClient()
  const { data: turmas } = await supabase
    .from("turma")
    .select("*, modalidade(*), professor(*, pessoa(*))")
    .eq("status", "ativa")
    .order("nome", { ascending: true })

  const turmaList = (turmas ?? []) as unknown as TurmaWithRelations[]

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Frequência"
        description="Selecione uma turma para registrar frequência"
      />

      {turmaList.length === 0 ? (
        <EmptyState
          icon={<CalendarDays />}
          title="Nenhuma turma ativa encontrada"
          description="Crie turmas ativas para registrar frequência."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {turmaList.map((turma) => (
            <Card key={turma.id}>
              <CardHeader>
                <CardTitle>{turma.nome}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{turma.modalidade.nome}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Professor: </span>
                  {turma.professor.pessoa.nome_completo}
                </p>
                <p>
                  <span className="font-medium text-foreground">Dias: </span>
                  {formatDays(turma.dia_semana)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Horário: </span>
                  {turma.horario_inicio
                    ? `${formatTime(turma.horario_inicio)} – ${formatTime(turma.horario_fim)}`
                    : "—"}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  size="sm"
                  render={<Link href={`/app/frequencia/${turma.id}`} />}
                >
                  <CalendarDays />
                  Registrar Frequência
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
