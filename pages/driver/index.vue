<script setup lang="ts">
const router = useRouter()

async function createDriver(data: string) {
  const res = await useFetch('/api/driver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
