import { z } from "zod/v4"

export const contatoSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  telefone: z.string().optional(),
  assunto: z.string().min(3, "Assunto é obrigatório"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
})

export type ContatoInput = z.infer<typeof contatoSchema>
