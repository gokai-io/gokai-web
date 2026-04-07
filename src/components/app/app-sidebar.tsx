"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  Swords,
  CalendarDays,
  ClipboardCheck,
  Trophy,
  Calendar,
  Handshake,
  FileText,
  Shield,
  Mail,
  FolderOpen,
  AlertTriangle,
  BarChart3,
  Briefcase,
  LogOut,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getNavItemsForRole } from "@/lib/auth/permissions"
import { createClient } from "@/lib/supabase/client"
import type { UserRole } from "@/types/database"

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  Swords,
  CalendarDays,
  ClipboardCheck,
  Trophy,
  Calendar,
  Handshake,
  FileText,
  Shield,
  Mail,
  FolderOpen,
  AlertTriangle,
  BarChart3,
  Briefcase,
}

const ROLE_LABELS: Record<UserRole, string> = {
  presidente: "Presidente",
  vice_presidente: "Vice-presidente",
  diretor_administrativo: "Dir. Administrativo",
  diretor_financeiro: "Dir. Financeiro",
  diretor_tecnico_esportivo: "Dir. Técnico",
  professor: "Professor",
}

interface AppSidebarProps {
  user: {
    role: UserRole
    nome_completo: string
    email: string
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = getNavItemsForRole(user.role)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const firstName = user.nome_completo.split(" ")[0]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm select-none">
            G
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold tracking-wide">GŌKAI</span>
            <span className="truncate text-xs text-muted-foreground">Assoc. Esportiva</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = ICON_MAP[item.icon]
              const isActive =
                pathname === item.href ||
                (item.href !== "/app/dashboard" && pathname.startsWith(item.href))

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
          <div className="flex flex-col gap-0.5 px-2 py-1">
            <span className="truncate text-sm font-medium">{firstName}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
          <Badge variant="secondary" className="mx-2 w-fit">
            {ROLE_LABELS[user.role]}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          <span className="group-data-[collapsible=icon]:hidden">Sair</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
