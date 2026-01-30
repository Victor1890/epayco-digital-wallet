import { useState } from 'react'
import { LogIn, CreditCard, Phone } from 'lucide-react'
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
import { useLoginAuth } from '../hooks/use-auth'
import { LoginPayload } from '../api/interface'

export function LoginForm() {
  const [formData, setFormData] = useState<LoginPayload>({
    celular: '',
    documento: '',
  })

  const { mutateAsync, isPending: isLoading, error } = useLoginAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await mutateAsync(formData)

    if (!result.success) {
      return
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <LogIn className="h-5 w-5 text-primary" />
          Iniciar Sesion
        </CardTitle>
        <CardDescription>Accede a tu billetera digital</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-documento" className="text-foreground">
              Documento de identidad
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-documento"
                placeholder="12345678"
                value={formData.documento}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    documento: e.target.value,
                  }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-celular" className="text-foreground">
              Numero de celular
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-celular"
                placeholder="3001234567"
                value={formData.celular}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, celular: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error.message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Acceder'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
