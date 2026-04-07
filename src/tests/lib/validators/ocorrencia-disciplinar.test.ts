import { describe, it, expect } from "vitest"
import { ocorrenciaDisciplinarSchema } from "@/lib/validators/ocorrencia-disciplinar"

describe("ocorrenciaDisciplinarSchema", () => {
  const valid = {
    aluno_id: "550e8400-e29b-41d4-a716-446655440000",
    tipo: "advertencia",
    motivo: "Comportamento inadequado durante o treino",
  }

  it("validates valid occurrence data", () => {
    const result = ocorrenciaDisciplinarSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("validates all tipos", () => {
    for (const tipo of ["advertencia", "suspensao", "exclusao"]) {
      const result = ocorrenciaDisciplinarSchema.safeParse({ ...valid, tipo })
      expect(result.success).toBe(true)
    }
  })

  it("rejects short motivo", () => {
    const result = ocorrenciaDisciplinarSchema.safeParse({ ...valid, motivo: "abc" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid tipo", () => {
    const result = ocorrenciaDisciplinarSchema.safeParse({ ...valid, tipo: "multa" })
    expect(result.success).toBe(false)
  })
})
