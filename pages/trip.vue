<script setup lang="ts">
import { getFormattedTrip } from '~/composables/trips'
import { TripRequired } from '~/types/trip'

const { $trpc } = useNuxtApp()
const router = useRouter()
const selectOptions = ref({})

const { data: drivers } = await $trpc.drivers.getAll.useQuery()
selectOptions.value = getDriversForSelect(drivers.value)

async function createTrip(trip: TripRequired) {
  const formattedTrip = getFormattedTrip(trip)
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
        validation="required|number|min:startMileage"
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
  </div>
</template>
