"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Contato, ContatoStatus } from "@/types/database"

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<ContatoStatus, string> = {
  novo: "Novo",
  lido: "Lido",
  respondido: "Respondido",
  arquivado: "Arquivado",
}

const STATUS_BADGE_CLASS: Record<ContatoStatus, string> = {
  novo: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
  lido: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  respondido: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  arquivado: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400",
}

type TabValue = "todos" | ContatoStatus

const TABS: { value: TabValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "novo", label: "Novos" },
  { value: "lido", label: "Lidos" },
  { value: "respondido", label: "Respondidos" },
  { value: "arquivado", label: "Arquivados" },
]

// ─── Component ────────────────────────────────────────────────────────────────

interface ContatosClientProps {
  contatos: Contato[]
}

export function ContatosClient({ contatos: initialContatos }: ContatosClientProps) {
  const [contatos, setContatos] = useState<Contato[]>(initialContatos)
  const [activeTab, setActiveTab] = useState<TabValue>("todos")
  const [selected, setSelected] = useState<Contato | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  function handleRowClick(contato: Contato) {
    setSelected(contato)
    setDialogOpen(true)
  }

  async function updateStatus(id: string, status: ContatoStatus) {
    setUpdating(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("contato")
        .update({ status })
        .eq("id", id)

      if (error) throw error

      const updated = contatos.map((c) => (c.id === id ? { ...c, status } : c))
      setContatos(updated)

      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, status } : prev))
      }

      toast.success(`Status atualizado para "${STATUS_LABELS[status]}".`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      toast.error(`Erro ao atualizar status: ${message}`)
    } finally {
      setUpdating(false)
    }
  }

  const filtered =
    activeTab === "todos"
      ? contatos
      : contatos.filter((c) => c.status === activeTab)

  const columns: Column<Contato>[] = [
    {
      key: "nome",
      header: "Nome",
      cell: (item) => <span className="font-medium">{item.nome}</span>,
    },
    {
      key: "email",
      header: "E-mail",
      className: "hidden md:table-cell",
      cell: (item) => item.email,
    },
    {
      key: "assunto",
      header: "Assunto",
      className: "hidden lg:table-cell",
      cell: (item) => (
        <span className="max-w-xs truncate block">{item.assunto}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
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
      className: "hidden sm:table-cell",
      cell: (item) =>
        item.created_at
          ? format(new Date(item.created_at), "dd/MM/yyyy", { locale: ptBR })
          : "—",
    },
    {
      key: "acoes",
      header: "",
      cell: (item) => (
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
              {tab.value !== "todos" && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({contatos.filter((c) => c.status === tab.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <DataTable<Contato>
              columns={columns}
              data={filtered}
              onRowClick={handleRowClick}
              emptyMessage="Nenhum contato encontrado."
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Detail Dialog */}
      {selected && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.assunto}</DialogTitle>
              <DialogDescription>
                Mensagem recebida de {selected.nome}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Nome</p>
                  <p className="font-medium">{selected.nome}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">E-mail</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                {selected.telefone && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Telefone</p>
                    <p className="font-medium">{selected.telefone}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Data</p>
                  <p className="font-medium">
                    {selected.created_at
                      ? format(new Date(selected.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                  <span
                    className={`inline-flex h-5 items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASS[selected.status]}`}
                  >
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Mensagem</p>
                <div className="rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.mensagem}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selected.status !== "lido" && selected.status !== "respondido" && selected.status !== "arquivado" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    onClick={() => updateStatus(selected.id, "lido")}
                  >
                    Marcar como Lido
                  </Button>
                )}
                {selected.status !== "respondido" && selected.status !== "arquivado" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    onClick={() => updateStatus(selected.id, "respondido")}
                  >
                    Marcar como Respondido
                  </Button>
                )}
                {selected.status !== "arquivado" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    onClick={() => updateStatus(selected.id, "arquivado")}
                  >
                    Arquivar
                  </Button>
                )}
                {selected.status === "arquivado" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    onClick={() => updateStatus(selected.id, "novo")}
                  >
                    Reabrir
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
