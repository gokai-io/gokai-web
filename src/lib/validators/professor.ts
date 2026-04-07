import { z } from "zod/v4"
import { pessoaSchema } from "./pessoa"

export const professorStatusSchema = z.enum(["ativo", "inativo", "licenciado"])

export const professorSchema = pessoaSchema.extend({
  especialidades: z.array(z.string()).optional(),
  graduacao: z.string().optional(),
  registro_federacao: z.string().optional(),
  bio: z.string().optional(),
  status: professorStatusSchema,
  exibir_site: z.boolean(),
})

export type ProfessorInput = z.infer<typeof professorSchema>
export type ProfessorStatusInput = z.infer<typeof professorStatusSchema>
