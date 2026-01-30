import { useState } from 'react'
import { UserPlus, Mail, Phone, CreditCard, User } from 'lucide-react'
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
import { useRegisterAuth } from '../hooks/use-auth'
import { RegisterPayload } from '../api/interface'

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { mutateAsync, isPending: isLoading } = useRegisterAuth()
  const [formData, setFormData] = useState<RegisterPayload>({
    documento: '',
    nombres: '',
    email: '',
    celular: '',
  })
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setMessage(null)
      const result = await mutateAsync(formData)

      if (!result) {
        setMessage({
          type: 'error',
          text: 'No se pudo registrar el cliente. Por favor, intenta de nuevo.',
        })
        return
      }

      setFormData({ documento: '', nombres: '', email: '', celular: '' })
      onSuccess?.()
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al registrar el cliente. Por favor, intenta de nuevo.',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <UserPlus className="h-5 w-5 text-primary" />
          Registro de Cliente
        </CardTitle>
        <CardDescription>
          Crea una nueva cuenta de billetera digital
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documento" className="text-foreground">
              Documento de identidad
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="documento"
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
            <Label htmlFor="nombres" className="text-foreground">
              Nombres completos
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="nombres"
                placeholder="Juan Perez"
                value={formData.nombres}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nombres: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Correo electronico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular" className="text-foreground">
              Numero de celular
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="celular"
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
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar Cliente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
