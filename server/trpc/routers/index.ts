import { router } from '../trpc'
import cars from './cars'
import drivers from './drivers'
import trips from './trips'

export const appRouter = router({ cars, drivers, trips })
export type AppRouter = typeof appRouter
