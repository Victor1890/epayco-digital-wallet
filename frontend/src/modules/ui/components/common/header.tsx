import { Button } from '@/modules/ui/components/button'
import { Route } from '@/routes/__root'
import { Link, useRouteContext } from '@tanstack/react-router'
import { LogOut, Wallet } from 'lucide-react'

export function Header() {
  const { session } = useRouteContext({ from: Route.id })

  const currentClient = session?.user

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Billetera Digital
            </h1>
            <p className="text-xs text-muted-foreground">
              Sistema de pagos seguros
            </p>
          </div>
        </div>

        {currentClient && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {currentClient.nombres}
              </p>
              <p className="text-xs text-muted-foreground">
                Doc: {currentClient.documento}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link to="/">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Cerrar sesion</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
