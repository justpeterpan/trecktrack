import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const data = await prisma.trip.findMany()
  if (!data) {
    throw new Error('No trips found')
  }
  return data
})
