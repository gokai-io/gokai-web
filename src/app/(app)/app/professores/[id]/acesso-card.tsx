"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { KeyRoundIcon, LinkIcon, Unlink2Icon, UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDialog } from "@/components/app/confirm-dialog"
import { ROLE_LABELS } from "../../usuarios/usuarios-client"
import { vincularUsuarioAoProfessor, desvincularAcesso } from "./actions"
import type { UserRole } from "@/types/database"

type UsuarioLivre = {
  id: string
  role: UserRole
  ativo: boolean
  pessoa: {
    id: string
    nome_completo: string
    email: string | null
  }
}

type UsuarioVinculado = {
  id: string
  role: UserRole
  ativo: boolean
}

interface AcessoCardProps {
  professorId: string
  pessoaId: string
  pessoaNome: string
  pessoaEmail: string | null
  usuarioVinculado: UsuarioVinculado | null
  usuariosLivres: UsuarioLivre[]
}

export function AcessoCard({
  pessoaId,
  pessoaNome,
  pessoaEmail,
  usuarioVinculado,
  usuariosLivres,
}: AcessoCardProps) {
  const router = useRouter()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [confirmUnlink, setConfirmUnlink] = useState(false)

  function handleVincular() {
    if (!selectedUserId) {
      toast.error("Selecione um usuário para vincular.")
      return
    }
    startTransition(async () => {
      const result = await vincularUsuarioAoProfessor({
        professorPessoaId: pessoaId,
        usuarioInternoId: selectedUserId,
      })
      if (!result.success) {
        toast.error(result.error ?? "Erro ao vincular.")
        return
      }
      toast.success("Usuário vinculado ao professor.")
      router.refresh()
    })
  }

  function handleDesvincular() {
    if (!usuarioVinculado) return
    startTransition(async () => {
      const result = await desvincularAcesso({
        usuarioInternoId: usuarioVinculado.id,
        apagarAuthUser: true,
      })
      if (!result.success) {
        toast.error(result.error ?? "Erro ao desvincular.")
        return
      }
      toast.success("Acesso removido.")
      setConfirmUnlink(false)
      router.refresh()
    })
  }

  function handleCriarNovoAcesso() {
    const params = new URLSearchParams({ role: "professor" })
    if (pessoaEmail) params.set("email", pessoaEmail)
    if (pessoaNome) params.set("nome", pessoaNome)
    router.push(`/app/usuarios/novo?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRoundIcon className="size-5" />
          Acesso ao Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {usuarioVinculado ? (
          <>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <Badge variant={usuarioVinculado.ativo ? "default" : "outline"}>
                {usuarioVinculado.ativo ? "Ativo" : "Inativo"}
              </Badge>
              <div className="flex-1 text-sm">
                <div className="font-medium">
                  Cargo: {ROLE_LABELS[usuarioVinculado.role]}
                </div>
                <div className="text-xs text-muted-foreground">
                  Este professor pode acessar o sistema com este cargo.
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmUnlink(true)}
                disabled={isPending}
              >
                <Unlink2Icon className="size-3.5" />
                Desvincular
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Este professor ainda não tem acesso ao sistema. Você pode vinculá-lo
              a um usuário interno já cadastrado ou criar um novo acesso.
            </p>

            {usuariosLivres.length > 0 && (
              <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <div className="text-sm font-medium">
                  Vincular a um usuário existente
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select
                    value={selectedUserId}
                    onValueChange={(v) => setSelectedUserId(v ?? "")}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione um usuário sem professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {usuariosLivres.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.pessoa.nome_completo}
                          {u.pessoa.email ? ` (${u.pessoa.email})` : ""} —{" "}
                          {ROLE_LABELS[u.role]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={handleVincular}
                    disabled={!selectedUserId || isPending}
                  >
                    <LinkIcon className="size-3.5" />
                    Vincular
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  A pessoa antiga (dados duplicados) é removida se ficar órfã.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3">
              <div className="text-sm">
                <div className="font-medium">Criar novo acesso</div>
                <div className="text-xs text-muted-foreground">
                  Abre o formulário de novo usuário já prefilhado com os dados
                  do professor.
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleCriarNovoAcesso}
                disabled={!pessoaEmail || isPending}
                title={!pessoaEmail ? "Cadastre um e-mail no professor primeiro" : undefined}
              >
                <UserPlusIcon className="size-3.5" />
                Criar acesso
              </Button>
            </div>
          </>
        )}
      </CardContent>

      {usuarioVinculado && (
        <ConfirmDialog
          open={confirmUnlink}
          onOpenChange={(open) => !open && setConfirmUnlink(false)}
          title="Remover acesso?"
          description="O professor perderá o login no sistema. Os dados cadastrais (pessoa, professor) permanecem intactos."
          confirmLabel="Remover acesso"
          variant="destructive"
          onConfirm={handleDesvincular}
        />
      )}
    </Card>
  )
}
