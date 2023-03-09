<script setup lang="ts">
const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: driver, pending } = await $trpc.drivers.get.useQuery({
  id: +route.params.id,
})
</script>

<template>
  <div>
    <Hero v-if="!pending && driver?.id" :title="driver?.name" />
    <Content title="Latest Trips" v-if="!pending && driver?.id">
      <template #left>
        <ul v-if="driver.Trip.length" cl>
          <li v-for="trip in driver.Trip" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
        <p v-else>no trips taken yet</p>
      </template>
    </Content>
  </div>
</template>
