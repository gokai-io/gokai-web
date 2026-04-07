import { z } from "zod/v4"

export const projetoSchema = z.object({
  nome: z.string().min(3, "Nome do projeto deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
  tipo: z.enum(["social", "esportivo", "educacional", "outro"]),
  status: z.enum(["planejamento", "ativo", "concluido", "cancelado"]).optional(),
})

export const projetoMembroSchema = z.object({
  projeto_id: z.string().uuid("ID do projeto inválido"),
  aluno_id: z.string().uuid("ID do aluno inválido"),
  data_entrada: z.string().optional(),
  data_saida: z.string().optional(),
  status: z.enum(["ativo", "inativo", "desligado"]).optional(),
})

export type ProjetoInput = z.infer<typeof projetoSchema>
export type ProjetoMembroInput = z.infer<typeof projetoMembroSchema>
