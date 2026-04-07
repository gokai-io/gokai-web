"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { alunoFormSchema, type AlunoFormInput } from "@/lib/validators/aluno"
import { createClient } from "@/lib/supabase/client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { AlunoWithResponsavel } from "@/types/database"

interface AlunoWithExtras extends AlunoWithResponsavel {
  pessoa: AlunoWithResponsavel["pessoa"] & {
    cpf?: string | null
    foto_url?: string | null
  }
}

interface Props {
  aluno?: AlunoWithExtras
  generatedMatricula?: string
}

export function AlunoForm({ aluno, generatedMatricula }: Props) {
  const router = useRouter()
  const isEditing = !!aluno

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlunoFormInput>({
    resolver: zodResolver(alunoFormSchema),
    defaultValues: {
      nome_completo: aluno?.pessoa?.nome_completo ?? "",
      cpf: aluno?.pessoa?.cpf ?? "",
      email: aluno?.pessoa?.email ?? "",
      telefone: aluno?.pessoa?.telefone ?? "",
      data_nascimento: aluno?.pessoa?.data_nascimento ?? "",
      matricula: aluno?.matricula ?? generatedMatricula ?? "",
      graduacao: aluno?.graduacao ?? "",
      situacao_atual: aluno?.situacao_atual ?? undefined,
      observacoes_medicas: aluno?.observacoes_medicas ?? "",
      eh_menor: aluno?.eh_menor ?? false,
      responsavel_legal: aluno?.responsavel_legal
        ? {
            nome: aluno.responsavel_legal.nome ?? "",
            telefone: aluno.responsavel_legal.telefone ?? "",
            email: aluno.responsavel_legal.email ?? "",
            parentesco: aluno.responsavel_legal.parentesco ?? "",
          }
        : undefined,
    },
  })

  const ehMenor = watch("eh_menor")

  async function onSubmit(data: AlunoFormInput) {
    const supabase = createClient()
    const { responsavel_legal, nome_completo, cpf, email, telefone, data_nascimento, ...alunoData } = data

    try {
      if (isEditing) {
        // Update pessoa
        const { error: pessoaError } = await supabase
          .from("pessoa")
          .update({ nome_completo, cpf, email, telefone, data_nascimento })
          .eq("id", aluno.pessoa_id)

        if (pessoaError) throw pessoaError

        // Update aluno
        const { error: alunoError } = await supabase
          .from("aluno")
          .update(alunoData)
          .eq("id", aluno.id)

        if (alunoError) throw alunoError

        // Manage responsavel_legal
        if (ehMenor && responsavel_legal) {
          if (aluno.responsavel_legal) {
            await supabase
              .from("responsavel_legal")
              .update(responsavel_legal)
              .eq("id", aluno.responsavel_legal.id)
          } else {
            await supabase.from("responsavel_legal").insert({
              ...responsavel_legal,
              aluno_id: aluno.id,
            })
          }
        } else if (!ehMenor && aluno.responsavel_legal) {
          await supabase
            .from("responsavel_legal")
            .delete()
            .eq("id", aluno.responsavel_legal.id)
        }

        router.refresh()
      } else {
        // Insert pessoa
        const { data: pessoa, error: pessoaError } = await supabase
          .from("pessoa")
          .insert({ nome_completo, cpf, email, telefone, data_nascimento })
          .select("id")
          .single()

        if (pessoaError || !pessoa) throw pessoaError ?? new Error("Erro ao criar pessoa")

        // Insert aluno
        const { data: novoAluno, error: alunoError } = await supabase
          .from("aluno")
          .insert({ ...alunoData, pessoa_id: pessoa.id })
          .select("id")
          .single()

        if (alunoError || !novoAluno) throw alunoError ?? new Error("Erro ao criar aluno")

        // Insert responsavel_legal if needed
        if (ehMenor && responsavel_legal) {
          const { error: respError } = await supabase
            .from("responsavel_legal")
            .insert({ ...responsavel_legal, aluno_id: novoAluno.id })

          if (respError) throw respError
        }

        router.push(`/app/alunos/${novoAluno.id}`)
        router.refresh()
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido"
      alert("Erro ao salvar aluno: " + message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Nome completo */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome_completo">Nome completo</Label>
            <Input id="nome_completo" {...register("nome_completo")} placeholder="Nome completo" />
            {errors.nome_completo && (
              <p className="text-xs text-destructive">{errors.nome_completo.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* CPF */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" {...register("cpf")} placeholder="000.000.000-00" />
            </div>

            {/* Data de nascimento */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="data_nascimento">Data de nascimento</Label>
              <Input id="data_nascimento" type="date" {...register("data_nascimento")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register("email")} placeholder="email@exemplo.com" />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Telefone */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" {...register("telefone")} placeholder="(11) 99999-9999" />
            </div>
          </div>

          <Separator />

          {/* Matrícula */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input id="matricula" {...register("matricula")} placeholder="GOKAI-2025-0001" />
            </div>

            {/* Graduação */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="graduacao">Graduação</Label>
              <Input id="graduacao" {...register("graduacao")} placeholder="Ex: Faixa azul" />
            </div>
          </div>

          {/* Situação Atual */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="situacao_atual">Situação Atual</Label>
            <select
              id="situacao_atual"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              {...register("situacao_atual")}
            >
              <option value="">Selecione...</option>
              <option value="estudante">Estudante</option>
              <option value="trabalhador">Trabalhador</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>

          {/* Observações médicas */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="observacoes_medicas">Observações médicas</Label>
            <Textarea
              id="observacoes_medicas"
              {...register("observacoes_medicas")}
              placeholder="Alergias, condições médicas relevantes, etc."
            />
          </div>

          {/* Menor de idade */}
          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Menor de idade</span>
              <span className="text-xs text-muted-foreground">
                Requer dados do responsável legal
              </span>
            </div>
            <Controller
              name="eh_menor"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Responsável legal — condicional */}
          {ehMenor && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium">Responsável Legal</p>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="responsavel_nome">Nome do responsável</Label>
                  <Input
                    id="responsavel_nome"
                    {...register("responsavel_legal.nome")}
                    placeholder="Nome completo do responsável"
                  />
                  {errors.responsavel_legal?.nome && (
                    <p className="text-xs text-destructive">
                      {errors.responsavel_legal.nome.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="responsavel_telefone">Telefone do responsável</Label>
                    <Input
                      id="responsavel_telefone"
                      {...register("responsavel_legal.telefone")}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.responsavel_legal?.telefone && (
                      <p className="text-xs text-destructive">
                        {errors.responsavel_legal.telefone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="responsavel_email">E-mail do responsável</Label>
                    <Input
                      id="responsavel_email"
                      type="email"
                      {...register("responsavel_legal.email")}
                      placeholder="responsavel@exemplo.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="responsavel_parentesco">Grau de parentesco</Label>
                  <Input
                    id="responsavel_parentesco"
                    {...register("responsavel_legal.parentesco")}
                    placeholder="Ex: Mãe, Pai, Avó"
                  />
                  {errors.responsavel_legal?.parentesco && (
                    <p className="text-xs text-destructive">
                      {errors.responsavel_legal.parentesco.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => router.push("/app/alunos")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Cadastrar aluno"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
