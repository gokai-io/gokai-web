import { describe, it, expect } from "vitest"
import { pessoaSchema, enderecoSchema } from "@/lib/validators/pessoa"

describe("enderecoSchema", () => {
  it("validates empty endereco", () => {
    const result = enderecoSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it("validates full endereco", () => {
    const result = enderecoSchema.safeParse({
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Apto 4",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01001-000",
    })
    expect(result.success).toBe(true)
  })

  it("validates partial endereco", () => {
    const result = enderecoSchema.safeParse({
      cidade: "Rio de Janeiro",
      estado: "RJ",
    })
    expect(result.success).toBe(true)
  })
})

describe("pessoaSchema", () => {
  it("validates with just nome_completo", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "João Silva",
    })
    expect(result.success).toBe(true)
  })

  it("validates with all fields", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      telefone: "(11) 99999-0000",
      data_nascimento: "1990-05-15",
      endereco: {
        rua: "Rua A",
        numero: "10",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01001-000",
      },
    })
    expect(result.success).toBe(true)
  })

  it("rejects short nome_completo", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "AB",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty nome_completo", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "João Silva",
      email: "not-email",
    })
    expect(result.success).toBe(false)
  })

  it("accepts empty string email", () => {
    const result = pessoaSchema.safeParse({
      nome_completo: "João Silva",
      email: "",
    })
    expect(result.success).toBe(true)
  })
})
