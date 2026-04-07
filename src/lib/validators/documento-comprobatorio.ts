import { z } from "zod/v4"

export const documentoComprobatorioSchema = z.object({
  aluno_id: z.string().uuid("ID do aluno inválido"),
  tipo: z.enum(["boletim_escolar", "comprovante_matricula", "comprovante_trabalho", "historico_escolar", "outro"]),
  arquivo_url: z.string().min(1, "URL do arquivo é obrigatória"),
  data_validade: z.string().optional(),
  validado: z.boolean().optional(),
})

export type DocumentoComprobatorioInput = z.infer<typeof documentoComprobatorioSchema>
