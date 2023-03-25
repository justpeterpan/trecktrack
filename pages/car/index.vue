<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: cars, pending: carsPending } = await $trpc.cars.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Cars" />
    <Content title="Cars">
      <div v-if="!carsPending && cars?.length" class="mt-6 flow-root">
        <ul role="list" class="-my-5 divide-y divide-gray-200">
          <li v-for="car in cars" :key="car.id" class="py-4">
            <CarRow
              :car-name="car.name"
              :mileage="car.currentMileage"
              :car-id="car.id"
            />
          </li>
        </ul>
        <NuxtLink
          to="/car/create"
          class="mt-6 flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >Create Car</NuxtLink
        >
      </div>
      <div v-else>
        <p>No cars available</p>
        <NuxtLink
          to="/car/create"
          class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >Create Car</NuxtLink
        >
      </div>
    </Content>
  </div>
</template>
