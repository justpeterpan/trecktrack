<script setup lang="ts">
const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: driver, pending } = await $trpc.drivers.get.useQuery({
  id: +route.params.id,
})
</script>

<template>
  <div>
    <h1>Driver</h1>
    <div v-if="!pending && driver">
      <p>{{ driver.name }}</p>
      <div v-if="!driver.Trip.length">No trips taken yet</div>

      <template v-else>
        <ul>
          <li v-for="trip in driver.Trip" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
      </template>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
