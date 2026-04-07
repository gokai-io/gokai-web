import { z } from "zod/v4"

export const inscricaoSchema = z
  .object({
    nome_completo: z.string().min(3, "Nome completo é obrigatório"),
    email: z.email("E-mail inválido"),
    telefone: z.string().optional(),
    data_nascimento: z.string().optional(),
    modalidade_interesse: z.string().optional(),
    experiencia_previa: z.string().optional(),
    observacoes: z.string().optional(),
    situacao_atual: z.enum(["estudante", "trabalhador", "ambos"]).optional(),
    eh_menor: z.boolean(),
    responsavel_nome: z.string().optional(),
    responsavel_telefone: z.string().optional(),
    responsavel_parentesco: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eh_menor) {
      if (!data.responsavel_nome || data.responsavel_nome.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome do responsável é obrigatório para inscrição de menor",
          path: ["responsavel_nome"],
        })
      }

      if (!data.responsavel_telefone || data.responsavel_telefone.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Telefone do responsável é obrigatório para inscrição de menor",
          path: ["responsavel_telefone"],
        })
      }

      if (!data.responsavel_parentesco || data.responsavel_parentesco.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Grau de parentesco é obrigatório para inscrição de menor",
          path: ["responsavel_parentesco"],
        })
      }
    }
  })

export type InscricaoInput = z.infer<typeof inscricaoSchema>
