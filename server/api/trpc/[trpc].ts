import { createNuxtApiHandler } from 'trpc-nuxt'
import { createContext } from '~/server/trpc/context'
import { appRouter } from '~/server/trpc/routers'

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error)
    }
  },
})
