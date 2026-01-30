import { History } from 'lucide-react'

export function TransactionEmpty() {
  return (
    <div className="text-center py-8">
      <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
        <History className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">
        No hay transacciones disponibles
      </p>
    </div>
  )
}
