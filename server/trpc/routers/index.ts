import { router } from '../trpc'
import drivers from './drivers'
import trips from './trips'

export const appRouter = router({ drivers, trips })
export type AppRouter = typeof appRouter
