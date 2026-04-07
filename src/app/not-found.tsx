import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-xl font-semibold">Página não encontrada</h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          A página que você está procurando não existe ou foi removida.
        </p>
      </div>
      <Button render={<Link href="/" />}>
        Voltar para o início
      </Button>
    </div>
  )
}
