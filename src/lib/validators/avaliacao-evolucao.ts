import { z } from "zod/v4"

const nota = z.number().int().min(1, "Nota mínima é 1").max(10, "Nota máxima é 10").optional()

export const avaliacaoEvolucaoSchema = z.object({
  aluno_id: z.string().uuid("ID do aluno inválido"),
  periodo: z.string().min(1, "Período é obrigatório"),
  comportamento: nota,
  disciplina: nota,
  frequencia: nota,
  desempenho: nota,
  observacoes: z.string().optional(),
})

export type AvaliacaoEvolucaoInput = z.infer<typeof avaliacaoEvolucaoSchema>
