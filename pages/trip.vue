<script setup lang="ts">
import { TripRequired } from '~/types/types'

const { $trpc } = useNuxtApp()
const router = useRouter()
const driverSelectOptions = ref({})
const carSelectOptions = ref({})

const { data: drivers } = await $trpc.drivers.getAll.useQuery()
const { data: cars } = await $trpc.cars.getAll.useQuery()
const selectedCar = ref(cars.value?.[0])
driverSelectOptions.value = getDriversForSelect(drivers.value)
carSelectOptions.value = getCarsForSelect(cars.value)

async function createTrip(trip: TripRequired) {
  const formattedTrip = useFormattedTrip(trip)
  const distance = calculateDistance(
    formattedTrip.startMileage,
    formattedTrip.endMileage
  )
  const { data: car } = await $trpc.cars.get.useQuery({
    id: +formattedTrip.carId,
  })
  const newCurrentMileage = await useCalculatedCurrentMileage(
    distance,
    car.value?.currentMileage || 0
  )
  const currentCarId =
    typeof trip.carId === 'number' ? trip.carId : trip.carId.id
  await $trpc.cars.updateMileage.mutate({
    id: currentCarId,
    currentMileage: newCurrentMileage,
    updatedAt: new Date(),
  })
  await $trpc.trips.create.mutate(formattedTrip)
  router.push('/')
}
</script>

<template>
  <div>
    <Hero title="Trips" />
    <Content title="Create Trip">
      <FormKit
        type="form"
        id="driver"
        submit-label="Track Trip"
        @submit="createTrip"
      >
        <FormKit
          type="select"
          label="Who was driving"
          name="driverId"
          :options="driverSelectOptions"
        />
        <FormKit
          type="select"
          label="Driving what?"
          name="carId"
          v-model="selectedCar"
          :options="carSelectOptions"
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
          type="text"
          name="startMileage"
          label="Start Mileage"
          placeholder="Start Mileage"
          help="How many km did you start with?"
          validation="required"
        />
        <FormKit
          type="text"
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
        />
      </FormKit>
    </Content>
  </div>
</template>
