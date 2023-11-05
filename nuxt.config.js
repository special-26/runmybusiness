// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['~/assets/css/tiptap.css'],
  ui: {
    notifications: {
      position: 'top-0 right-0'
    }
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "nuxt-chatgpt",
    "dayjs-nuxt"
  ],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, 
  },
  chatgpt: {
    apiKey: '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'
  },
  tailwindcss: {
    configPath: 'tailwind.config.js',
    config: {
      theme: {
        extend: {
          colors: {
              primary: "#facc15",
              secondary: "#4338ca",
          },
        },
      },
    }
  },
})