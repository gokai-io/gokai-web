import { z } from "zod/v4"

export const patrocinadorTipoSchema = z.enum(["pessoa_fisica", "pessoa_juridica"])

export const patrocinadorNivelSchema = z.enum(["ouro", "prata", "bronze", "apoiador"])

export const patrocinadorSchema = z.object({
  nome: z.string().min(2, "Nome do patrocinador é obrigatório"),
  website: z.url("URL inválida").optional().or(z.literal("")),
  tipo: patrocinadorTipoSchema,
  nivel: patrocinadorNivelSchema,
  contato: z.string().optional(),
  valor_mensal: z
    .number()
    .nonnegative("Valor mensal não pode ser negativo")
    .optional(),
  ativo: z.boolean(),
  exibir_site: z.boolean(),
})

export type PatrocinadorInput = z.infer<typeof patrocinadorSchema>
export type PatrocinadorTipoInput = z.infer<typeof patrocinadorTipoSchema>
export type PatrocinadorNivelInput = z.infer<typeof patrocinadorNivelSchema>
