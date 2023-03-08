<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: drivers, pending: driversPending } =
  await $trpc.drivers.getAll.useQuery()
</script>

<template>
  <div>
    <h2>Drivers</h2>
    <div v-if="!driversPending && drivers?.length">
      <ul>
        <li v-for="driver in drivers" :key="driver.id">
          <NuxtLink :to="`/driver/${driver.id}`"> {{ driver.name }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>No Drivers available</div>
    <NuxtLink to="/driver/create">Create Driver</NuxtLink>
  </div>
</template>
