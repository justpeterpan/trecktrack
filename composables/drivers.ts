import { Driver, Trip } from '@prisma/client'

export function useMapDriver(
  drivers: (Driver & { Trip: Trip[] })[] | null,
  id: number
) {
  return drivers?.find((driver: Driver) => driver.id === id)
}
