<template>
  <div class="relative">
      <header class="bg-white w-full flex justify-between items-center pr-6 h-[50px] border-b border-dotted">
          <ProfileNav />
      </header>

      <section class="p-6">
        <div class="flex flex-col md:flex-row gap-6" v-if="profile">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl md:w-[50%] w-full">
                <h6 class="mb-3">Plan & Billing</h6>
                <div class="flex flex-col md:flex-row border justify-between border-gray-200 rounded-xl p-8 dark:border-gray-700 mb-4 relative">
                    <div>
                        <span class="text-sm text-gray-500">Plan</span>
                        <h4 class="font-medium text-lg uppercase text-gray-800 dark:text-gray-200">{{ profile.pricings.plan_name }}</h4>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">Payment</span>
                        <div class="text-gray-800 dark:text-gray-200">
                            <span class="font-bold mr-1">₹</span>
                            <span class="text-2xl">
                                <span 
                                    :class="profile.pricing_offer ? 'line-through text-zinc-500 text-sm' : 'font-bold text-3xl'"
                                >{{ profile.pricings.price }}</span>
                                <span class="font-bold text-3xl" v-if="profile.pricing_offer">
                                    {{ profile.pricings.price - ((profile.pricings.price / 100) * profile.pricing_offer).toFixed(0) }}
                                </span>
                            </span>
                            <span class="text-sm">/{{ profile.pricings.plan_name }}</span>
                        </div>
                    </div>
                    <!-- offer badge -->
                    <span v-if="profile.pricing_offer" class="absolute -top-2 -right-2 bg-purple-400 rounded-lg text-xs px-3 py-1.5">{{profile.pricing_offer}}% Off</span>
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
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Billing phone number</th>
                            <td class="py-4 text-right">{{ profile.phone }}</td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Website Type</th>
                            <td class="py-4 text-right">{{ profile.website_type }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="w-full md:w-[50%] space-y-6">
                <!-- Change Plan -->
                <div class="p-6 bg-white dark:bg-gray-800 shadow rounded-3xl  w-full">
                    <div class="flex items-center justify-between">
                        <h6 class="">Change Plan</h6>
                        <button class="border px-3 py-1.5 rounded-lg text-zinc-600 text-sm hover:bg-zinc-800 hover:text-white" @click="updatePlan">Update Plan</button>
                    </div>
                    <div class="flex gap-2 items-center mt-4">
                        <!-- <USelect v-model="profile.pricing_id" :options="pricings" class="w-full" option-attribute="plan_name" value-attribute="id"  placeholder="Select Plan" /> -->
                        <ul class="grid w-full gap-6 md:grid-cols-2">
                            <li v-for="pricing in pricings" :key="pricing">
                                <input type="radio" :id="pricing.id" :name="pricing.plan_name" :value="pricing.id" class="hidden peer" required v-model="profile.pricings.id">
                                <label :for="pricing.id" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600">
                                    <div class="block">
                                        <div class="w-full text-lg font-semibold">{{ pricing.plan_name }}</div>
                                        <div class="w-full">₹ {{ pricing.price }}/-</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Invoices -->
                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
                    <h6 class="mb-5">Invoice History</h6>

                    <div class="flex gap-6 items-center border-t py-4" v-for="bill in invoices" :key="bill.id">
                        <div class="w-[60%]">
                            <div class="md:text-sm text-xs">{{ bill.invoice_id }}</div>
                            <div class="text-xs text-zinc-400 dark:text-zinc-800">{{ $dayjs(bill.bill_from).format('D MMM YY') }} - {{ $dayjs(bill.bill_to).format('D MMM YY') }}</div>
                        </div>
                        <div class="w-[20%] text-xs bg-red-50 border border-red-300 rounded-lg text-red-600 px-2 py-1 text-center">{{ bill.status }}</div>
                        <a :href="bill.payment_link" target="_blank" class="text-xs md:text-sm w-[20%]">Pay now</a>
                    </div>
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

    const current_plan = ref()
    const profile = ref()

    let { data: pricings } = await supabase
        .from('pricings')
        .select('*')
                
    let { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.value.id)
        .range(0, 5)
        .order('id', { ascending: false })

    // Fetch Profile
    const fetchProfile = async () => {
        await supabase
            .from('profiles')
            .select(`
                full_name, phone, pricing_id, pricing_offer, website_type,
                pricings(
                    plan_name, price, id
                )
            `)
            .eq('id', user.value.id)
            .single()
            .then((res) => {
                profile.value = res.data
            })
    }
    fetchProfile()

    const updatePlan = async () => {
        await supabase
            .from('profiles')
            .update({ 
                pricing_id: profile.value.pricings.id,
            })
            .eq('id', user.value.id)
            .select()
        fetchProfile()
        toast.add({ title: 'Plan Updated' })
    }

</script>

<style>

</style>

