<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: cars, pending: carsPending } = await $trpc.cars.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Cars" />
    <Content title="Cars">
      <template #left v-if="!carsPending && cars?.length">
        <ul class="pb-4">
          <li
            v-for="car in cars"
            :key="car.id"
            class="last:border-b border-black border-dotted last:pb-4"
          >
            <NuxtLink :to="`/car/${car.id}`"> {{ car.name }}</NuxtLink>
          </li>
        </ul>
        <NuxtLink
          to="/car/create"
          class="border-dashed border-b border-orange-400"
          >Create Car</NuxtLink
        >
      </template>
      <template #left v-else>
        <p>No cars available</p>
        <NuxtLink
          to="/car/create"
          class="border-dashed border-b border-orange-400"
          >Create Car</NuxtLink
        >
      </template>
    </Content>
  </div>
</template>
