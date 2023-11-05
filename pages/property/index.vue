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
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Products</h2>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Add products, edit and delete.</p>
                                </div>

                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <UDropdown :items="bycategory" :popper="{ placement: 'bottom-start' }">
                                            <button id="hs-as-table-table-filter-dropdown" type="button" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none text-sm">
                                                <Icon name="ic:outline-category" />
                                                Filter By Category
                                            </button>
                                            <template #mycategory="{ item }">
                                                <USelectMenu
                                                    searchable
                                                    class="w-full"
                                                    variant="none"
                                                    :options="product_category"
                                                    option-attribute="title"
                                                    v-model="category"
                                                    size="lg"
                                                />
                                            </template>
                                        </UDropdown>

                                        <UDropdown :items="bystatus" :popper="{ placement: 'bottom-start' }">
                                            <button id="hs-as-table-table-filter-dropdown" type="button" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none text-sm">
                                                <Icon name="material-symbols:filter-alt-outline" />
                                                Filter By Status
                                            </button>
                                        </UDropdown>

                                        <NuxtLink to="/product/add-product" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-700 focus:outline-none text-sm">
                                            <Icon name="material-symbols:add" class="w-4 h-4" />
                                            Add Product
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <!-- End Header -->
{{ products }}
                            <!-- Table -->
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-slate-800">
                                    <tr>
                                        <th scope="col" class="pl-6 pr-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                Title
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                Created
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center justify-end gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                Actions
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="listing in products" :key="listing.id">
                                        <td class="h-px w-[50%] whitespace-wrap pl-6 pr-6">
                                            <div class="py-3">
                                                <div class="flex items-center gap-x-4">
                                                    <figure>
                                                        <img 
                                                            class="object-cover h-20 w-32 rounded-xl" 
                                                            v-if="listing.images"
                                                            :src="`https://d251pozxe7k40y.cloudfront.net/listing/${listing.images[0]}`" :alt="listing.title">
                                                        <img v-else 
                                                            src="/images/placeholder.jpeg" 
                                                            class="object-cover h-20 w-32 rounded-xl">
                                                    </figure>
                                                    <div class="grow">
                                                        <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">{{ listing.title }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="h-px w-[15%] whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="text-sm text-gray-500">{{ listing.created_at }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-[20%] whitespace-nowrap">
                                            <div class="px-6 py-1.5 flex justify-end items-center gap-4">
                                                <Link class="text-xs border rounded px-2 py-1 text-zinc-600 font-bold" :href="route('listing.show', listing.slug)">View</Link>
                                                <Link :href="route('listing.edit', listing.slug)" class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium">Edit</Link>
                                                <button class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" @click.prevent="deleteData(listing.id)">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Table -->

                            <!-- Footer -->
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    <span class="font-semibold text-gray-800 dark:text-gray-200"></span> results
                                </p>
                                <div></div>
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
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })

    const bystatus = [
        [{
            label: 'All',
            click: () => {
                status.value = ''
            }
        }], [{
            label: 'Published',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => {
                status.value = 'published'
            }
        }, {
            label: 'Draft',
            icon: 'i-heroicons-document-duplicate-20-solid',
            click: () => {
                status.value = 'draft'
            }
        }]
    ]
    const bycategory = [
        [{
            label: 'All',
            slot: 'mycategory',
        }]
    ]

    const products = ref([])
    const status = ref('')
    const category = ref()

    const fetchData = async () => {
        let { data: response, error } = await supabase
            .from('products')
            .select('*')
            .eq('status', status.value)
        products.value = response
    }
    fetchData()


    let { data: product_category, error } = await supabase
        .from('product_category')
        .select('*')


</script>

<style scoped>

</style>