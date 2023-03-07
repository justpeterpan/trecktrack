import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

const DriverCreateShape = z.object({
  name: z.string(),
})

export default router({
  create: publicProcedure
    .input(DriverCreateShape)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.driver.create({
        data: {
          name: input.name,
        },
      })
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.driver.findMany({
      include: {
        Trip: true,
      },
    })
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.driver.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Trip: true,
        },
      })
    }),
})
