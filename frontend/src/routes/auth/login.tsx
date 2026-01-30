import { AuthPage } from '@/modules/auth/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: AuthPage,
})
