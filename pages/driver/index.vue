<script setup lang="ts">
import { Driver } from '@prisma/client'

const router = useRouter()

async function createDriver(driver: Driver) {
  const res = await useFetch('/api/driver/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })
  if (!res.data) {
    console.error('Error creating driver', res.error)
  }
  router.push('/')
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
