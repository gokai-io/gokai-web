"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { turmaSchema, type TurmaInput } from "@/lib/validators/turma"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Modalidade, ProfessorWithPessoa, TurmaWithRelations } from "@/types/database"

const DAYS_OF_WEEK = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
]

interface Props {
  turma?: TurmaWithRelations
  modalidades: Modalidade[]
  professores: ProfessorWithPessoa[]
}

export function TurmaForm({ turma, modalidades, professores }: Props) {
  const router = useRouter()
  const isEditing = !!turma

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TurmaInput>({
    resolver: zodResolver(turmaSchema),
    defaultValues: {
      nome: turma?.nome ?? "",
      modalidade_id: turma?.modalidade_id ?? "",
      professor_id: turma?.professor_id ?? "",
      dia_semana: turma?.dia_semana ?? [],
      horario_inicio: turma?.horario_inicio ?? "",
      horario_fim: turma?.horario_fim ?? "",
      local: turma?.local ?? "",
      vagas: turma?.vagas ?? undefined,
      status: turma?.status ?? "ativa",
    },
  })

  const selectedDays = watch("dia_semana") ?? []

  function toggleDay(day: number) {
    const current = selectedDays
    if (current.includes(day)) {
      setValue("dia_semana", current.filter((d) => d !== day))
    } else {
      setValue("dia_semana", [...current, day].sort((a, b) => a - b))
    }
  }

  async function onSubmit(data: TurmaInput) {
    const supabase = createClient()

    if (isEditing) {
      const { error } = await supabase
        .from("turma")
        .update(data)
        .eq("id", turma.id)
      if (error) {
        alert("Erro ao salvar turma: " + error.message)
        return
      }
    } else {
      const { error } = await supabase.from("turma").insert(data)
      if (error) {
        alert("Erro ao criar turma: " + error.message)
        return
      }
    }

    router.push("/app/turmas")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Turma" : "Nova Turma"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome">Nome da turma</Label>
            <Input id="nome" {...register("nome")} placeholder="Ex: Judô Infantil" />
            {errors.nome && (
              <p className="text-xs text-destructive">{errors.nome.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Modalidade */}
            <div className="flex flex-col gap-1.5">
              <Label>Modalidade</Label>
              <Controller
                name="modalidade_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {modalidades.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.modalidade_id && (
                <p className="text-xs text-destructive">{errors.modalidade_id.message}</p>
              )}
            </div>

            {/* Professor */}
            <div className="flex flex-col gap-1.5">
              <Label>Professor</Label>
              <Controller
                name="professor_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {professores.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.pessoa?.nome_completo ?? p.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.professor_id && (
                <p className="text-xs text-destructive">{errors.professor_id.message}</p>
              )}
            </div>
          </div>

          {/* Dias da semana */}
          <div className="flex flex-col gap-2">
            <Label>Dias da semana</Label>
            <div className="flex flex-wrap gap-3">
              {DAYS_OF_WEEK.map((day) => (
                <label key={day.value} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedDays.includes(day.value)}
                    onCheckedChange={() => toggleDay(day.value)}
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Horário início */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="horario_inicio">Horário de início</Label>
              <Input id="horario_inicio" type="time" {...register("horario_inicio")} />
            </div>

            {/* Horário fim */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="horario_fim">Horário de término</Label>
              <Input id="horario_fim" type="time" {...register("horario_fim")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Local */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="local">Local</Label>
              <Input id="local" {...register("local")} placeholder="Ex: Tatame A" />
            </div>

            {/* Vagas */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vagas">Vagas</Label>
              <Input
                id="vagas"
                type="number"
                min={1}
                {...register("vagas", { valueAsNumber: true })}
                placeholder="Ex: 20"
              />
              {errors.vagas && (
                <p className="text-xs text-destructive">{errors.vagas.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="inativa">Inativa</SelectItem>
                    <SelectItem value="encerrada">Encerrada</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => router.push("/app/turmas")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar turma"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
