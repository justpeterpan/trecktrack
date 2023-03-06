import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  return await prisma.trip.create({
    data: {
      description: data.description,
      distance: data.distance,
      duration: data.duration,
      startLocation: data.startLocation,
      endLocation: data.endLocation,
      startMileage: data.startMileage,
      endMileage: data.endMileage,
      startTime: data.startTime,
      endTime: data.endTime,
      driverId: data.driverId,
    },
  })
})
