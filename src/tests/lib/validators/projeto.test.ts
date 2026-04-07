import { describe, it, expect } from "vitest"
import { projetoSchema, projetoMembroSchema } from "@/lib/validators/projeto"

describe("projetoSchema", () => {
  const valid = {
    nome: "Projeto Social 2025",
    tipo: "social",
  }

  it("validates valid project data", () => {
    const result = projetoSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("validates with all fields", () => {
    const result = projetoSchema.safeParse({
      ...valid,
      descricao: "Projeto de inclusão social",
      status: "ativo",
    })
    expect(result.success).toBe(true)
  })

  it("rejects short nome", () => {
    const result = projetoSchema.safeParse({ ...valid, nome: "AB" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid tipo", () => {
    const result = projetoSchema.safeParse({ ...valid, tipo: "invalido" })
    expect(result.success).toBe(false)
  })
})

describe("projetoMembroSchema", () => {
  const valid = {
    projeto_id: "550e8400-e29b-41d4-a716-446655440000",
    aluno_id: "550e8400-e29b-41d4-a716-446655440001",
  }

  it("validates valid member data", () => {
    const result = projetoMembroSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("rejects invalid projeto_id", () => {
    const result = projetoMembroSchema.safeParse({ ...valid, projeto_id: "not-uuid" })
    expect(result.success).toBe(false)
  })
})
