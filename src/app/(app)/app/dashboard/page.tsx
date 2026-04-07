import { redirect } from "next/navigation"
import { Users, CalendarDays, UserPlus, Calendar, GraduationCap, Swords } from "lucide-react"
import { getServerUser } from "@/lib/auth/server"
import { PageHeader } from "@/components/app/page-header"
import { StatCard } from "@/components/app/stat-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getServerUser()
  if (!user) redirect("/login")

  const firstName = user.nome_completo.split(" ")[0]

  const statCards = [
    {
      title: "Total de Alunos",
      value: "—",
      icon: <Users />,
      description: "Alunos ativos na associação",
    },
    {
      title: "Turmas Ativas",
      value: "—",
      icon: <CalendarDays />,
      description: "Turmas em andamento",
    },
    {
      title: "Inscrições Pendentes",
      value: "—",
      icon: <UserPlus />,
      description: "Aguardando contato",
    },
    {
      title: "Eventos Próximos",
      value: "—",
      icon: <Calendar />,
      description: "Nos próximos 30 dias",
    },
  ]

  const quickActions = [
    { label: "Nova Inscrição", href: "/app/inscricoes", icon: UserPlus },
    { label: "Registrar Aluno", href: "/app/alunos", icon: Users },
    { label: "Ver Turmas", href: "/app/turmas", icon: CalendarDays },
    { label: "Ver Professores", href: "/app/professores", icon: GraduationCap },
    { label: "Modalidades", href: "/app/modalidades", icon: Swords },
    { label: "Próximos Eventos", href: "/app/eventos", icon: Calendar },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description={`Bem-vindo de volta, ${firstName}. Aqui está um resumo da associação.`}
      />

      {/* Stat cards grid */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              description={card.description}
            />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Acesso rápido
        </h2>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Button key={href} variant="outline" size="sm" render={<Link href={href} />}>
              <Icon className="size-4" />
              {label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
