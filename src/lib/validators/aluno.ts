import { z } from "zod/v4"
import { pessoaSchema } from "./pessoa"

export const responsavelLegalSchema = z.object({
  nome: z.string().min(3, "Nome do responsável é obrigatório"),
  telefone: z.string().optional(),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  parentesco: z.string().optional(),
})

export const alunoSchema = pessoaSchema.extend({
  matricula: z.string().optional(),
  graduacao: z.string().optional(),
  situacao_atual: z.enum(["estudante", "trabalhador", "ambos"]).optional(),
  observacoes_medicas: z.string().optional(),
  eh_menor: z.boolean(),
})

export const alunoFormSchema = alunoSchema
  .extend({
    responsavel_legal: responsavelLegalSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eh_menor) {
      if (!data.responsavel_legal) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Dados do responsável legal são obrigatórios para alunos menores de idade",
          path: ["responsavel_legal"],
        })
        return
      }

      if (!data.responsavel_legal.nome || data.responsavel_legal.nome.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome do responsável é obrigatório",
          path: ["responsavel_legal", "nome"],
        })
      }

      if (!data.responsavel_legal.telefone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Telefone do responsável é obrigatório para alunos menores",
          path: ["responsavel_legal", "telefone"],
        })
      }

      if (!data.responsavel_legal.parentesco) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Grau de parentesco é obrigatório para alunos menores",
          path: ["responsavel_legal", "parentesco"],
        })
      }
    }
  })

export type ResponsavelLegalInput = z.infer<typeof responsavelLegalSchema>
export type AlunoInput = z.infer<typeof alunoSchema>
export type AlunoFormInput = z.infer<typeof alunoFormSchema>
