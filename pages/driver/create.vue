<script setup lang="ts">
import { Driver } from '@prisma/client'

const { $trpc } = useNuxtApp()
const router = useRouter()

async function createDriver(driver: Driver) {
  await $trpc.drivers.create.mutate({ name: driver.name })
  router.push('/driver')
}
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="driver"
      submit-label="Create Driver"
      @submit="createDriver"
    >
      <FormKit
        type="text"
        name="name"
        label="Your name"
        placeholder="Jane Doe"
        help="What do people call you?"
        validation="required"
      />
    </FormKit>
  </div>
</template>
