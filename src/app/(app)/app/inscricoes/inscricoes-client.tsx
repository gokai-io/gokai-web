"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DataTable } from "@/components/app/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { InscricaoDetail } from "./inscricao-detail"
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

type TabValue = "todas" | InscricaoStatus

const TABS: { value: TabValue; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendente", label: "Pendentes" },
  { value: "contatado", label: "Contatados" },
  { value: "matriculado", label: "Matriculados" },
  { value: "recusado", label: "Recusados" },
]

interface InscricoesClientProps {
  inscricoes: Inscricao[]
}

export function InscricoesClient({ inscricoes: initialInscricoes }: InscricoesClientProps) {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>(initialInscricoes)
  const [activeTab, setActiveTab] = useState<TabValue>("todas")
  const [selectedInscricao, setSelectedInscricao] = useState<Inscricao | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function handleRowClick(inscricao: Inscricao) {
    setSelectedInscricao(inscricao)
    setSheetOpen(true)
  }

  function handleInscricaoUpdated(updated: Inscricao) {
    setInscricoes((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    )
    setSelectedInscricao(updated)
  }

  const filtered =
    activeTab === "todas"
      ? inscricoes
      : inscricoes.filter((i) => i.status === activeTab)

  const columns = [
    {
      key: "nome_completo",
      header: "Nome",
      cell: (item: Inscricao) => (
        <span className="font-medium">{item.nome_completo}</span>
      ),
    },
    {
      key: "email",
      header: "E-mail",
      className: "hidden md:table-cell",
      cell: (item: Inscricao) => item.email ?? "—",
    },
    {
      key: "telefone",
      header: "Telefone",
      className: "hidden lg:table-cell",
      cell: (item: Inscricao) => item.telefone ?? "—",
    },
    {
      key: "modalidade_interesse",
      header: "Modalidade",
      className: "hidden md:table-cell",
      cell: (item: Inscricao) => item.modalidade_interesse ?? "—",
    },
    {
      key: "eh_menor",
      header: "Menor",
      className: "hidden sm:table-cell",
      cell: (item: Inscricao) =>
        item.eh_menor ? (
          <Badge variant="outline">Menor</Badge>
        ) : null,
    },
    {
      key: "status",
      header: "Status",
      cell: (item: Inscricao) => (
        <span
          className={`inline-flex h-5 items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASS[item.status]}`}
        >
          {STATUS_LABELS[item.status]}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Data",
      className: "hidden lg:table-cell",
      cell: (item: Inscricao) =>
        item.created_at
          ? format(new Date(item.created_at), "dd/MM/yyyy", { locale: ptBR })
          : "—",
    },
    {
      key: "acoes",
      header: "",
      cell: (item: Inscricao) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            handleRowClick(item)
          }}
        >
          Ver
        </Button>
      ),
    },
  ]

  return (
    <>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              {tab.value !== "todas" && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({inscricoes.filter((i) => i.status === tab.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <DataTable<Inscricao>
              columns={columns}
              data={filtered}
              onRowClick={(item) => handleRowClick(item)}
              emptyMessage="Nenhuma inscrição encontrada."
            />
          </TabsContent>
        ))}
      </Tabs>

      {selectedInscricao && (
        <InscricaoDetail
          inscricao={selectedInscricao}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onUpdated={handleInscricaoUpdated}
        />
      )}
    </>
  )
}
