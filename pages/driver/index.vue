<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: drivers, pending: driversPending } =
  await $trpc.drivers.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Drivers" />
    <Content title="Drivers">
      <template #left v-if="!driversPending && drivers?.length">
        <ul class="pb-4">
          <li
            v-for="driver in drivers"
            :key="driver.id"
            class="last:border-b border-black border-dotted last:pb-4"
          >
            <NuxtLink :to="`/driver/${driver.id}`"> {{ driver.name }}</NuxtLink>
          </li>
        </ul>
        <NuxtLink
          to="/driver/create"
          class="border-dashed border-b border-orange-400"
          >Create Driver</NuxtLink
        >
      </template>
      <template #left v-else>No Drivers available</template>
    </Content>
  </div>
</template>
