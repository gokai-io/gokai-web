"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ArrowLeft, Save } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TurmaWithRelations, AlunoWithPessoa, Frequencia } from "@/types/database"

const DAY_NAMES: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
}

interface AttendanceRow {
  aluno_id: string
  presente: boolean
  observacoes: string
}

interface FrequenciaClientProps {
  turma: TurmaWithRelations
  alunos: AlunoWithPessoa[]
}

function toDateString(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

export function FrequenciaClient({ turma, alunos }: FrequenciaClientProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loadingDate, setLoadingDate] = useState(false)

  const [rows, setRows] = useState<AttendanceRow[]>(() =>
    alunos.map((a) => ({ aluno_id: a.id, presente: false, observacoes: "" }))
  )

  const loadFrequenciaForDate = useCallback(
    async (date: Date) => {
      setLoadingDate(true)
      try {
        const supabase = createClient()
        const dateStr = toDateString(date)
        const { data: records } = await supabase
          .from("frequencia")
          .select("*")
          .eq("turma_id", turma.id)
          .eq("data", dateStr)

        const recordMap = new Map<string, Frequencia>(
          (records ?? []).map((r: Frequencia) => [r.aluno_id, r])
        )

        setRows(
          alunos.map((a) => {
            const existing = recordMap.get(a.id)
            return {
              aluno_id: a.id,
              presente: existing?.presente ?? false,
              observacoes: existing?.observacoes ?? "",
            }
          })
        )
      } catch {
        toast.error("Erro ao carregar frequência para a data selecionada.")
      } finally {
        setLoadingDate(false)
      }
    },
    [turma.id, alunos]
  )

  async function handleDateSelect(date: Date | undefined) {
    if (!date) return
    setSelectedDate(date)
    setCalendarOpen(false)
    await loadFrequenciaForDate(date)
  }

  function updateRow(aluno_id: string, field: "presente" | "observacoes", value: boolean | string) {
    setRows((prev) =>
      prev.map((r) =>
        r.aluno_id === aluno_id ? { ...r, [field]: value } : r
      )
    )
  }

  async function handleSave() {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const dateStr = toDateString(selectedDate)

      const upsertPayload = rows.map((r) => ({
        turma_id: turma.id,
        aluno_id: r.aluno_id,
        data: dateStr,
        presente: r.presente,
        observacoes: r.observacoes.trim() || null,
        ...(user ? { registrado_por: user.id } : {}),
      }))

      const { error } = await supabase
        .from("frequencia")
        .upsert(upsertPayload, { onConflict: "turma_id,aluno_id,data" })

      if (error) throw error

      toast.success("Frequência salva com sucesso!")
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao salvar frequência. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const presentCount = rows.filter((r) => r.presente).length
  const total = alunos.length

  const daysLabel =
    turma.dia_semana && turma.dia_semana.length > 0
      ? turma.dia_semana.map((d) => DAY_NAMES[d] ?? d).join(", ")
      : "—"

  const horarioLabel =
    turma.horario_inicio
      ? `${turma.horario_inicio.slice(0, 5)} – ${turma.horario_fim?.slice(0, 5) ?? "?"}`
      : "—"

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={turma.nome}
        description={`${turma.modalidade.nome} · Prof. ${turma.professor.pessoa.nome_completo} · ${daysLabel} · ${horarioLabel}`}
      >
        <Button variant="outline" size="sm" render={<Link href="/app/frequencia" />}>
          <ArrowLeft />
          Voltar
        </Button>
      </PageHeader>

      <Separator />

      {/* Date selector + summary */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Data:</span>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm" className="w-44 justify-start gap-2" />
              }
            >
              <CalendarIcon className="size-4 text-muted-foreground" />
              {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                locale={ptBR}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={presentCount === total && total > 0 ? "default" : "secondary"}>
            {presentCount} / {total} presentes
          </Badge>
          <Button size="sm" onClick={handleSave} disabled={saving || loadingDate}>
            <Save />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Attendance table */}
      {alunos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-base font-medium">Nenhum aluno matriculado nesta turma</p>
          <p className="text-sm text-muted-foreground">
            Adicione alunos à turma para registrar frequência.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">Presente</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead className="hidden sm:table-cell">Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alunos.map((aluno, idx) => {
              const row = rows[idx]
              return (
                <TableRow key={aluno.id} className={loadingDate ? "opacity-50" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={row.presente}
                      onCheckedChange={(checked) =>
                        updateRow(aluno.id, "presente", checked === true)
                      }
                      disabled={loadingDate}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {aluno.pessoa.nome_completo}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <input
                      type="text"
                      value={row.observacoes}
                      onChange={(e) => updateRow(aluno.id, "observacoes", e.target.value)}
                      placeholder="Observação (opcional)"
                      disabled={loadingDate}
                      className="h-7 w-full min-w-0 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
