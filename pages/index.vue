<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: trips, pending: tripsPending } =
  await $trpc.trips.getAll.useQuery()
</script>

<template>
  <div>
    <h1>TrekTrack</h1>
    <ul>
      <li>
        <NuxtLink to="/driver">drivers</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/trip">track trip</NuxtLink>
      </li>
    </ul>
    <section>
      <h2>Latest Trips</h2>
      <div v-if="!tripsPending && trips?.length">
        <ul>
          <li v-for="trip in trips" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
      </div>
      <div v-else>No Trips available</div>
    </section>
  </div>
</template>
