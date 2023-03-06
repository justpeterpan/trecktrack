import { createRouter, defineEventHandler, useBase } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const driver = createRouter()

driver.get(
  '/:id',
  defineEventHandler(async (event) => {
    if (!event.context?.params?.id) {
      throw new Error('No driver id provided')
    }
    const data = await prisma.driver.findUnique({
      where: {
        id: Number(event.context.params.id),
      },
      include: {
        Trip: true,
      },
    })
    if (!data) {
      throw new Error('No driver found')
    }
    return data
  })
)

export default useBase('/api/driver', driver.handler)
