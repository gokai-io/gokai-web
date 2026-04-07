"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable, type Column } from "@/components/app/data-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AlunoWithPessoa, AlunoStatus } from "@/types/database"

const statusVariant: Record<AlunoStatus, "default" | "secondary" | "destructive" | "outline"> = {
  ativo: "default",
  inativo: "secondary",
  trancado: "destructive",
  transferido: "outline",
}

const statusLabel: Record<AlunoStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  trancado: "Trancado",
  transferido: "Transferido",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface AlunoWithFoto extends AlunoWithPessoa {
  pessoa: AlunoWithPessoa["pessoa"] & { foto_url?: string | null }
}

interface Props {
  alunos: AlunoWithFoto[]
}

export function AlunosClient({ alunos }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const filtered = alunos.filter((a) =>
    a.pessoa?.nome_completo?.toLowerCase().includes(search.toLowerCase())
  )

  const columns: Column<AlunoWithFoto>[] = [
    {
      key: "foto",
      header: "Foto",
      cell: (item) => {
        const nome = item.pessoa?.nome_completo ?? ""
        return (
          <Avatar size="sm">
            {item.pessoa?.foto_url && (
              <AvatarImage src={item.pessoa.foto_url} alt={nome} />
            )}
            <AvatarFallback>{getInitials(nome)}</AvatarFallback>
          </Avatar>
        )
      },
      className: "w-12",
    },
    {
      key: "nome",
      header: "Nome",
      cell: (item) => item.pessoa?.nome_completo ?? "—",
    },
    {
      key: "matricula",
      header: "Matrícula",
      cell: (item) => item.matricula ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <Badge variant={statusVariant[item.status]}>
          {statusLabel[item.status]}
        </Badge>
      ),
    },
    {
      key: "eh_menor",
      header: "Menor",
      cell: (item) =>
        item.eh_menor ? (
          <Badge variant="secondary">Menor</Badge>
        ) : null,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/app/alunos/${item.id}`)}
        emptyMessage="Nenhum aluno encontrado."
      />
    </div>
  )
}
