import { useAuthStore } from '@/modules/auth/store/auth.store'
import { Button } from '@/modules/ui/components/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/ui/components/card'
import { Input } from '@/modules/ui/components/input'
import { cn } from '@/modules/ui/utils'
import { Label } from '@radix-ui/react-label'
import { DollarSign, Send } from 'lucide-react'
import { Fragment, type SubmitEventHandler } from 'react'

interface RequestViewProps {
  payload: { valor: string }
  isLoading?: boolean
  message?: { type: 'success' | 'error'; text: string } | null
  onSubmit: SubmitEventHandler<HTMLFormElement>
  setPayload: React.Dispatch<React.SetStateAction<RequestViewProps['payload']>>
}

export function RequestView({
  payload,
  isLoading,
  message,
  onSubmit,
  setPayload,
}: RequestViewProps) {
  const {
    data: { client: currentClient },
  } = useAuthStore()

  return (
    <Fragment>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Send className="h-5 w-5 text-primary" />
          Realizar Pago
        </CardTitle>
        <CardDescription>
          Paga de forma segura con confirmacion OTP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-valor" className="text-foreground">
              Valor del pago
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="payment-valor"
                type="number"
                placeholder="0"
                value={payload.valor}
                onChange={(e) =>
                  setPayload({ ...payload, valor: e.target.value })
                }
                className="pl-10"
                min="1"
                required
              />
            </div>
          </div>

          {currentClient && (
            <p className="text-xs text-muted-foreground">
              Como dijo el tio Ben:{' '}
              <span className="font-bold">
                "Con gran poder, conlleva una gran responsabilidad"
              </span>
              . Asegurate de que el valor a pagar es correcto antes de proceder.
            </p>
          )}

          {message && (
            <div
              className={cn(
                'rounded-lg p-3 text-sm',
                message.type === 'success'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-destructive/10 text-destructive',
              )}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !payload.valor}
          >
            {isLoading ? 'Procesando...' : 'Solicitar Pago'}
          </Button>
        </form>
      </CardContent>
    </Fragment>
  )
}
