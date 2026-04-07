import { z } from "zod/v4"

export const transparenciaTipoSchema = z.enum([
  "ata",
  "balanco",
  "relatorio",
  "estatuto",
  "outro",
])

export const transparenciaSchema = z.object({
  titulo: z.string().min(3, "Título é obrigatório"),
  descricao: z.string().optional(),
  tipo: transparenciaTipoSchema,
  data_referencia: z.string().min(1, "Data de referência é obrigatória"),
  publicado: z.boolean(),
})

export type TransparenciaInput = z.infer<typeof transparenciaSchema>
export type TransparenciaTipoInput = z.infer<typeof transparenciaTipoSchema>
