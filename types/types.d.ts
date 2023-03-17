import { Car, Trip } from '@prisma/client'

interface TripOptional {
  id: number
  updatedAt: Date
}

interface TripOverWritten extends Trip {
  startTime: Date | string
  endTime: Date | string
}

type TripRequired = Omit<TripOverWritten, keyof TripOptional>
