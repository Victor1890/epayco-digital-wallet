import { useState } from 'react'
import { Plus, DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/ui/components/card'
import { Label } from '@/modules/ui/components/label'
import { Input } from '@/modules/ui/components/input'
import { Button } from '@/modules/ui/components/button'
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { useReloadBalance } from '../hooks/use-fetch'
import { QUICK_AMOUNTS } from '../constants'

export function RechargeForm() {
  const { data } = useAuthStore()

  const currentClient = data.client

  const { mutateAsync, isPending: isLoading } = useReloadBalance()

  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [valor, setValor] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentClient) return

    setMessage(null)

    const result = await mutateAsync({
      celular: currentClient.celular,
      documento: currentClient.documento,
      valor: Number(valor),
    })

    console.log('Reload balance result:', result)

    if ('saldo' in result) {
      // Update local store balance
      useAuthStore.getState().setData({
        client: {
          ...currentClient,
          saldo: result.saldo,
        },
      })

      setMessage({
        type: 'success',
        text: `Recarga exitosa. Nuevo saldo: $${result.saldo.toLocaleString('es-CO')}`,
      })

      setValor('')

      return
    }

    setMessage({
      type: 'error',
      text: 'Hubo un error al procesar la recarga. Por favor, intenta nuevamente.',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Plus className="h-5 w-5 text-primary" />
          Recargar Billetera
        </CardTitle>
        <CardDescription>Agrega saldo a tu billetera</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="valor" className="text-foreground">
              Valor a recargar
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="valor"
                type="number"
                placeholder="0"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="pl-10"
                min="1"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setValor(amount.toString())}
                className="text-xs"
              >
                ${amount.toLocaleString()}
              </Button>
            ))}
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

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !valor}
          >
            {isLoading ? 'Procesando...' : 'Recargar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
