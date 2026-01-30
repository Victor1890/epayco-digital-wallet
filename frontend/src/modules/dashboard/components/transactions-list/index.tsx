import { useAuthStore } from '@/modules/auth/store/auth.store'
import { Button } from '@/modules/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/ui/components/card'
import { ArrowDownLeft, ArrowUpRight, History, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { setTimeout } from 'timers/promises'
import { TransactionEmpty } from './transaction-empty'

export function TransactionsList() {
  const {
    data: { client: currentClient, transactions },
  } = useAuthStore()

  const [loading, setLoading] = useState(false)

  if (!currentClient) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <History className="h-5 w-5 text-primary" />
              Historial de Transacciones
            </CardTitle>
            <CardDescription>
              Movimientos recientes de tu billetera
            </CardDescription>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTimeout(() => {
                setLoading(false)
              }, 500)
            }}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button> */}
        </div>
      </CardHeader>
      <CardContent>
        {transactions?.length === 0 ? (
          <TransactionEmpty />
        ) : (
          <div className="space-y-3">
            {transactions?.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      tx.tipo === 'recarga'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {tx.tipo === 'recarga' ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.descripcion}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.fecha).toLocaleDateString('es-CO', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    tx.tipo === 'recarga' ? 'text-primary' : 'text-destructive'
                  }`}
                >
                  {tx.tipo === 'recarga' ? '+' : '-'}$
                  {tx.monto.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
