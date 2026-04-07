import { describe, it, expect } from "vitest"
import { inscricaoSchema } from "@/lib/validators/inscricao"

describe("inscricaoSchema", () => {
  const validAdult = {
    nome_completo: "Maria Santos",
    email: "maria@email.com",
    eh_menor: false,
  }

  const validMinor = {
    nome_completo: "Pedro Aluno",
    email: "pedro@email.com",
    eh_menor: true,
    responsavel_nome: "Ana Santos",
    responsavel_telefone: "(11) 98888-7777",
    responsavel_parentesco: "Mãe",
  }

  it("validates adult inscription", () => {
    const result = inscricaoSchema.safeParse(validAdult)
    expect(result.success).toBe(true)
  })

  it("validates minor inscription with responsavel data", () => {
    const result = inscricaoSchema.safeParse(validMinor)
    expect(result.success).toBe(true)
  })

  it("validates with optional fields", () => {
    const result = inscricaoSchema.safeParse({
      ...validAdult,
      telefone: "(11) 99999-0000",
      modalidade_interesse: "Judô",
      experiencia_previa: "2 anos de karatê",
      observacoes: "Interesse em treinar 3x por semana",
    })
    expect(result.success).toBe(true)
  })

  it("rejects minor without responsavel_nome", () => {
    const result = inscricaoSchema.safeParse({
      nome_completo: "Pedro",
      email: "pedro@email.com",
      eh_menor: true,
      responsavel_telefone: "(11) 98888-7777",
      responsavel_parentesco: "Mãe",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path?.join("."))
      expect(paths).toContain("responsavel_nome")
    }
  })

  it("rejects minor without responsavel_telefone", () => {
    const result = inscricaoSchema.safeParse({
      nome_completo: "Pedro",
      email: "pedro@email.com",
      eh_menor: true,
      responsavel_nome: "Ana Santos",
      responsavel_parentesco: "Mãe",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path?.join("."))
      expect(paths).toContain("responsavel_telefone")
    }
  })

  it("rejects minor without responsavel_parentesco", () => {
    const result = inscricaoSchema.safeParse({
      nome_completo: "Pedro",
      email: "pedro@email.com",
      eh_menor: true,
      responsavel_nome: "Ana Santos",
      responsavel_telefone: "(11) 98888-7777",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path?.join("."))
      expect(paths).toContain("responsavel_parentesco")
    }
  })

  it("rejects missing nome_completo", () => {
    const result = inscricaoSchema.safeParse({
      nome_completo: "",
      email: "test@email.com",
      eh_menor: false,
    })
    expect(result.success).toBe(false)
  })

  it("validates with situacao_atual", () => {
    const result = inscricaoSchema.safeParse({
      ...validAdult,
      situacao_atual: "trabalhador",
    })
    expect(result.success).toBe(true)
  })

  it("rejects invalid email", () => {
    const result = inscricaoSchema.safeParse({
      nome_completo: "Maria Santos",
      email: "invalid",
      eh_menor: false,
    })
    expect(result.success).toBe(false)
  })
})
