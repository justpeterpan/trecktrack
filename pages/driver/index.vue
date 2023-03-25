<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: drivers, pending: driversPending } =
  await $trpc.drivers.getAll.useQuery()
</script>

<template>
  <div>
    <Hero title="Drivers" />
    <Content>
      <div v-if="!driversPending && drivers?.length">
        <div class="mt-6 flow-root">
          <ul role="list" class="-my-5 divide-y divide-gray-200">
            <li v-for="driver in drivers" :key="driver.id" class="py-4">
              <DriverRow
                :driverName="driver.name"
                :tripCount="driver.Trip.length"
                :driver-id="driver.id"
              />
            </li>
          </ul>
        </div>
        <NuxtLink
          to="/driver/create"
          class="mt-6 flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >Create Driver</NuxtLink
        >
      </div>
      <div v-else>
        <p>No Drivers available</p>
        <div class="mt-6">
          <NuxtLink
            to="/driver/create"
            class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            >Create Driver</NuxtLink
          >
        </div>
      </div>
    </Content>
  </div>
</template>
