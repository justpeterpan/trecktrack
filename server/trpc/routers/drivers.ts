import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

const DriverCreateShape = z.object({
  name: z.string(),
})

const DriverResultShape = z.object({
  id: z.number(),
  name: z.string(),
  Trip: z.array(
    z.object({
      id: z.number(),
      description: z.string(),
      distance: z.number(),
      duration: z.number(),
      startLocation: z.string(),
      endLocation: z.string(),
      startMileage: z.number(),
      endMileage: z.number(),
      startTime: z.string(),
      endTime: z.string(),
      driverId: z.number(),
    })
  ),
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
})
