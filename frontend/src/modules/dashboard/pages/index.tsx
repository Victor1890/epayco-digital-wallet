import { MainLayout } from '@/modules/ui/main-layout'
import { BalanceCard } from '../components/balance-card'
import { RechargeForm } from '../components/recharge-form'
import { PaymentForm } from '../components/payment-form'
import { TransactionsList } from '../components/transactions-list'

export function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <BalanceCard />

        <div className="grid gap-6 md:grid-cols-2">
          <RechargeForm />
          <PaymentForm />
        </div>

        <TransactionsList />
      </div>
    </MainLayout>
  )
}
