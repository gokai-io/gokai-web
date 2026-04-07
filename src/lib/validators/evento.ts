import { z } from "zod/v4"

export const eventoTipoSchema = z.enum([
  "treino_especial",
  "seminario",
  "campeonato",
  "social",
  "outro",
])

export const eventoSchema = z.object({
  titulo: z.string().min(3, "Título é obrigatório"),
  slug: z.string().optional(),
  descricao: z.string().optional(),
  conteudo: z.string().optional(),
  data_inicio: z.string().min(1, "Data de início é obrigatória"),
  data_fim: z.string().optional(),
  local: z.string().optional(),
  tipo: eventoTipoSchema,
  publicado: z.boolean(),
  destaque: z.boolean(),
})

export type EventoInput = z.infer<typeof eventoSchema>
export type EventoTipoInput = z.infer<typeof eventoTipoSchema>
