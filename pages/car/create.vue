<script setup lang="ts">
import { Car } from '@prisma/client'

const { $trpc } = useNuxtApp()
const router = useRouter()

async function createCar(car: Car) {
  const formattedCar = getFormattedCar(car)
  await $trpc.cars.create.mutate(formattedCar)
  router.push('/car')
}
</script>

<template>
  <div>
    <Hero title="Cars" />
    <Content>
      <FormKit
        type="form"
        id="car"
        submit-label="Create Car"
        @submit="createCar"
      >
        <FormKit
          type="text"
          name="name"
          label="Car Name"
          placeholder="Car Name"
          help="What do people call your car?"
          validation="required"
        />
        <FormKit
          type="text"
          name="startingMileage"
          label="Starting Mileage"
          placeholder="Starting Mileage"
          help="What was the starting mileage?"
          validation="required"
        />
      </FormKit>
    </Content>
  </div>
</template>
