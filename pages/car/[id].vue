<script setup lang="ts">
const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: car, pending } = await $trpc.cars.get.useQuery({
  id: +route.params.id,
})
</script>

<template>
  <div>
    <Hero v-if="!pending && car?.id" :title="car?.name" />
    <Content title="Latest Trips" v-if="!pending && car?.id">
      <template #left>
        <ul v-if="car.Trip.length" cl>
          <li v-for="trip in car.Trip" :key="trip.id">
            {{ car.startingMileage }} {{ car.currentMileage }}
          </li>
        </ul>
        <p v-else>no trips yet</p>
      </template>
    </Content>
  </div>
</template>
