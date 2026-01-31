import { ErrorComponentProps } from '@tanstack/react-router'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorGloabal({ error, reset }: ErrorComponentProps) {
  return (
    <div className="max-w-md w-full text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-7xl font-bold text-red-600 mb-2">500</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mb-3">
          Error critico
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Ha ocurrido un error critico en la aplicacion. Por favor, intenta
          recargar la pagina.
        </p>
        {error.stack && (
          <p className="text-xs text-slate-500 mt-4 font-mono">
            Codigo: {error.stack}
          </p>
        )}
      </div>

      <button
        onClick={reset}
        className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Recargar pagina
      </button>
    </div>
  )
}
