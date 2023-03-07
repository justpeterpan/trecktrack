<script setup lang="ts">
const { $trpc } = useNuxtApp()
const route = useRoute()
const { data: driver, pending } = await $trpc.drivers.get.useQuery({
  id: +route.params.id,
})
</script>

<template>
  <div>
    <h1>Driver</h1>
    <div v-if="!pending && driver">
      <p>{{ driver.name }} {{ driver.Trip[0] }}</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
