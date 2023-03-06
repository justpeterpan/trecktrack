import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const data = await prisma.driver.findMany({ include: { Trip: true } })
  if (!data) {
    throw new Error('No drivers found')
  }
  return data
})
