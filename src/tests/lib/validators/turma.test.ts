import { describe, it, expect } from "vitest"
import { turmaSchema } from "@/lib/validators/turma"

describe("turmaSchema", () => {
  it("validates a valid turma", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "Judô Adulto - Manhã",
      status: "ativa",
    })
    expect(result.success).toBe(true)
  })

  it("validates with all optional fields", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "Judô Infantil",
      dia_semana: [1, 3, 5],
      horario_inicio: "08:00",
      horario_fim: "09:30",
      local: "Sala 1",
      vagas: 20,
      status: "ativa",
    })
    expect(result.success).toBe(true)
  })

  it("rejects missing modalidade_id", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "",
      professor_id: "uuid-5678",
      nome: "Turma",
      status: "ativa",
    })
    expect(result.success).toBe(false)
  })

  it("rejects missing professor_id", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "",
      nome: "Turma",
      status: "ativa",
    })
    expect(result.success).toBe(false)
  })

  it("rejects missing nome", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "",
      status: "ativa",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid dia_semana values", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "Turma",
      dia_semana: [7],
      status: "ativa",
    })
    expect(result.success).toBe(false)
  })

  it("rejects negative vagas", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "Turma",
      vagas: -1,
      status: "ativa",
    })
    expect(result.success).toBe(false)
  })

  it("validates all status values", () => {
    const statuses = ["ativa", "inativa", "encerrada"]
    statuses.forEach((status) => {
      const result = turmaSchema.safeParse({
        modalidade_id: "uuid-1234",
        professor_id: "uuid-5678",
        nome: "Turma",
        status,
      })
      expect(result.success).toBe(true)
    })
  })

  it("rejects invalid status", () => {
    const result = turmaSchema.safeParse({
      modalidade_id: "uuid-1234",
      professor_id: "uuid-5678",
      nome: "Turma",
      status: "suspensa",
    })
    expect(result.success).toBe(false)
  })
})
