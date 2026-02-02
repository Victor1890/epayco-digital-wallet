import { Button } from '@/modules/ui/components/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/ui/components/card'
import { Input } from '@/modules/ui/components/input'
import { Label } from '@/modules/ui/components/label'
import { Check, Copy, ShieldCheck } from 'lucide-react'
import { SubmitEventHandler, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

interface ConfirmViewProps {
  payload: { valor: string }
  data: { sessionId: string; otp: string }
  isLoading?: boolean
  message?: { type: 'success' | 'error'; text: string } | null
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onCancel: () => void
}

export function ConfirmView({
  payload,
  isLoading,
  message,
  data,
  onSubmit,
  onCancel,
}: ConfirmViewProps) {
  const [isCopied, setCopied] = useState(false)

  const handleCopyToken = async () => {
    await navigator.clipboard.writeText(data.otp)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Fragment>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Confirmar Pago
        </CardTitle>
        <CardDescription>
          Ingresa el token de 6 digitos enviado a tu email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Monto a pagar</p>
          <p className="text-2xl font-bold text-foreground">
            ${Number(payload.valor).toLocaleString()}
          </p>
        </div>

        <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">
            Token de confirmacion (demo)
          </p>
          <div className="flex items-center justify-between">
            <code className="text-lg font-mono font-bold text-primary tracking-widest">
              {data.otp}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyToken}
              className="h-8 w-8 p-0"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token" className="text-foreground">
              Token OTP
            </Label>
            <Input
              id="token"
              placeholder="000000"
              value={data.otp}
              readOnly
              className="text-center text-xl tracking-widest font-mono"
              required
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.type === 'success'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || data?.otp?.length !== 6}
            >
              {isLoading ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Fragment>
  )
}
