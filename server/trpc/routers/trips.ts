import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

const TripShape = z.object({
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

export default router({
  create: publicProcedure.input(TripShape).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.trip.create({
      data: {
        description: input.description,
        distance: input.distance,
        duration: input.duration,
        startLocation: input.startLocation,
        endLocation: input.endLocation,
        startMileage: input.startMileage,
        endMileage: input.endMileage,
        startTime: input.startTime,
        endTime: input.endTime,
        driverId: input.driverId,
      },
    })
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.trip.findMany({ orderBy: { id: 'asc' } })
  }),
})
