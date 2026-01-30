import type { ReactNode } from 'react'
import { DefaultLayout } from './default-layout'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <DefaultLayout>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </DefaultLayout>
  )
}
