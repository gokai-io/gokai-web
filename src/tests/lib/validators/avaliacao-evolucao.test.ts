import { describe, it, expect } from "vitest"
import { avaliacaoEvolucaoSchema } from "@/lib/validators/avaliacao-evolucao"

describe("avaliacaoEvolucaoSchema", () => {
  const valid = {
    aluno_id: "550e8400-e29b-41d4-a716-446655440000",
    periodo: "2025-Q1",
    comportamento: 8,
    disciplina: 9,
    frequencia: 7,
    desempenho: 8,
  }

  it("validates valid evaluation data", () => {
    const result = avaliacaoEvolucaoSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("validates with partial scores", () => {
    const result = avaliacaoEvolucaoSchema.safeParse({
      aluno_id: valid.aluno_id,
      periodo: valid.periodo,
      comportamento: 7,
    })
    expect(result.success).toBe(true)
  })

  it("rejects score below 1", () => {
    const result = avaliacaoEvolucaoSchema.safeParse({ ...valid, comportamento: 0 })
    expect(result.success).toBe(false)
  })

  it("rejects score above 10", () => {
    const result = avaliacaoEvolucaoSchema.safeParse({ ...valid, disciplina: 11 })
    expect(result.success).toBe(false)
  })

  it("rejects empty periodo", () => {
    const result = avaliacaoEvolucaoSchema.safeParse({ ...valid, periodo: "" })
    expect(result.success).toBe(false)
  })
})
