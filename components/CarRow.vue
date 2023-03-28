<script setup lang="ts">
const props = defineProps<{
  carName: string
  mileage: number
  carId: number
}>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img
        class="h-8 w-8 rounded-full bg-indigo-400"
        src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5358e38e249322cc0675e2_peep-62.png"
        alt=""
      />
    </div>
    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-gray-900">
        {{ props.carName }}
      </p>
      <p class="truncate text-sm text-gray-500">
        Mileage: {{ props.mileage }} km
      </p>
    </div>
    <div>
      <NuxtLink
        :to="`/car/${props.carId}`"
        class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >View</NuxtLink
      >
    </div>
  </div>
</template>
