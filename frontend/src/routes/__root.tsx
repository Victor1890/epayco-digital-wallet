import { useAppSession } from '@/modules/auth/session'
import { RootComponent } from '@/modules/core/root-component'
import { RouterContext } from '@/router'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import appCss from '../styles.css?url'
import { getRequest } from '@tanstack/react-start/server'

const fetchSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  // const session = await useAppSession()

  const cookieRaw = request.headers.get('cookie')

  console.log('Client Raw Cookie:', cookieRaw)

  // if (!client) {
  //   await session.update({
  //     isLogged: false,
  //     user: null,
  //   })
  //   return session.data
  // }

  // await session.update({
  //   isLogged: !!client,
  //   user: client,
  // })

  // return session.data
  return undefined
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await fetchSession()
    return {
      session,
    }
  },
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
