"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2Icon, ExternalLinkIcon } from "lucide-react"
import Image from "next/image"

import { createClient } from "@/lib/supabase/client"
import { DataTable, type Column } from "@/components/app/data-table"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Patrocinador } from "@/types/database"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const nivelLabel: Record<Patrocinador["nivel"], string> = {
  ouro: "Ouro",
  prata: "Prata",
  bronze: "Bronze",
  apoiador: "Apoiador",
}

const tipoLabel: Record<Patrocinador["tipo"], string> = {
  pessoa_fisica: "Pessoa Física",
  pessoa_juridica: "Pessoa Jurídica",
}

function NivelBadge({ nivel }: { nivel: Patrocinador["nivel"] }) {
  const classMap: Record<Patrocinador["nivel"], string> = {
    ouro: "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    prata: "border-gray-400 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
    bronze: "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    apoiador: "border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  }

  return (
    <Badge variant="outline" className={classMap[nivel]}>
      {nivelLabel[nivel]}
    </Badge>
  )
}

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

// ─── Props ────────────────────────────────────────────────────────────────────

interface PatrocinadoresClientProps {
  patrocinadores: Patrocinador[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PatrocinadoresClient({ patrocinadores }: PatrocinadoresClientProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<Patrocinador | null>(null)

  async function handleDelete() {
    if (!deleteTarget) return
    const supabase = createClient()
    const { error } = await supabase
      .from("patrocinador")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error(`Erro ao excluir patrocinador: ${error.message}`)
    } else {
      toast.success("Patrocinador excluído com sucesso.")
      router.refresh()
    }
  }

  const columns: Column<Patrocinador>[] = [
    {
      key: "logo_url",
      header: "Logo",
      cell: (item) =>
        item.logo_url ? (
          <Image
            src={item.logo_url}
            alt={`Logo ${item.nome}`}
            width={40}
            height={40}
            className="h-10 w-10 rounded object-contain"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground">
            {item.nome.slice(0, 2).toUpperCase()}
          </div>
        ),
    },
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "tipo",
      header: "Tipo",
      cell: (item) => (
        <Badge variant="secondary">{tipoLabel[item.tipo]}</Badge>
      ),
    },
    {
      key: "nivel",
      header: "Nível",
      cell: (item) => <NivelBadge nivel={item.nivel} />,
    },
    {
      key: "valor_mensal",
      header: "Valor Mensal",
      cell: (item) =>
        item.valor_mensal != null
          ? brlFormatter.format(item.valor_mensal)
          : "—",
    },
    {
      key: "ativo",
      header: "Ativo",
      cell: (item) => (
        <Badge variant={item.ativo ? "default" : "outline"}>
          {item.ativo ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "exibir_site",
      header: "Exibir no Site",
      cell: (item) => (
        <Badge variant={item.exibir_site ? "default" : "outline"}>
          {item.exibir_site ? "Sim" : "Não"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      cell: (item) => (
        <div className="flex items-center gap-1">
          {item.website && (
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                window.open(item.website!, "_blank", "noopener,noreferrer")
              }}
            >
              <ExternalLinkIcon className="size-4" />
              <span className="sr-only">Abrir site</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setDeleteTarget(item)
            }}
          >
            <Trash2Icon className="size-4 text-destructive" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={patrocinadores}
        onRowClick={(item) => router.push(`/app/patrocinadores/${item.id}`)}
        emptyMessage="Nenhum patrocinador cadastrado."
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Excluir Patrocinador"
        description={`Tem certeza que deseja excluir o patrocinador "${deleteTarget?.nome}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}
