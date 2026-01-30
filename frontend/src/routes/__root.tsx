import { createRootRouteWithContext } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { RouterContext } from '@/router'
import { RootComponent } from '@/modules/core/root-component'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootComponent,
})
