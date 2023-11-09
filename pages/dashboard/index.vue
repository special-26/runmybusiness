<template>

  <div class="overflow-hidden dark:bg-slate-900 dark:border-gray-700 p-12">
    <div class="grid grid-cols-2 gap-6">
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
          <div class="text-sm text-left text-zinc-600">Total Products</div>
          <h2 class="text-center text-[4em] font-bold">{{ total_products }}</h2>
          <p></p>
        </div>
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
          <div class="text-sm text-left text-zinc-600">Total Categories</div>
          <h2 class="text-center text-[4em] font-bold">{{ total_category }}</h2>
          <p></p>
        </div>
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
          <div class="text-sm text-left text-zinc-600">Total Contact Leads</div>
          <h2 class="text-center text-[4em] font-bold">{{ total_leads }}</h2>
          <p></p>
        </div>
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
          <div class="text-sm text-left text-zinc-600">Total Social Links</div>
          <h2 class="text-center text-[4em] font-bold">{{ total_social }}</h2>
          <p></p>
        </div>
     </div>
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

    const total_products = ref('')
    const total_category = ref('')
    const total_leads = ref('')
    const total_social = ref('')

    const fetchData = async() => {
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true})
        .eq('user_id', user.value.id)
        .then((res) => {
          total_products.value = res.count
        })
      // Category
      supabase
        .from('product_category')
        .select('*', { count: 'exact', head: true})
        .eq('user_id', user.value.id)
        .then((res) => {
          total_category.value = res.count
        })
      // Contact Lead
      supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true})
        .eq('user_id', user.value.id)
        .then((res) => {
          total_leads.value = res.count
        })
      // social links
      supabase
        .from('social_links')
        .select('*', { count: 'exact', head: true})
        .eq('user_id', user.value.id)
        .then((res) => {
          total_social.value = res.count
        })
    }

    fetchData()


</script>

<style scoped>

</style>