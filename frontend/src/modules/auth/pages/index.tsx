import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/modules/ui/components/tabs'
import { useState } from 'react'
import { LoginForm } from '../components/login-form'
import { RegisterForm } from '../components/register-form'
import { MainLayout } from '@/modules/ui/main-layout'

export function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              Bienvenido a tu Billetera Digital
            </h2>
            <p className="text-muted-foreground mt-2">
              Gestiona tus pagos de forma segura y rapida
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="cursor-pointer">
                Iniciar Sesion
              </TabsTrigger>
              <TabsTrigger value="register" className="cursor-pointer">
                Registrarse
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSuccess={() => setActiveTab('login')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
