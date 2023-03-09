<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <header class="py-10 px-5">
    <h1 class="text-3xl font-bold tracking-tight text-white">
      {{ props.title }}
    </h1>
  </header>
</template>
