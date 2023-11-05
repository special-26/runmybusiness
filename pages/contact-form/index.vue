<template>
  <div class="relative overflow-x-auto">

    <!-- Table Section -->
    <div class="w-full">
        <!-- Card -->
        <div class="flex flex-col">
            <div class="w-full">
                <div class="min-w-full inline-block align-middle">
                    <div class="bg-white shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                        <!-- Header -->
                        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between w-full">
                            <div class="w-full">
                                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Form</h2>
                                <p class="text-sm text-gray-600 dark:text-gray-400">All contact form leads</p>
                            </div>

                            <div class="w-full flex gap-2 justify-end items-center">
                                <NuxtLink to="/product/add-product" class="h-[40px] px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold hover:bg-zinc-800 hover:text-white focus:outline-none text-sm">
                                    <Icon name="material-symbols:add" class="w-4 h-4" />
                                    Download PDF
                                </NuxtLink>
                            </div>
                        </div>
                        <!-- End Header -->

                        <!-- Table -->
                        <UTable 
                            class="px-3"
                            :rows="contacts"
                            :columns="[
                                { key: 'name', label: 'Name', sortable: true }, 
                                { key: 'email', label: 'Email' },
                                { key: 'message', label: 'Message' },
                                { key: 'phone', label: 'Phone Number' },
                                { key: 'created_at', label: 'Created At' },
                            ]"
                        >
                            <template #message-data="{ row }">
                                <span class="">{{ row.message.substring(0,60)+".." }}</span>
                            </template>

                            <template #created_at-data="{ row }">
                                <span>{{ $dayjs(row.created_at).format('D MMM YYYY') }}</span>
                            </template>
                        </UTable>
                        <!-- End Table -->

                        <!-- Footer -->
                        <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="font-semibold text-gray-800 dark:text-gray-200">{{ totalNumProducts }}</span> results
                            </p>
                            
                            <div class="flex justify-between gap-2">
                                <button class="bg-white shadow-inner p-2 px-3 rounded-lg" @click="previousPage()">
                                    <Icon name="material-symbols:arrow-left-alt-rounded" class="w-5 h-5 text-zinc-700" />
                                </button>
                                <span class="bg-white px-3 flex items-center justify-center rounded-lg text-sm text-zinc-400">
                                    {{ currentPage + 1 }} / {{ maxPageNum + 1 }}
                                </span>
                                <button class="bg-white shadow-inner p-2 px-3 rounded-lg " @click="nextPage()">
                                    <Icon name="material-symbols:arrow-right-alt-rounded" class="w-5 h-5 text-zinc-700" />
                                </button>
                            </div>
                            
                        </div>
                        <!-- End Footer -->
                    </div>
                </div>
            </div>
        </div>
        <!-- End Card -->
    </div>
    <!-- End Table Section -->

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

    const numbPerPage = ref(6)
    const currentPage = ref(0)
    const totalNumProducts = ref(0)
    const searchTerm = ref('')
    const isLoading = ref(true)


    // Because the first page is page 0
    const maxPageNum = computed(() => Math.max(0, Math.ceil(totalNumProducts.value / numbPerPage.value) - 1))
    const startProduct = computed(() => currentPage.value * numbPerPage.value)
    const stopProduct = computed(() => (currentPage.value + 1) * numbPerPage.value - 1)
    // Get the total number of products in the database

    const contacts = ref([])

    function getData(){
        isLoading.value = true
        getAllData()
    }

    const getAllData = async () => {
        supabase
        .from('contacts')
        .select('id, name, email, message, phone, created_at')
        .order('id', { ascending: false })
        .range(startProduct.value, stopProduct.value)
        .then((res) => {
            const data = res.data
            if(data === null){
                contacts.value = []
                return
            }
            contacts.value = data
            isLoading.value = false
        })
    
        supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true})
        .then((res) => {
            totalNumProducts.value = res.count
        })
    }

    function nextPage() {
        if(currentPage.value >= maxPageNum.value) return
        currentPage.value += 1;
        getData()
    }
    function previousPage() {
        if(currentPage.value <= 0) return
        currentPage.value -= 1;
        getData()
    }

    getData()

</script>

<style>

</style>

