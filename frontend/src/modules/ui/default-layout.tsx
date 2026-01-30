import { Header } from '@/modules/ui/components/common/header'
import type { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: Readonly<DefaultLayoutProps>) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
    </div>
  )
}
