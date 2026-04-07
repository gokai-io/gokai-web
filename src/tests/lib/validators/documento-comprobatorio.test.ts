import { describe, it, expect } from "vitest"
import { documentoComprobatorioSchema } from "@/lib/validators/documento-comprobatorio"

describe("documentoComprobatorioSchema", () => {
  const valid = {
    aluno_id: "550e8400-e29b-41d4-a716-446655440000",
    tipo: "boletim_escolar",
    arquivo_url: "https://storage.example.com/doc.pdf",
  }

  it("validates valid document data", () => {
    const result = documentoComprobatorioSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("validates with optional fields", () => {
    const result = documentoComprobatorioSchema.safeParse({
      ...valid,
      data_validade: "2025-12-31",
      validado: true,
    })
    expect(result.success).toBe(true)
  })

  it("rejects invalid tipo", () => {
    const result = documentoComprobatorioSchema.safeParse({ ...valid, tipo: "invalido" })
    expect(result.success).toBe(false)
  })

  it("rejects empty arquivo_url", () => {
    const result = documentoComprobatorioSchema.safeParse({ ...valid, arquivo_url: "" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid aluno_id", () => {
    const result = documentoComprobatorioSchema.safeParse({ ...valid, aluno_id: "not-uuid" })
    expect(result.success).toBe(false)
  })
})
