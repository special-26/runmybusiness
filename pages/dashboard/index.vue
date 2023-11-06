<template>

  <div class="overflow-hidden dark:bg-slate-900 dark:border-gray-700 p-12">
     
  </div>

  <!-- new setup -->
  <div class="fixed bg-white/50 backdrop-blur top-0 left-0 right-0 bottom-0 z-40" v-if="!profile.website">
    <div class="bg-white shadow max-w-5xl mx-auto h-screen overflow-y-auto">
      <NewSetup />
    </div>
  </div>

</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })

    const website_name = ref('')

    let { data: profile, error } = await supabase
        .from('profiles')
        .select('website,full_name')
        .single()


</script>

<style scoped>

</style>