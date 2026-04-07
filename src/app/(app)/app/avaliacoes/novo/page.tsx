"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function NovaAvaliacaoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alunoId, setAlunoId] = useState("")
  const [periodo, setPeriodo] = useState("")
  const [comportamento, setComportamento] = useState("")
  const [disciplina, setDisciplina] = useState("")
  const [frequencia, setFrequencia] = useState("")
  const [desempenho, setDesempenho] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [alunos, setAlunos] = useState<{ id: string; nome: string }[]>([])
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    setLoaded(true)
    const supabase = createClient()
    supabase
      .from("aluno")
      .select("id, pessoa(nome_completo)")
      .eq("status", "ativo")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: any }) => {
        setAlunos(
          (data ?? []).map((a: any) => ({
            id: a.id,
            nome: a.pessoa?.nome_completo ?? "—",
          }))
        )
      })
  }

  function parseNota(v: string): number | null {
    if (!v) return null
    const n = parseInt(v, 10)
    return n >= 1 && n <= 10 ? n : null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!alunoId || !periodo) {
      toast.error("Selecione o aluno e informe o período")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("avaliacao_evolucao").insert({
      aluno_id: alunoId,
      periodo,
      comportamento: parseNota(comportamento),
      disciplina: parseNota(disciplina),
      frequencia: parseNota(frequencia),
      desempenho: parseNota(desempenho),
      observacoes: observacoes || null,
    })
    setLoading(false)
    if (error) {
      toast.error("Erro ao salvar avaliação")
    } else {
      toast.success("Avaliação registrada")
      router.push("/app/avaliacoes")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nova Avaliação"
        description="Registre uma avaliação de evolução do aluno."
      />
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="space-y-2">
          <Label>Aluno *</Label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Período *</Label>
          <Input
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            placeholder="Ex: 2025-Q1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Comportamento (1-10)</Label>
            <Input type="number" min={1} max={10} value={comportamento} onChange={(e) => setComportamento(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Disciplina (1-10)</Label>
            <Input type="number" min={1} max={10} value={disciplina} onChange={(e) => setDisciplina(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Frequência (1-10)</Label>
            <Input type="number" min={1} max={10} value={frequencia} onChange={(e) => setFrequencia(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Desempenho (1-10)</Label>
            <Input type="number" min={1} max={10} value={desempenho} onChange={(e) => setDesempenho(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Observações</Label>
          <Textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Observações sobre a evolução do aluno"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Registrar Avaliação"}
        </Button>
      </form>
    </div>
  )
}
