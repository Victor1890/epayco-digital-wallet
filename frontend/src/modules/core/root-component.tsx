import { HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import TanStackQueryDevtools from '@/modules/integrations/tanstack-query/devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

export function RootComponent() {
  return (
    <html
      lang="es-DO"
      className="min-h-full font-sans"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body
        className="antialiased bg-white max-w-none min-h-full"
        suppressHydrationWarning
      >
        <Outlet />

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
