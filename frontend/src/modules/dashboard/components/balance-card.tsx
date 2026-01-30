import { useAuthStore } from '@/modules/auth/store/auth.store'
import { Card, CardContent } from '@/modules/ui/components/card'
import { Wallet } from 'lucide-react'

export function BalanceCard() {
  const { data } = useAuthStore()

  const currentClient = data.client

  return (
    <Card className="bg-primary text-primary-foreground overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <CardContent className="pt-6 pb-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-foreground/80">
              Saldo disponible
            </p>
            <p className="text-3xl font-bold mt-1">
              ${currentClient.saldo.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <Wallet className="h-7 w-7" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-foreground/70">Celular</span>
            <span>{currentClient.celular}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-primary-foreground/70">Email</span>
            <span className="truncate ml-4">{currentClient.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
