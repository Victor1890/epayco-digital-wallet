import { Button } from '@/modules/ui/components/button'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, FileQuestion, Home } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <FileQuestion className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-7xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Pagina no encontrada
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lo sentimos, la pagina que buscas no existe o ha sido movida a otra
            ubicacion.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atras
          </Button>
        </div>
      </div>
    </div>
  )
}
