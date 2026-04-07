import { z } from "zod/v4"

export const turmaStatusSchema = z.enum(["ativa", "inativa", "encerrada"])

export const turmaSchema = z.object({
  modalidade_id: z.string().min(1, "Modalidade é obrigatória"),
  professor_id: z.string().min(1, "Professor é obrigatório"),
  nome: z.string().min(2, "Nome da turma é obrigatório"),
  dia_semana: z
    .array(z.number().int().min(0).max(6))
    .optional(),
  horario_inicio: z.string().optional(),
  horario_fim: z.string().optional(),
  local: z.string().optional(),
  vagas: z.number().int().positive("Vagas deve ser um número positivo").optional(),
  status: turmaStatusSchema,
})

export type TurmaInput = z.infer<typeof turmaSchema>
export type TurmaStatusInput = z.infer<typeof turmaStatusSchema>
