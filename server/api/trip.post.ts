import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  return await prisma.trip.create({
    data: {
      description: data.description,
      distance: data.distance,
      duration: data.duration,
      endLocation: data.endLocation,
      startLocation: data.startLocation,
      startTime: data.startTime,
      endTime: data.endTime,
      driverId: data.driverId,
    },
  })
})
