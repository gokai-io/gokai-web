import { describe, expect, it } from "vitest"

import { transparenciaSchema } from "@/lib/validators/transparencia"

describe("transparenciaSchema", () => {
  const base = {
    titulo: "Ata de Fundação",
    descricao: "Minuta inicial da ata de fundação.",
    tipo: "ata",
    data_referencia: "2025-01-01",
    publicado: false,
  } as const

  it("validates a document with file only", () => {
    const result = transparenciaSchema.safeParse({
      ...base,
      arquivo_url: "https://storage.example.com/ata.pdf",
    })

    expect(result.success).toBe(true)
  })

  it("validates a document with content only", () => {
    const result = transparenciaSchema.safeParse({
      ...base,
      conteudo: "# Ata de Fundação",
    })

    expect(result.success).toBe(true)
  })

  it("rejects a document without file or content", () => {
    const result = transparenciaSchema.safeParse(base)

    expect(result.success).toBe(false)
  })
})
