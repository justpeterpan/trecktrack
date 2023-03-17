import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

const CarShape = z.object({
  name: z.string(),
  startingMileage: z.number(),
  currentMileage: z.number(),
  updatedAt: z.date().optional(),
})

const CarUpdateMileageShape = z.object({
  id: z.number(),
  currentMileage: z.number(),
  updatedAt: z.date(),
})

export default router({
  create: publicProcedure.input(CarShape).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.car.create({
      data: {
        name: input.name,
        startingMileage: input.startingMileage,
        currentMileage: input.currentMileage,
        updatedAt: input.updatedAt,
      },
    })
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.car.findMany({
      include: {
        Trip: true,
      },
    })
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.car.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Trip: true,
        },
      })
    }),
  updateMileage: publicProcedure
    .input(CarUpdateMileageShape)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.car.update({
        where: {
          id: input.id,
        },
        data: {
          currentMileage: input.currentMileage,
          updatedAt: input.updatedAt,
        },
      })
    }),
})
