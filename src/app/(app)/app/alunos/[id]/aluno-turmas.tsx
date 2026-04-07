"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { EmptyState } from "@/components/app/empty-state"
import { CalendarDays, PlusIcon } from "lucide-react"
import type { AlunoTurmaStatus } from "@/types/database"

const statusVariant: Record<AlunoTurmaStatus, "default" | "secondary" | "destructive"> = {
  ativo: "default",
  inativo: "secondary",
  trancado: "destructive",
}

const statusLabel: Record<AlunoTurmaStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  trancado: "Trancado",
}

interface AlunoTurmaRow {
  id: string
  status: AlunoTurmaStatus
  data_entrada: string | null
  turma: {
    id: string
    nome: string
    modalidade?: { nome: string } | null
    professor?: { pessoa?: { nome_completo: string } | null } | null
  }
}

interface TurmaOption {
  id: string
  nome: string
  status: string
}

interface Props {
  alunoId: string
  alunoTurmas: AlunoTurmaRow[]
  allTurmas: TurmaOption[]
}

export function AlunoTurmas({ alunoId, alunoTurmas, allTurmas }: Props) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTurmaId, setSelectedTurmaId] = useState<string>("")
  const [adding, setAdding] = useState(false)
  const [removeTarget, setRemoveTarget] = useState<AlunoTurmaRow | null>(null)

  const enrolledTurmaIds = new Set(alunoTurmas.map((at) => at.turma?.id))
  const availableTurmas = allTurmas.filter((t) => !enrolledTurmaIds.has(t.id))

  async function handleAdd() {
    if (!selectedTurmaId) return
    setAdding(true)
    const supabase = createClient()
    const { error } = await supabase.from("aluno_turma").insert({
      aluno_id: alunoId,
      turma_id: selectedTurmaId,
      status: "ativo",
      data_entrada: new Date().toISOString().slice(0, 10),
    })
    setAdding(false)
    if (error) {
      alert("Erro ao matricular aluno: " + error.message)
      return
    }
    setDialogOpen(false)
    setSelectedTurmaId("")
    router.refresh()
  }

  async function handleRemove() {
    if (!removeTarget) return
    const supabase = createClient()
    await supabase.from("aluno_turma").delete().eq("id", removeTarget.id)
    router.refresh()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Turmas Matriculadas</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger
                render={
                  <Button variant="outline" size="sm">
                    <PlusIcon />
                    Adicionar turma
                  </Button>
                }
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Matricular em turma</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-2">
                  {availableTurmas.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Nenhuma turma ativa disponível para matrícula.
                    </p>
                  ) : (
                    <Select value={selectedTurmaId} onValueChange={(v) => setSelectedTurmaId(v ?? "")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma turma" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTurmas.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={adding}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAdd}
                    disabled={adding || !selectedTurmaId}
                  >
                    {adding ? "Matriculando..." : "Matricular"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {alunoTurmas.length === 0 ? (
            <EmptyState
              icon={<CalendarDays />}
              title="Aluno não matriculado em nenhuma turma."
            />
          ) : (
            <div className="divide-y">
              {alunoTurmas.map((at) => (
                <div key={at.id} className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{at.turma?.nome ?? "—"}</span>
                    {at.turma?.modalidade?.nome && (
                      <span className="text-xs text-muted-foreground">
                        {at.turma.modalidade.nome}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[at.status]}>
                      {statusLabel[at.status]}
                    </Badge>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setRemoveTarget(at)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!removeTarget}
        onOpenChange={(open) => { if (!open) setRemoveTarget(null) }}
        title="Remover matrícula"
        description={`Tem certeza que deseja remover a matrícula na turma "${removeTarget?.turma?.nome}"?`}
        confirmLabel="Remover"
        variant="destructive"
        onConfirm={handleRemove}
      />
    </>
  )
}
