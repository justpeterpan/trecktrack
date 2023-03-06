import { router } from '../trpc'
import drivers from './drivers'

export const appRouter = router({ drivers })
export type AppRouter = typeof appRouter
