<script setup lang="ts">
import { Driver, Trip } from '@prisma/client'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: car, pending } = await $trpc.cars.get.useQuery({
  id: +route.params.id,
})
const { data: drivers } = await $trpc.drivers.getAll.useQuery()
const sortedTrips = sortTripsByDateDescending(car.value?.Trip || [])

function mapDriver(id: number) {
  return drivers.value?.find((driver: Driver) => driver.id === id)
}

function getChartData() {
  const driversWithTrips = drivers.value?.filter((driver: Driver) =>
    car.value?.Trip.find((trip: Trip) => trip.driverId === driver.id)
  )
  const datasets =
    driversWithTrips?.map((driver: Driver) => {
      const trips =
        car.value?.Trip.filter((trip: Trip) => trip.driverId === driver.id) ||
        []
      const distance =
        trips?.reduce((acc: number, trip: Trip) => acc + trip.distance, 0) || 0
      return {
        label: driver.name,
        data: [distance],
      }
    }) || []
  return {
    labels: [''],
    datasets,
  }
}

const chartData = ref(getChartData())
const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Distance traveled by driver',
    },
  },
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
        <Bar :data="chartData" :options="chartOptions" />
        <ul v-if="car.Trip.length">
          <li v-for="trip in sortedTrips" :key="trip.id">
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
