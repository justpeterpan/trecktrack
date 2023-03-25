<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: trips, pending: tripsPending } =
  await $trpc.trips.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Dashboard" />
    <Content title="Trips">
      <div v-if="!tripsPending && trips?.length">
        <ul>
          <li v-for="trip in trips" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
      </div>
      <div v-else>No trips yet</div>
    </Content>
  </div>
</template>
