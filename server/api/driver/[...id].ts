import { context } from 'esbuild'
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get(
  ':id',
  defineEventHandler(async (event) => {
    const params = event.context.params
    return params
  })
)

export default useBase('api/driver', router.handler)
