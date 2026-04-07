import { describe, it, expect } from "vitest"
import { contatoSchema } from "@/lib/validators/contato"

describe("contatoSchema", () => {
  it("validates a valid contact form", () => {
    const result = contatoSchema.safeParse({
      nome: "João Silva",
      email: "joao@email.com",
      assunto: "Dúvida sobre horários",
      mensagem: "Gostaria de saber os horários das aulas de judô.",
    })
    expect(result.success).toBe(true)
  })

  it("accepts optional telefone", () => {
    const result = contatoSchema.safeParse({
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      assunto: "Horários",
      mensagem: "Gostaria de informações.",
    })
    expect(result.success).toBe(true)
  })

  it("rejects missing nome", () => {
    const result = contatoSchema.safeParse({
      nome: "",
      email: "joao@email.com",
      assunto: "Teste",
      mensagem: "Mensagem de teste aqui.",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email", () => {
    const result = contatoSchema.safeParse({
      nome: "João",
      email: "not-an-email",
      assunto: "Teste",
      mensagem: "Mensagem de teste aqui.",
    })
    expect(result.success).toBe(false)
  })

  it("rejects short mensagem", () => {
    const result = contatoSchema.safeParse({
      nome: "João",
      email: "joao@email.com",
      assunto: "Teste",
      mensagem: "Curta",
    })
    expect(result.success).toBe(false)
  })

  it("rejects missing assunto", () => {
    const result = contatoSchema.safeParse({
      nome: "João",
      email: "joao@email.com",
      assunto: "",
      mensagem: "Mensagem longa o suficiente.",
    })
    expect(result.success).toBe(false)
  })
})
