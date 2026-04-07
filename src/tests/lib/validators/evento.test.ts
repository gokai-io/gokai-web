import { describe, it, expect } from "vitest"
import { eventoSchema } from "@/lib/validators/evento"

describe("eventoSchema", () => {
  it("validates a valid event", () => {
    const result = eventoSchema.safeParse({
      titulo: "Campeonato Regional",
      data_inicio: "2025-06-15T09:00",
      tipo: "campeonato",
      publicado: false,
      destaque: false,
    })
    expect(result.success).toBe(true)
  })

  it("validates with all optional fields", () => {
    const result = eventoSchema.safeParse({
      titulo: "Seminário de Judô",
      slug: "seminario-judo-2025",
      descricao: "Um seminário especial",
      conteudo: "# Conteúdo em markdown\n\nDetalhes do evento.",
      data_inicio: "2025-07-20T14:00",
      data_fim: "2025-07-20T18:00",
      local: "Ginásio Municipal",
      tipo: "seminario",
      publicado: true,
      destaque: true,
    })
    expect(result.success).toBe(true)
  })

  it("rejects missing titulo", () => {
    const result = eventoSchema.safeParse({
      titulo: "",
      data_inicio: "2025-06-15",
      tipo: "outro",
      publicado: false,
      destaque: false,
    })
    expect(result.success).toBe(false)
  })

  it("rejects missing data_inicio", () => {
    const result = eventoSchema.safeParse({
      titulo: "Evento Teste",
      data_inicio: "",
      tipo: "outro",
      publicado: false,
      destaque: false,
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid tipo", () => {
    const result = eventoSchema.safeParse({
      titulo: "Evento",
      data_inicio: "2025-06-15",
      tipo: "invalido",
      publicado: false,
      destaque: false,
    })
    expect(result.success).toBe(false)
  })

  it("validates all event types", () => {
    const tipos = ["treino_especial", "seminario", "campeonato", "social", "outro"]
    tipos.forEach((tipo) => {
      const result = eventoSchema.safeParse({
        titulo: "Evento",
        data_inicio: "2025-06-15",
        tipo,
        publicado: false,
        destaque: false,
      })
      expect(result.success).toBe(true)
    })
  })
})
