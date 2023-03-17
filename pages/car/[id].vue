<script setup lang="ts">
import { Driver, Trip } from '@prisma/client'

const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: car, pending } = await $trpc.cars.get.useQuery({
  id: +route.params.id,
})
const { data: drivers } = await $trpc.drivers.getAll.useQuery()
function mapDriver(id: number) {
  return drivers.value?.find((driver: Driver) => driver.id === id)
}
function sortTripsByDateDescending(trips: Trip[]) {
  return trips.sort((a: any, b: any) => a.startTime - b.startTime)
}
</script>

<template>
  <div>
    <Hero v-if="!pending && car?.id" :title="car?.name" />
    <Content title="Latest Trips" v-if="!pending && car?.id">
      <template #left>
        <div v-if="car?.id" class="border-b border-gray-200 pb-4 mb-4">
          starting: {{ car.startingMileage }} km, current:
          {{ car.currentMileage }} km -
          {{ car.currentMileage - car.startingMileage }} km traveled since
          {{ car.createdAt.toLocaleDateString() }}
        </div>
        <ul v-if="car.Trip.length">
          <li
            v-for="trip in sortTripsByDateDescending(car.Trip)"
            :key="trip.id"
          >
            {{ trip.startTime.toLocaleDateString() }} - {{ trip.distance }} km -
            {{ trip.duration / 3_600_000 }} h | from:
            {{ trip.startLocation }} to: {{ trip.endLocation }} |
            {{ mapDriver(trip.driverId)?.name }}
          </li>
        </ul>
        <p v-else>no trips yet</p>
      </template>
    </Content>
  </div>
</template>
