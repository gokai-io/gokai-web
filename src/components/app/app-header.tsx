"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

// Map path segments to human-readable Portuguese labels
const SEGMENT_LABELS: Record<string, string> = {
  app: "App",
  dashboard: "Dashboard",
  alunos: "Alunos",
  inscricoes: "Inscrições",
  professores: "Professores",
  modalidades: "Modalidades",
  turmas: "Turmas",
  frequencia: "Frequência",
  campeonatos: "Campeonatos",
  eventos: "Eventos",
  patrocinadores: "Patrocinadores",
  transparencia: "Transparência",
  usuarios: "Usuários",
  contatos: "Contatos",
  novo: "Novo",
  editar: "Editar",
  detalhes: "Detalhes",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("")
}

function buildBreadcrumbs(pathname: string) {
  // Strip leading slash and split
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean)

  // Build cumulative breadcrumb items, skipping "app" prefix segment
  const items: { label: string; href: string }[] = []
  let href = ""

  for (const segment of segments) {
    href += `/${segment}`
    // Skip the bare "app" segment — it's implicit
    if (segment === "app" && items.length === 0) continue
    const label = SEGMENT_LABELS[segment] ?? segment
    items.push({ label, href })
  }

  return items
}

interface AppHeaderProps {
  user: {
    nome_completo: string
    email: string
    foto_url?: string | null
  }
}

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const breadcrumbs = buildBreadcrumbs(pathname)
  const initials = getInitials(user.nome_completo)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/80 bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <BreadcrumbItem key={crumb.href}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink render={<Link href={crumb.href} />}>
                      {crumb.label}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Menu do usuário"
        >
          <Avatar size="sm">
            {user.foto_url && <AvatarImage src={user.foto_url} alt={user.nome_completo} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium truncate">{user.nome_completo}</span>
              <span className="text-xs text-muted-foreground font-normal truncate">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
