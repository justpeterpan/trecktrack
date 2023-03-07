<script setup lang="ts">
import { TripRequired } from '~/types/trip'
import { Driver } from '@prisma/client'

const { $trpc } = useNuxtApp()
const router = useRouter()
const selectOptions = ref({})
const { data: drivers, pending: driversPending } =
  await $trpc.drivers.getAll.useQuery()

function getDriversForSelect(drivers: Driver[] | null) {
  if (!!drivers?.length && !driversPending.value) {
    return drivers.reduce((acc: Record<number, string>, driver) => {
      acc[driver.id] = driver.name
      return acc
    }, {})
  }
  return {}
}
selectOptions.value = getDriversForSelect(drivers.value)

function calculateDuration(start: Date, end: Date) {
  return end.getTime() - start.getTime()
}

function calculateDistance(
  startMileage: number | string,
  endMileage: number | string
) {
  if (typeof startMileage === 'string') startMileage = parseFloat(startMileage)
  if (typeof endMileage === 'string') endMileage = parseFloat(endMileage)
  return endMileage - startMileage
}

async function createTrip(trip: TripRequired) {
  const formattedTrip = {
    ...trip,
    driverId: +trip.driverId,
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
  await $trpc.trips.create.mutate(formattedTrip)
  router.push('/')
}
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="driver"
      submit-label="Create Driver"
      @submit="createTrip"
    >
      <FormKit
        type="select"
        label="Who was driving"
        name="driverId"
        :options="selectOptions"
      />
      <FormKit
        type="text"
        name="startLocation"
        label="Start Location"
        placeholder="Start Location"
        help="Where did you start?"
        validation="required"
      />
      <FormKit
        type="text"
        name="endLocation"
        label="End Location"
        placeholder="End Location"
        help="Where did you end?"
        validation="required"
      />
      <FormKit
        type="datetime-local"
        name="startTime"
        label="Start Time"
        placeholder="Start Time"
        help="When did you start?"
        validation="required"
      />
      <FormKit
        type="datetime-local"
        name="endTime"
        label="End Time"
        placeholder="End Time"
        help="When did you end?"
        validation="required"
      />
      <FormKit
        type="number"
        name="startMileage"
        label="Start Mileage"
        placeholder="Start Mileage"
        help="How many km did you start with?"
        validation="required"
      />
      <FormKit
        type="number"
        name="endMileage"
        label="End Mileage"
        placeholder="End Mileage"
        help="How many km did you end with?"
        validation="required"
      />
      <FormKit
        type="textarea"
        rows="4"
        name="description"
        label="Description"
        placeholder="Description"
        help="What happened?"
        validation="required"
      />
    </FormKit>
  </div>
</template>
