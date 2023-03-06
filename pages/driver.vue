<script setup lang="ts">
const router = useRouter()
const formData = reactive({
  name: '',
})

async function createDriver(event: Event) {
  event.preventDefault()
  const res = await useFetch('/api/driver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  if (!res.data) {
    console.error('Error creating driver', res.error)
  }
  router.push('/')
}
</script>

<template>
  <div>
    <form @submit="createDriver">
      <h1>Create Driver</h1>
      <input autofocus placeholder="Name" type="text" v-model="formData.name" />
      <input type="submit" value="Create User" />
    </form>
  </div>
</template>
