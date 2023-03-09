// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss'],
  build: {
    transpile: ['trpc-nuxt'],
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'h-full bg-gray-100',
      },
    },
  },
})
