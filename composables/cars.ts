import { Car } from '@prisma/client'

export const getFormattedCar = (car: Car) => {
  return {
    ...car,
    startingMileage: +car.startingMileage,
    currentMileage: +car.startingMileage,
    updatedAt: new Date(),
  }
}

export const getCarsForSelect = (cars: Car[] | null) => {
  if (!!cars?.length) {
    return cars.reduce((acc: Record<number, string>, car) => {
      acc[car.id] = car.name
      return acc
    }, {})
  }
  return {}
}

export const useCalculatedCurrentMileage = async (
  distance: number,
  currentMileage: number
) => {
  return Number((distance + currentMileage).toFixed(2))
}
