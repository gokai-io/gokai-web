import type { UserRole } from "@/types/database"

// Role hierarchy and permission mapping
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  presidente: ["*"],
  vice_presidente: ["*"],
  diretor_administrativo: [
    "alunos:read", "alunos:write",
    "inscricoes:read", "inscricoes:write",
    "professores:read", "professores:write",
    "turmas:read", "turmas:write",
    "patrocinadores:read", "patrocinadores:write",
    "contatos:read", "contatos:write",
    "eventos:read", "eventos:write",
    "modalidades:read", "modalidades:write",
    "documentos:read", "documentos:write",
    "ocorrencias:read", "ocorrencias:write",
    "avaliacoes:read", "avaliacoes:write",
    "projetos:read", "projetos:write",
    "dashboard:read",
  ],
  diretor_financeiro: [
    "alunos:read", "inscricoes:read", "professores:read",
    "turmas:read", "contatos:read", "eventos:read",
    "modalidades:read", "dashboard:read",
    "patrocinadores:read", "patrocinadores:write",
    "transparencia:read", "transparencia:write",
  ],
  diretor_tecnico_esportivo: [
    "alunos:read", "alunos:write",
    "professores:read", "professores:write",
    "turmas:read", "turmas:write",
    "frequencia:read", "frequencia:write",
    "campeonatos:read", "campeonatos:write",
    "eventos:read", "eventos:write",
    "modalidades:read", "modalidades:write",
    "documentos:read", "documentos:write",
    "ocorrencias:read", "ocorrencias:write",
    "avaliacoes:read", "avaliacoes:write",
    "projetos:read", "projetos:write",
    "dashboard:read",
  ],
  professor: [
    "frequencia:read", "frequencia:write",
    "turmas:read",
    "alunos:read",
    "documentos:read",
    "ocorrencias:read",
    "avaliacoes:read", "avaliacoes:write",
    "projetos:read",
    "dashboard:read",
  ],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  if (!perms) return false
  return perms.includes("*") || perms.includes(permission)
}

export function canAccess(role: UserRole, resource: string, action: "read" | "write" = "read"): boolean {
  return hasPermission(role, `${resource}:${action}`)
}

export function isAdmin(role: UserRole): boolean {
  return role === "presidente" || role === "vice_presidente"
}

// Sidebar navigation items filtered by role
export interface NavItem {
  title: string
  href: string
  icon: string
  permission?: string
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/app/dashboard", icon: "LayoutDashboard", permission: "dashboard:read" },
  { title: "Alunos", href: "/app/alunos", icon: "Users", permission: "alunos:read" },
  { title: "Inscrições", href: "/app/inscricoes", icon: "UserPlus", permission: "inscricoes:read" },
  { title: "Professores", href: "/app/professores", icon: "GraduationCap", permission: "professores:read" },
  { title: "Modalidades", href: "/app/modalidades", icon: "Swords", permission: "modalidades:read" },
  { title: "Turmas", href: "/app/turmas", icon: "CalendarDays", permission: "turmas:read" },
  { title: "Frequência", href: "/app/frequencia", icon: "ClipboardCheck", permission: "frequencia:read" },
  { title: "Campeonatos", href: "/app/campeonatos", icon: "Trophy", permission: "campeonatos:read" },
  { title: "Eventos", href: "/app/eventos", icon: "Calendar", permission: "eventos:read" },
  { title: "Patrocinadores", href: "/app/patrocinadores", icon: "Handshake", permission: "patrocinadores:read" },
  { title: "Transparência", href: "/app/transparencia", icon: "FileText", permission: "transparencia:read" },
  { title: "Usuários", href: "/app/usuarios", icon: "Shield", permission: "usuarios:read" },
  { title: "Contatos", href: "/app/contatos", icon: "Mail", permission: "contatos:read" },
  { title: "Documentos", href: "/app/documentos", icon: "FolderOpen", permission: "documentos:read" },
  { title: "Ocorrências", href: "/app/ocorrencias", icon: "AlertTriangle", permission: "ocorrencias:read" },
  { title: "Avaliações", href: "/app/avaliacoes", icon: "BarChart3", permission: "avaliacoes:read" },
  { title: "Projetos", href: "/app/projetos", icon: "Briefcase", permission: "projetos:read" },
]

export function getNavItemsForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => {
    if (!item.permission) return true
    // usuarios is admin-only
    if (item.href === "/app/usuarios") return isAdmin(role)
    return hasPermission(role, item.permission)
  })
}
