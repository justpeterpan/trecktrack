<script setup lang="ts">
import { Trip } from '@prisma/client'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: driver, pending } = await $trpc.drivers.get.useQuery({
  id: +route.params.id,
})
const sortedTrips = useSortedTripsByDateDescending(driver.value?.Trip || [])

function getChartData() {
  const tripsByMonth =
    sortedTrips.reduce((acc, trip) => {
      const month = trip.startTime.getMonth()
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(trip)
      return acc
    }, {} as Record<number, Trip[]>) || {}

  const datasets = Object.keys(tripsByMonth).map((month) => {
    const trips: Trip[] = tripsByMonth[month]
    const distance = trips.reduce((acc, trip) => acc + trip.distance, 0)
    return {
      label: mapMonthToLabel(+month),
      data: [distance],
    }
  })

  return {
    labels: [''],
    datasets,
  }

  function mapMonthToLabel(month: number) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return months[month]
  }
}
</script>

<template>
  <div>
    <Hero v-if="!pending && driver?.id" :title="driver?.name" />
    <Content title="Latest Trips" v-if="!pending && driver?.id">
      <Bar v-if="driver.Trip.length" :data="getChartData()" />
      <ul v-if="driver.Trip.length">
        <li v-for="trip in sortedTrips" :key="trip.id">
          {{ trip.startTime }} {{ trip.description }}
        </li>
      </ul>
      <p v-else>no trips taken yet</p>
    </Content>
  </div>
</template>
