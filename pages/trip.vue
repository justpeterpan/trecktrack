<script setup lang="ts">
import { getFormattedTrip } from '~/composables/trips'
import { TripRequired } from '~~/types/types.js'

const { $trpc } = useNuxtApp()
const router = useRouter()
const driverSelectOptions = ref({})
const carSelectOptions = ref({})

const { data: drivers } = await $trpc.drivers.getAll.useQuery()
const { data: cars } = await $trpc.cars.getAll.useQuery()
driverSelectOptions.value = getDriversForSelect(drivers.value)
carSelectOptions.value = getCarsForSelect(cars.value)

async function createTrip(trip: TripRequired) {
  const formattedTrip = getFormattedTrip(trip)
  const distance = calculateDistance(
    formattedTrip.startMileage,
    formattedTrip.endMileage
  )

  const { data: car } = await $trpc.cars.get.useQuery({
    id: +formattedTrip.carId,
  })

  const newCurrentMileage = await getCalculatedCurrentMileage(
    distance,
    car.value?.currentMileage || 0
  )

  await $trpc.cars.updateMileage.mutate({
    id: +trip.carId,
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
    <Content title="Create Trip" class="relative">
      <template #left>
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
            validation="required|number"
            :validation-messages="{
              min: 'you can\'t drive backwards',
            }"
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
      </template>
      <template #right>
        <img
          class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          src="/side.png"
          alt=""
        />
      </template>
    </Content>
  </div>
</template>
