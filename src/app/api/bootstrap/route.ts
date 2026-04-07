import { NextResponse } from "next/server"
import { z } from "zod/v4"
import { createAdminClient } from "@/lib/supabase/admin"

const bootstrapSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  nome_completo: z.string().min(3, "Nome é obrigatório"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = bootstrapSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, nome_completo } = parsed.data
    const admin = createAdminClient()

    // Check if any usuario_interno exists
    const { count, error: countError } = await admin
      .from("usuario_interno")
      .select("id", { count: "exact", head: true })

    if (countError) {
      return NextResponse.json(
        { error: "Erro ao verificar banco de dados" },
        { status: 500 }
      )
    }

    if (count && count > 0) {
      return NextResponse.json(
        { error: "O sistema já foi inicializado. Use o login normal." },
        { status: 403 }
      )
    }

    // Create auth user
    const { data: authData, error: authError } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

    if (authError) {
      return NextResponse.json(
        { error: `Erro ao criar usuário auth: ${authError.message}` },
        { status: 500 }
      )
    }

    // Create pessoa
    const { data: pessoa, error: pessoaError } = await admin
      .from("pessoa")
      .insert({ nome_completo, email })
      .select("id")
      .single()

    if (pessoaError) {
      // Rollback: delete auth user
      await admin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: `Erro ao criar pessoa: ${pessoaError.message}` },
        { status: 500 }
      )
    }

    // Create usuario_interno as presidente
    const { error: userError } = await admin.from("usuario_interno").insert({
      pessoa_id: pessoa.id,
      auth_user_id: authData.user.id,
      role: "presidente",
      ativo: true,
    })

    if (userError) {
      // Rollback
      await admin.from("pessoa").delete().eq("id", pessoa.id)
      await admin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: `Erro ao criar usuário interno: ${userError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
