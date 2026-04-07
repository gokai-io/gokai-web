import { z } from "zod/v4"

export const ocorrenciaDisciplinarSchema = z.object({
  aluno_id: z.string().uuid("ID do aluno inválido"),
  tipo: z.enum(["advertencia", "suspensao", "exclusao"]),
  motivo: z.string().min(5, "Motivo deve ter pelo menos 5 caracteres"),
  data: z.string().optional(),
})

export type OcorrenciaDisciplinarInput = z.infer<typeof ocorrenciaDisciplinarSchema>
