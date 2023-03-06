<script setup lang="ts">
const { data: drivers, pending: driversPending } = await useFetch(
  '/api/drivers',
  {
    key: 'drivers',
  }
)
const { data: trips, pending: tripsPending } = await useFetch('/api/trips', {
  key: 'trips',
})

const { data } = await useFetch('/api/driver/1')
console.log(data.value)
</script>

<template>
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <NuxtLink to="/driver">create drivers</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/trip">create trip</NuxtLink>
      </li>
    </ul>
    <section>
      <h2>Drivers</h2>
      <div v-if="!driversPending && drivers?.length">
        <ul>
          <li v-for="driver in drivers" :key="driver.id">
            {{ driver.name }} {{ driver.Trip }}
          </li>
        </ul>
      </div>
      <div v-else>No Drivers available</div>
    </section>
    <section>
      <h2>Trips</h2>
      <div v-if="!tripsPending && trips?.length">
        <ul>
          <li v-for="trip in trips" :key="trip.id">
            {{ trip.startTime }} {{ trip.description }}
          </li>
        </ul>
      </div>
      <div v-else>No Drivers available</div>
    </section>

    <pre>{{ data }}</pre>
  </div>
</template>
