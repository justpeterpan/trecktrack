<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: trips, pending: tripsPending } =
  await $trpc.trips.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Dashboard" />
    <Content title="Trips">
      <template #left v-if="!tripsPending && trips?.length">
        <ul>
          <li v-for="trip in trips" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
      </template>
      <template #left v-else> No trips yet </template>
    </Content>
  </div>
</template>
