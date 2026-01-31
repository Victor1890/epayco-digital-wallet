import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from '@/modules/integrations/tanstack-query/root-provider'

import { routeTree } from './routeTree.gen'
import { type QueryClient } from '@tanstack/react-query'
import { type SessionData } from '@/modules/auth/session'
import { NotFound } from '@/modules/core/components/not-found'
import { ErrorGloabal } from '@/modules/core/components/error-global'

export type RouterContext = {
  queryClient: QueryClient
  session: SessionData
}

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
      session: undefined!,
    },
    defaultPreload: 'intent',
    defaultErrorComponent: ErrorGloabal,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
