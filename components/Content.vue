<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <section
    class="rounded-lg bg-white px-5 py-6 shadow sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 overflow-hidden"
  >
    <div class="lg:col-span-7 lg:px-0 xl:col-span-6">
      <h2 class="text-2xl font-bold tracking-tight pb-2">{{ props.title }}</h2>
      <slot name="left" />
    </div>
    <div
      v-if="$slots.right"
      class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
    >
      <slot name="right" />
    </div>
  </section>
</template>
