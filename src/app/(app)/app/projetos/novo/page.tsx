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

const tipoOptions = [
  { value: "social", label: "Social" },
  { value: "esportivo", label: "Esportivo" },
  { value: "educacional", label: "Educacional" },
  { value: "outro", label: "Outro" },
]

export default function NovoProjetoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (nome.length < 3 || !tipo) {
      toast.error("Preencha nome (mín. 3 caracteres) e tipo")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("projeto").insert({
      nome,
      descricao: descricao || null,
      tipo,
    })
    setLoading(false)
    if (error) {
      toast.error("Erro ao criar projeto")
    } else {
      toast.success("Projeto criado")
      router.push("/app/projetos")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Novo Projeto"
        description="Cadastre um novo projeto."
      />
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="space-y-2">
          <Label>Nome *</Label>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do projeto" />
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
          <Label>Descrição</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do projeto"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar Projeto"}
        </Button>
      </form>
    </div>
  )
}
