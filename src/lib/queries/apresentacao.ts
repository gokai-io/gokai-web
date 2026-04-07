import { createClient } from "@/lib/supabase/server"

export interface Stats {
  alunos: number
  turmas: number
  modalidades: number
  professores: number
  eventos: number
  patrocinadores: number
}

export async function getStats(): Promise<Stats> {
  try {
    const supabase = await createClient()
    const [alunos, turmas, modalidades, professores, eventos, patrocinadores] =
      await Promise.all([
        supabase.from("aluno").select("id", { count: "exact", head: true }).eq("status", "ativo"),
        supabase.from("turma").select("id", { count: "exact", head: true }).eq("status", "ativa"),
        supabase.from("modalidade").select("id", { count: "exact", head: true }).eq("ativa", true),
        supabase.from("professor").select("id", { count: "exact", head: true }).eq("status", "ativo"),
        supabase.from("evento").select("id", { count: "exact", head: true }).eq("publicado", true),
        supabase
          .from("patrocinador")
          .select("id", { count: "exact", head: true })
          .eq("ativo", true),
      ])
    return {
      alunos: alunos.count ?? 0,
      turmas: turmas.count ?? 0,
      modalidades: modalidades.count ?? 0,
      professores: professores.count ?? 0,
      eventos: eventos.count ?? 0,
      patrocinadores: patrocinadores.count ?? 0,
    }
  } catch {
    return { alunos: 0, turmas: 0, modalidades: 0, professores: 0, eventos: 0, patrocinadores: 0 }
  }
}

export interface Parceiro {
  id: string
  nome: string
  logo_url: string | null
  nivel: string
}

export async function getPatrocinadores(): Promise<Parceiro[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("patrocinador")
      .select("id, nome, logo_url, nivel")
      .eq("ativo", true)
      .eq("exibir_site", true)
    return (data as Parceiro[]) ?? []
  } catch {
    return []
  }
}
