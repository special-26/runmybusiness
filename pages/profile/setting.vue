<template>
  <div class="p-6">
      sd
  </div>
</template>

<script setup>
  definePageMeta({
    colorMode: 'light',
    middleware: 'auth',
    layout: 'dashboard'
  })

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const toast = useToast()
</script>

<style>

</style>

