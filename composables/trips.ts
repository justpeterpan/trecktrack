import { Driver, Trip } from '@prisma/client'
import { TripRequired } from '~/types/types'

export const getDriversForSelect = (drivers: Driver[] | null) => {
  if (!!drivers?.length) {
    return drivers.reduce((acc: Record<number, string>, driver) => {
      acc[driver.id] = driver.name
      return acc
    }, {})
  }
  return {}
}

export const calculateDuration = (start: Date, end: Date) => {
  return end.getTime() - start.getTime()
}

export const calculateDistance = (
  startMileage: number | string,
  endMileage: number | string
) => {
  if (typeof startMileage === 'string') startMileage = parseFloat(startMileage)
  if (typeof endMileage === 'string') endMileage = parseFloat(endMileage)
  return endMileage - startMileage
}

export const getFormattedTrip = (trip: TripRequired) => {
  return {
    ...trip,
    driverId: +trip.driverId,
    carId: +trip.carId,
    startTime: new Date(trip.startTime).toISOString(),
    endTime: new Date(trip.endTime).toISOString(),
    startMileage: +trip.startMileage,
    endMileage: +trip.endMileage,
    distance: calculateDistance(trip.startMileage, trip.endMileage),
    duration: calculateDuration(
      new Date(trip.startTime),
      new Date(trip.endTime)
    ),
  }
}

export function sortTripsByDateDescending(trips: Trip[]) {
  return trips.sort((a: any, b: any) => a.startTime - b.startTime)
}
