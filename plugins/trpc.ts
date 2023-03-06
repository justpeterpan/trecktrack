import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import { loggerLink } from '@trpc/client'
import SuperJSON from 'superjson'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      // adds pretty logs to your console in development and logs errors in production
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
    transformer: SuperJSON,
  })

  return {
    provide: {
      trpc,
    },
  }
})
