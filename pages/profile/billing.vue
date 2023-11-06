<template>
  <div class="relative">
      <header class="bg-white w-full flex justify-between items-center pr-6 h-[50px] border-b border-dotted">
          <ProfileNav />
      </header>

      <section class="p-6">
        <div class="flex flex-col md:flex-row gap-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl md:w-[50%] w-full">
                <h6 class="mb-3">Plan & Billing</h6>
                <div class="flex flex-col md:flex-row border justify-between border-gray-200 rounded-xl p-8 dark:border-gray-700 mb-4">
                    <div>
                        <span class="text-sm text-gray-500">Plan</span>
                        <h4 class="font-medium text-lg uppercase text-gray-800 dark:text-gray-200">{{ plan_name }}</h4>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">Payment</span>
                        <div class="font-bold text-gray-800 dark:text-gray-200">
                            <span class="font-bold mr-1">₹</span>
                            <span class="text-2xl">{{ billing_amount }}</span>
                            <span class="text-sm">/{{ billing_tenor }}</span>
                        </div>
                    </div>
                </div>

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Billing Name</th>
                            <td class="py-4 text-right">{{ profile.full_name }}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Billing Email</th>
                            <td class="py-4 text-right">{{ user.email }}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Billing Address</th>
                            <td class="py-4 text-right">{{ billing_address }}</td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Billing phone number</th>
                            <td class="py-4 text-right">{{ profile.phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl md:w-[50%] w-full">
                <h6 class="mb-5">Invoice History</h6>

                <div class="flex gap-6 items-center border-t py-4" v-for="bill in invoices" :key="bill.id">
                    <div class="w-[60%]">
                        <div class="md:text-sm text-xs">{{ bill.invoice_id }}</div>
                        <div class="text-xs text-zinc-400 dark:text-zinc-800">{{ $dayjs(bill.created_at).format('D MMM YYYY') }}</div>
                    </div>
                    <div class="w-[20%] text-xs bg-red-50 border border-red-300 rounded-lg text-red-600 px-2 py-1 text-center">{{ bill.status }}</div>
                    <a :href="bill.payment_link" target="_blank" class="text-xs md:text-sm w-[20%]">Pay now</a>
                </div>
            </div>
        </div>
      </section>
    
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

  const plan_name = ref('')
  const billing_amount = ref('')
  const billing_email = ref('')
  const billing_address = ref('')
  const billing_contact = ref('')

  let { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.value.id)
    .order('id', { ascending: false })

  // Fetch Profile
  let { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', user.value.id)
      .single()

</script>

<style>

</style>

