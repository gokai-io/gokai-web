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
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { EmptyState } from "@/components/app/empty-state"
import { Users } from "lucide-react"
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
  aluno: {
    id: string
    pessoa: {
      nome_completo: string
      email: string | null
    }
  }
}

interface Props {
  turmaId: string
  alunoTurmas: AlunoTurmaRow[]
}

export function TurmaAlunosSection({ turmaId, alunoTurmas }: Props) {
  const router = useRouter()
  const [removeTarget, setRemoveTarget] = useState<AlunoTurmaRow | null>(null)

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
          <CardTitle>Alunos Matriculados</CardTitle>
        </CardHeader>
        <CardContent>
          {alunoTurmas.length === 0 ? (
            <EmptyState
              icon={<Users />}
              title="Nenhum aluno matriculado nesta turma."
            />
          ) : (
            <div className="divide-y">
              {alunoTurmas.map((at) => (
                <div
                  key={at.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {at.aluno?.pessoa?.nome_completo ?? "—"}
                    </span>
                    {at.aluno?.pessoa?.email && (
                      <span className="text-xs text-muted-foreground">
                        {at.aluno.pessoa.email}
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
        title="Remover aluno da turma"
        description={`Tem certeza que deseja remover "${removeTarget?.aluno?.pessoa?.nome_completo}" desta turma?`}
        confirmLabel="Remover"
        variant="destructive"
        onConfirm={handleRemove}
      />
    </>
  )
}
