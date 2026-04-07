import { describe, it, expect } from "vitest"
import { alunoFormSchema, responsavelLegalSchema } from "@/lib/validators/aluno"

describe("responsavelLegalSchema", () => {
  it("validates valid guardian data", () => {
    const result = responsavelLegalSchema.safeParse({
      nome: "Ana Santos",
      telefone: "(11) 99999-0000",
      parentesco: "Mãe",
    })
    expect(result.success).toBe(true)
  })

  it("rejects short nome", () => {
    const result = responsavelLegalSchema.safeParse({
      nome: "AB",
    })
    expect(result.success).toBe(false)
  })

  it("accepts optional email", () => {
    const result = responsavelLegalSchema.safeParse({
      nome: "Ana Santos",
      email: "",
    })
    expect(result.success).toBe(true)
  })
})

describe("alunoFormSchema", () => {
  const validAdultAluno = {
    nome_completo: "Carlos Silva",
    eh_menor: false,
  }

  const validMinorAluno = {
    nome_completo: "Pedro Junior",
    eh_menor: true,
    responsavel_legal: {
      nome: "Carlos Silva",
      telefone: "(11) 99999-0000",
      parentesco: "Pai",
    },
  }

  it("validates adult student without responsavel", () => {
    const result = alunoFormSchema.safeParse(validAdultAluno)
    expect(result.success).toBe(true)
  })

  it("validates minor student with responsavel", () => {
    const result = alunoFormSchema.safeParse(validMinorAluno)
    expect(result.success).toBe(true)
  })

  it("validates with optional fields", () => {
    const result = alunoFormSchema.safeParse({
      ...validAdultAluno,
      cpf: "123.456.789-00",
      email: "carlos@email.com",
      matricula: "GOKAI-2025-0001",
      graduacao: "Faixa branca",
      observacoes_medicas: "Sem restrições",
    })
    expect(result.success).toBe(true)
  })

  it("rejects minor without responsavel_legal", () => {
    const result = alunoFormSchema.safeParse({
      nome_completo: "Pedro Junior",
      eh_menor: true,
    })
    expect(result.success).toBe(false)
  })

  it("rejects minor with incomplete responsavel (missing telefone)", () => {
    const result = alunoFormSchema.safeParse({
      nome_completo: "Pedro Junior",
      eh_menor: true,
      responsavel_legal: {
        nome: "Carlos Silva",
        parentesco: "Pai",
      },
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message)
      expect(messages).toContain(
        "Telefone do responsável é obrigatório para alunos menores"
      )
    }
  })

  it("rejects minor with incomplete responsavel (missing parentesco)", () => {
    const result = alunoFormSchema.safeParse({
      nome_completo: "Pedro Junior",
      eh_menor: true,
      responsavel_legal: {
        nome: "Carlos Silva",
        telefone: "(11) 99999-0000",
      },
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message)
      expect(messages).toContain(
        "Grau de parentesco é obrigatório para alunos menores"
      )
    }
  })

  it("adult student ignores responsavel_legal", () => {
    const result = alunoFormSchema.safeParse({
      nome_completo: "Carlos Silva",
      eh_menor: false,
      responsavel_legal: undefined,
    })
    expect(result.success).toBe(true)
  })

  it("rejects missing nome_completo", () => {
    const result = alunoFormSchema.safeParse({
      nome_completo: "",
      eh_menor: false,
    })
    expect(result.success).toBe(false)
  })

  it("validates with situacao_atual", () => {
    const result = alunoFormSchema.safeParse({
      ...validAdultAluno,
      situacao_atual: "estudante",
    })
    expect(result.success).toBe(true)
  })
})
