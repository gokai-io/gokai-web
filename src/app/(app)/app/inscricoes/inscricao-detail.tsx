"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { toast } from "sonner"
import { UserCheck, XCircle, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import type { Inscricao, InscricaoStatus } from "@/types/database"

const STATUS_LABELS: Record<InscricaoStatus, string> = {
  pendente: "Pendente",
  contatado: "Contatado",
  matriculado: "Matriculado",
  recusado: "Recusado",
}

const STATUS_BADGE_CLASS: Record<InscricaoStatus, string> = {
  pendente: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
  contatado: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  matriculado: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  recusado: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
}

interface InscricaoDetailProps {
  inscricao: Inscricao
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated: (updated: Inscricao) => void
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm">{value ?? "—"}</span>
    </div>
  )
}

function generateMatricula(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000) + 1000
  return `${year}${random}`
}

export function InscricaoDetail({
  inscricao,
  open,
  onOpenChange,
  onUpdated,
}: InscricaoDetailProps) {
  const [notas, setNotas] = useState(inscricao.observacoes ?? "")
  const [savingNotas, setSavingNotas] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newAlunoId, setNewAlunoId] = useState<string | null>(null)
  const [confirmRecusar, setConfirmRecusar] = useState(false)
  const [confirmConverter, setConfirmConverter] = useState(false)

  async function handleSaveNotas() {
    setSavingNotas(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("inscricao")
        .update({ observacoes: notas.trim() || null })
        .eq("id", inscricao.id)

      if (error) throw error
      toast.success("Observações salvas com sucesso.")
      onUpdated({ ...inscricao, observacoes: notas.trim() || null })
    } catch {
      toast.error("Erro ao salvar observações.")
    } finally {
      setSavingNotas(false)
    }
  }

  async function handleMarcarContatado() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("inscricao")
        .update({ status: "contatado" })
        .eq("id", inscricao.id)

      if (error) throw error
      const updated = { ...inscricao, status: "contatado" as InscricaoStatus }
      onUpdated(updated)
      toast.success("Inscrição marcada como contatada.")
    } catch {
      toast.error("Erro ao atualizar status.")
    } finally {
      setLoading(false)
    }
  }

  async function handleRecusar() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("inscricao")
        .update({ status: "recusado" })
        .eq("id", inscricao.id)

      if (error) throw error
      const updated = { ...inscricao, status: "recusado" as InscricaoStatus }
      onUpdated(updated)
      toast.success("Inscrição recusada.")
    } catch {
      toast.error("Erro ao recusar inscrição.")
    } finally {
      setLoading(false)
    }
  }

  async function handleConverterEmAluno() {
    setLoading(true)
    try {
      const supabase = createClient()

      // 1. Create pessoa
      const { data: pessoa, error: pessoaError } = await supabase
        .from("pessoa")
        .insert({
          nome_completo: inscricao.nome_completo,
          email: inscricao.email,
          telefone: inscricao.telefone,
          data_nascimento: inscricao.data_nascimento,
        })
        .select("id")
        .single()

      if (pessoaError || !pessoa) throw pessoaError ?? new Error("Falha ao criar pessoa")

      // 2. Create aluno
      const matricula = generateMatricula()
      const { data: aluno, error: alunoError } = await supabase
        .from("aluno")
        .insert({
          pessoa_id: pessoa.id,
          matricula,
          status: "ativo",
          eh_menor: inscricao.eh_menor,
        })
        .select("id")
        .single()

      if (alunoError || !aluno) throw alunoError ?? new Error("Falha ao criar aluno")

      // 3. If eh_menor, create responsavel_legal
      if (
        inscricao.eh_menor &&
        inscricao.responsavel_nome
      ) {
        const { error: responsavelError } = await supabase
          .from("responsavel_legal")
          .insert({
            aluno_id: aluno.id,
            nome: inscricao.responsavel_nome,
            telefone: inscricao.responsavel_telefone,
            parentesco: inscricao.responsavel_parentesco,
          })

        if (responsavelError) throw responsavelError
      }

      // 4. Update inscription status
      const { error: statusError } = await supabase
        .from("inscricao")
        .update({ status: "matriculado" })
        .eq("id", inscricao.id)

      if (statusError) throw statusError

      const updated = { ...inscricao, status: "matriculado" as InscricaoStatus }
      onUpdated(updated)
      setNewAlunoId(aluno.id)

      toast.success(
        `Aluno criado com matrícula ${matricula}! Clique em "Ver aluno" para acessar.`
      )
    } catch (err) {
      console.error(err)
      toast.error("Erro ao converter inscrição em aluno. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const isReadonly =
    inscricao.status === "matriculado" || inscricao.status === "recusado"

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{inscricao.nome_completo}</SheetTitle>
            <SheetDescription>
              <span
                className={`inline-flex h-5 items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASS[inscricao.status]}`}
              >
                {STATUS_LABELS[inscricao.status]}
              </span>
              {inscricao.created_at && (
                <span className="ml-2 text-xs text-muted-foreground">
                  Recebida em{" "}
                  {format(new Date(inscricao.created_at), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              )}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 px-4 pb-4">
            {/* Personal data */}
            <section className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">Dados Pessoais</h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoRow label="Nome completo" value={inscricao.nome_completo} />
                <InfoRow label="E-mail" value={inscricao.email} />
                <InfoRow label="Telefone" value={inscricao.telefone} />
                <InfoRow
                  label="Data de nascimento"
                  value={
                    inscricao.data_nascimento
                      ? format(new Date(inscricao.data_nascimento + "T00:00:00"), "dd/MM/yyyy")
                      : null
                  }
                />
                <InfoRow label="Modalidade de interesse" value={inscricao.modalidade_interesse} />
                <InfoRow
                  label="Menor de idade"
                  value={
                    inscricao.eh_menor ? (
                      <Badge variant="outline" className="text-xs">
                        Sim
                      </Badge>
                    ) : (
                      "Não"
                    )
                  }
                />
              </div>
            </section>

            {inscricao.experiencia_previa && (
              <>
                <Separator />
                <section className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Experiência Prévia</h3>
                  <p className="text-sm text-muted-foreground">{inscricao.experiencia_previa}</p>
                </section>
              </>
            )}

            {/* Responsável legal (if minor) */}
            {inscricao.eh_menor && (
              <>
                <Separator />
                <section className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold">Responsável Legal</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoRow label="Nome" value={inscricao.responsavel_nome} />
                    <InfoRow label="Telefone" value={inscricao.responsavel_telefone} />
                    <InfoRow label="Parentesco" value={inscricao.responsavel_parentesco} />
                  </div>
                </section>
              </>
            )}

            {/* Internal notes */}
            <Separator />
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">Observações Internas</h3>
              <Textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Adicione notas internas sobre esta inscrição..."
                className="min-h-24 resize-none"
                disabled={savingNotas}
              />
              <Button
                variant="outline"
                size="sm"
                className="self-end"
                onClick={handleSaveNotas}
                disabled={savingNotas}
              >
                {savingNotas ? "Salvando..." : "Salvar observações"}
              </Button>
            </section>

            {/* Link to new student if converted */}
            {newAlunoId && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                <p className="text-sm text-green-800 dark:text-green-300">
                  Aluno criado com sucesso!
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  render={<Link href={`/app/alunos/${newAlunoId}`} />}
                >
                  <ExternalLink />
                  Ver aluno
                </Button>
              </div>
            )}
          </div>

          {/* Action footer */}
          {!isReadonly && (
            <SheetFooter>
              {inscricao.status === "pendente" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={handleMarcarContatado}
                  >
                    <UserCheck />
                    Marcar como Contatado
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    onClick={() => setConfirmRecusar(true)}
                  >
                    <XCircle />
                    Recusar
                  </Button>
                </>
              )}

              {inscricao.status === "contatado" && (
                <>
                  <Button
                    size="sm"
                    disabled={loading}
                    onClick={() => setConfirmConverter(true)}
                  >
                    <UserCheck />
                    Converter em Aluno
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    onClick={() => setConfirmRecusar(true)}
                  >
                    <XCircle />
                    Recusar
                  </Button>
                </>
              )}
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmRecusar}
        onOpenChange={setConfirmRecusar}
        title="Recusar inscrição"
        description={`Tem certeza que deseja recusar a inscrição de ${inscricao.nome_completo}? Esta ação não pode ser desfeita.`}
        confirmLabel="Recusar"
        cancelLabel="Cancelar"
        variant="destructive"
        onConfirm={handleRecusar}
      />

      <ConfirmDialog
        open={confirmConverter}
        onOpenChange={setConfirmConverter}
        title="Converter em Aluno"
        description={`Deseja criar um cadastro de aluno para ${inscricao.nome_completo}? Será criada uma pessoa, um registro de aluno${inscricao.eh_menor ? " e um responsável legal" : ""} com os dados desta inscrição.`}
        confirmLabel="Converter"
        cancelLabel="Cancelar"
        onConfirm={handleConverterEmAluno}
      />
    </>
  )
}
