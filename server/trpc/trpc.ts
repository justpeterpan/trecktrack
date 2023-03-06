import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'
import type { Context } from '~/server/trpc/context'

const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause!.flatten()
            : null,
      },
    }
  },
})

export const publicProcedure = trpc.procedure
export const router = trpc.router
export const middleware = trpc.middleware
export const mergeRouters = trpc.mergeRouters
