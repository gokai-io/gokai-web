"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { PageHeader } from "@/components/app/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const tipoOptions = [
  { value: "advertencia", label: "Advertência" },
  { value: "suspensao", label: "Suspensão" },
  { value: "exclusao", label: "Exclusão" },
]

export default function NovaOcorrenciaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alunoId, setAlunoId] = useState("")
  const [tipo, setTipo] = useState("")
  const [motivo, setMotivo] = useState("")
  const [data, setData] = useState(new Date().toISOString().split("T")[0])
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!alunoId || !tipo || motivo.length < 5) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("ocorrencia_disciplinar").insert({
      aluno_id: alunoId,
      tipo,
      motivo,
      data,
    })
    setLoading(false)
    if (error) {
      toast.error("Erro ao registrar ocorrência")
    } else {
      toast.success("Ocorrência registrada")
      router.push("/app/ocorrencias")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nova Ocorrência"
        description="Registre uma ocorrência disciplinar."
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
          <Label>Tipo *</Label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione...</option>
            {tipoOptions.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Data</Label>
          <input
            type="date"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Motivo *</Label>
          <Textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Descreva o motivo da ocorrência (mín. 5 caracteres)"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Registrar Ocorrência"}
        </Button>
      </form>
    </div>
  )
}
