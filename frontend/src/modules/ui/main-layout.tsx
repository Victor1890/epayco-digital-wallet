import type { ReactNode } from 'react'
import { DefaultLayout } from './default-layout'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <DefaultLayout>
      <main>{children}</main>
    </DefaultLayout>
  )
}
