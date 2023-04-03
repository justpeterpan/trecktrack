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

export function useConvertedMillisecondsToTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)

  let result = ''

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`
  }

  if (minutes > 0) {
    if (result) {
      result += ', '
    }
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  if (seconds > 0) {
    if (result) {
      result += ', '
    }
    result += `${seconds} second${seconds > 1 ? 's' : ''}`
  }

  return result
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
  return Number((endMileage - startMileage).toFixed(2))
}

export const useFormattedTrip = (trip: TripRequired) => {
  const currentCarId =
    typeof trip.carId === 'number' ? trip.carId : trip.carId.id
  return {
    ...trip,
    driverId: +trip.driverId,
    carId: currentCarId,
    startTime: new Date(trip.startTime).toISOString(),
    endTime: new Date(trip.endTime).toISOString(),
    startMileage:
      typeof trip.startMileage === 'string'
        ? parseFloat(trip.startMileage)
        : trip.endMileage,
    endMileage:
      typeof trip.endMileage === 'string'
        ? parseFloat(trip.endMileage)
        : trip.endMileage,
    distance: calculateDistance(trip.startMileage, trip.endMileage),
    duration: calculateDuration(
      new Date(trip.startTime),
      new Date(trip.endTime)
    ),
  }
}

export function useSortedTripsByDateDescending(trips: Trip[]): Trip[] {
  return trips.sort((a: any, b: any) => a.startTime - b.startTime)
}
