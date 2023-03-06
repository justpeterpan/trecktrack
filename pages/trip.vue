<script setup lang="ts">
import { TripRequired } from '@/types/trip'

const router = useRouter()
const formData: TripRequired = reactive({
  driverId: 1,
  description: '',
  startLocation: '',
  endLocation: '',
  distance: 0,
  duration: 0,
  startTime: '',
  endTime: '',
  createdAt: new Date(Date.now()),
})

function convertDateToISO(date: Date | string) {
  return new Date(date).toISOString()
}

function calculateDuration() {
  const start = new Date(formData.startTime)
  const end = new Date(formData.endTime)
  const duration = end.getTime() - start.getTime()
  formData.duration = duration
}

async function createTrip(event: Event) {
  event.preventDefault()
  formData.startTime = convertDateToISO(formData.startTime)
  formData.endTime = convertDateToISO(formData.endTime)
  calculateDuration()
  const res = await useFetch('/api/trip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  if (!res.data) {
    console.error('Error creating trip', res.error)
  }
  router.push('/')
}
</script>

<template>
  <div>
    <form @submit="createTrip">
      <h1>Create Driver</h1>
      <input
        autofocus
        placeholder="Driver"
        type="text"
        v-model="formData.driverId"
      />
      <input
        autofocus
        placeholder="Start"
        type="text"
        v-model="formData.startLocation"
      />
      <input
        autofocus
        placeholder="End"
        type="text"
        v-model="formData.endLocation"
      />
      <input
        autofocus
        placeholder="Start Time"
        type="datetime-local"
        v-model="formData.startTime"
      />
      <input
        autofocus
        placeholder="Start Time"
        type="datetime-local"
        v-model="formData.endTime"
      />
      <input
        autofocus
        placeholder="Distance in km"
        type="number"
        v-model="formData.distance"
      />
      <input
        autofocus
        placeholder="Description"
        type="text"
        v-model="formData.description"
      />
      <input type="submit" value="Create Trip" />
    </form>
    <pre>
      {{ formData }}
    </pre>
  </div>
</template>
