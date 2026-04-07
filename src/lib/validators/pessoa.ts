import { z } from "zod/v4"

export const enderecoSchema = z.object({
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
})

export const pessoaSchema = z.object({
  nome_completo: z.string().min(3, "Nome é obrigatório"),
  cpf: z.string().optional(),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().optional(),
  data_nascimento: z.string().optional(),
  endereco: enderecoSchema.optional(),
})

export type EnderecoInput = z.infer<typeof enderecoSchema>
export type PessoaInput = z.infer<typeof pessoaSchema>
