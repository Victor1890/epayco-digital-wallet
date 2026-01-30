import { useAuthStore } from '@/modules/auth/store/auth.store'
import { Card } from '@/modules/ui/components/card'
import { useState } from 'react'
import {
  useRequestPayment,
  useConfirmPayment,
  useCheckBalance,
} from '@/modules/dashboard/hooks/use-fetch'
import { ConfirmView } from './confirm-view'
import { RequestView } from './request-view'

export function PaymentForm() {
  const {
    data: { client: currentClient },
    setData: setAuthData,
  } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [payload, setPayload] = useState<{
    valor: string
  }>({
    valor: '',
  })
  const [step, setStep] = useState<'request' | 'confirm'>('request')
  const [data, setData] = useState({
    sessionId: '',
    token: '',
  })

  const requestPaymentMutation = useRequestPayment()
  const confirmPaymentMutation = useConfirmPayment()
  const checkBalanceQuery = useCheckBalance()

  const handleCancel = () => {
    setStep('request')
    setPayload({ valor: '' })
    setData({ sessionId: '', token: '' })
    setMessage(null)
  }

  const handleRequestPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentClient) return

    setLoading(true)
    setMessage(null)

    try {
      const result = await requestPaymentMutation.mutateAsync({
        celular: currentClient.celular,
        documento: currentClient.documento,
        valor: Number(payload.valor),
      })

      setData(result)

      setStep('confirm')
      setMessage({
        type: 'success',
        text: 'Pago solicitado exitosamente. Por favor, confirma el pago con el token enviado.',
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al solicitar el pago. Por favor, inténtalo de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const result = await confirmPaymentMutation.mutateAsync({
        sessionId: data.sessionId,
        token: data.token,
      })

      const isSuccessful = result.isValid

      setMessage({
        type: isSuccessful ? 'success' : 'error',
        text: isSuccessful
          ? 'Pago confirmado exitosamente.'
          : 'Token inválido. Por favor, verifica e inténtalo de nuevo.',
      })

      if (!isSuccessful) return

      const balanceResult = await checkBalanceQuery.mutateAsync({
        documento: currentClient.documento,
        celular: currentClient.celular,
      })

      setAuthData({
        client: {
          ...currentClient,
          saldo: balanceResult.saldo,
        },
      })

      handleCancel()
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al confirmar el pago. Por favor, inténtalo de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      {step === 'request' ? (
        <RequestView
          payload={payload}
          isLoading={loading}
          message={message}
          onSubmit={handleRequestPayment}
          setPayload={setPayload}
        />
      ) : (
        <ConfirmView
          payload={payload}
          data={data}
          isLoading={loading}
          message={message}
          onSubmit={handleConfirmPayment}
          onCancel={handleCancel}
        />
      )}
    </Card>
  )
}
