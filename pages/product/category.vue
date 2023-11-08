<template>
  <section class="">
    <!-- Table Section -->
    <div class="w-full">
        <!-- Card -->
        <div class="flex flex-col">
            <div class="">
                <div class="min-w-full inline-block align-middle">
                    <div class="bg-white shadow-sm overflow-hidden dark:bg-slate-900">
                        <!-- Header -->
                        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between w-full ">
                            <div class="w-full">
                                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Categories
                                </h2>
                                <p class="text-xs text-gray-500">
                                    Add category, edit and delete.
                                </p>
                            </div>

                            <div class="relative w-full flex items-center gap-1 border rounded-xl">
                                <input type="text" placeholder="Search product by title..." class="w-full py-2 focus:outline-none pl-4 rounded-xl" v-model="searchTerm">
                                <button class="flex items-center w-10 justify-center" @click="getCategory()">
                                    <Icon name="ph:magnifying-glass" class="text-zinc-400 hover:text-zinc-800" />
                                </button>
                            </div>

                            <div class="flex gap-x-2 w-full justify-end">
                                <div class="text-center">
                                    <button type="button" class="py-2 px-4 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all text-sm" @click="isOpen = true">
                                        <Icon name="material-symbols:add" class="w-4 h-4" />
                                        Add Category
                                    </button>
                                </div>
                            </div>

                        </div>
                        <!-- End Header -->

                        <!-- Table -->
                        <UTable 
                            class="px-6"
                            :rows="categories"
                            :columns="[
                                { key: 'title', label: 'Title', sortable: true }, 
                                { key: 'slug', label: 'Slug' },
                                { key: 'created_at', label: 'Created At' },
                                { key: 'actions', label: 'Actions' }
                            ]"
                        >
                            <template #created_at-data="{ row }">
                              <span>{{ $dayjs(row.created_at).format('D MMM YYYY') }}</span>
                            </template>

                            <template #actions-data="{ row }">
                                <UDropdown :items="items(row)">
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                                </UDropdown>
                            </template>
                        </UTable>
                        <!-- End Table -->

                        <!-- Edit Category -->
                        <UModal v-model="editModal" prevent-close>
                          <div class="card">
                            <div class="card-header flex items-center justify-between p-4 border-b text-sm">
                                Edit Category
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="editModal = false, title=''" />
                            </div>
                            <div class="card-body px-6 py-6">
                                <!-- Category Title -->
                                <h3 class="text-sm font-semibold">Category Title</h3>
                                <input type="text" class="mb-5 p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Category title" v-model="title">
                                <!-- Category Description -->
                                <label class="text-sm font-semibold">Category Description</label>
                                <textarea name="description" rows="4" v-model="description" class="mb-5 p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Category description"></textarea>
                                <!-- Category Image -->
                                <h3 class="text-sm font-semibold">Category Image</h3>
                                <img :src="image" class="w-32 mx-auto mb-2 object-contain rounded-xl">
                                <label for="categoryImage">
                                    <div class="mb-5 p-3 rounded-xl border w-full focus:outline-none shadow-inner cursor-pointer flex items-center gap-2 text-sm">
                                        <Icon name="ic:outline-add-photo-alternate" class="h-5 w-5" />
                                        Upload Image
                                    </div>
                                    <input type="file" id="categoryImage" class="categoryImage hidden" @input.prevent="updateCategoryImage"  />
                                </label>

                                <!-- Save Button -->
                                <button class="w-full rounded-xl bg-gray-900 text-white p-3 flex items-center justify-center gap-2" @click="updateCategory">
                                    <span>{{ loading ? 'updating...' : 'Update' }}</span>
                                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" />
                                </button>
                            </div>
                          </div>
                        </UModal>

                        <!-- Add New Category -->
                        <UModal v-model="isOpen" prevent-close>
                            <div class="card" size="sm">
                                <div class="card-header flex items-center justify-between p-4 border-b text-sm">
                                    New Category
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false, title=''" />
                                </div>
                                <div class="card-body px-6 py-4">
                                    <!-- Category Title -->
                                    <label class="text-sm font-semibold">Category Title</label>
                                    <input type="text" class="mb-5 p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Category title" v-model="title">
                                    <!-- Category Description -->
                                    <label class="text-sm font-semibold">Category Description</label>
                                    <textarea name="description" rows="4" v-model="description" class="mb-5 p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Category description"></textarea>
                                    <!-- Category Image -->
                                    <label class="text-sm font-semibold">Category Image</label>
                                    <UInput type="file" class="rounded-xl mt-2 mb-5" @input.prevent="categoryImage"  />
                                    <!-- Save Button -->
                                    <button class="w-full rounded-xl bg-gray-900 text-white p-3 flex items-center justify-center gap-2" @click="addCategory">
                                        <span>{{ loading ? 'adding...' : 'Add' }}</span>
                                        <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </UModal>

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
  </section>
</template>

<script setup>
    import slug from 'slug';
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const toast = useToast()

    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })

    const numbPerPage = ref(6)
    const currentPage = ref(0)
    const totalNumProducts = ref(0)
    const searchTerm = ref('')
    const isLoading = ref(true)

    const categories = ref([])
    const title = ref('')
    const image = ref('')
    const description = ref('')

    const genSlug = ref('')
    const isOpen = ref(false)
    const editModal = ref(false)
    const loading = ref(false)
    const selectedCategory = ref(null)

    // Because the first page is page 0
    const maxPageNum = computed(() => Math.max(0, Math.ceil(totalNumProducts.value / numbPerPage.value) - 1))
    const startProduct = computed(() => currentPage.value * numbPerPage.value)
    const stopProduct = computed(() => (currentPage.value + 1) * numbPerPage.value - 1)
    // Get the total number of products in the database

    const items = (row) => [
        [{
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: async () => {
                let { data, error } = await supabase
                    .from('product_category')
                    .select('id, title, image, description')
                    .eq('id', row.id)
                    .single()

                selectedCategory.value = data
                title.value = selectedCategory.value.title
                image.value = selectedCategory.value.image
                description.value = selectedCategory.value.description
                editModal.value = true
            }
        }],  
        [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: async () => {
                if (row.image) {
                    let str = row.image.split('/');
                    let result = str[str.length - 1];
                    await supabase
                        .storage
                        .from('categories')
                        .remove([result])
                }
                await supabase.from('product_category').delete().eq('id', row.id)
                getCategory()
                toast.add({ title: 'Category deleted' })
            }
        }]
    ]
    
    function getCategory(){
        isLoading.value = true
        if (searchTerm.value === '') {
            getAllCategory()
        } else {
            searchCategory()
        }
    }

    const getAllCategory = async () => {
      supabase
        .from('product_category')
        .select('id, title, created_at, slug, image, description')
        .order('id', { ascending: false })
        .range(startProduct.value, stopProduct.value)
        .eq('user_id', user.value.id)
        .then((res) => {
            const data = res.data
            if(data === null){
                categories.value = []
                return
            }
            categories.value = data
            isLoading.value = false
        })
    
      supabase
        .from('product_category')
        .select('*', { count: 'exact', head: true})
        .then((res) => {
            totalNumProducts.value = res.count
        })
    }

    // Search Category By Title
    function searchCategory() {
        // Split the string on spaces
        const allWords = searchTerm.value.split(" ").filter(word => word !== "");

        // Add ":*" to each split element using map
        const allFuzzyWords = allWords.map(word => word + ":*");

        // Join the modified elements back together using join with a space separator
        const searchString = allFuzzyWords.join(" & ");

        supabase
            .from('product_category')
            .select('id, title, created_at, slug, image,description')
            .textSearch('title', searchString)
            .order('id', { ascending: false })
            .range(startProduct.value, stopProduct.value)
            .then((res) => {
                const data = res.data
                if(data === null){
                    categories.value = []
                    return
                }
                categories.value = data
                isLoading.value = false
            })
        
        supabase
            .from('product_category')
            .select('*', { count: 'exact', head: true})
            .textSearch('title', searchString)
            .then((res) => {
                totalNumProducts.value = res.count
            })
    }

    // Clear Search Term
    function clearSearchTerm() {
        searchTerm.value = ''
        getCategory();
    }
    // search all if search term empty
    watch(searchTerm, (newVal) => {
        if (searchTerm.value === '') {
          getCategory();
        }
    })

    getCategory()

    const updateCategory = async () => {
      await supabase
        .from('product_category')
        .update({ 
          title: title.value,
          image: image.value,
          description: description.value,
          slug: slug(title.value)
        })
        .eq('id', selectedCategory.value.id)
        .select()

        getCategory()
        editModal.value = false,
        title.value = '',
        image.value = '',
        description.value = '',
        toast.add({ title: 'Category updated' })
    }  

    function nextPage() {
      if(currentPage.value >= maxPageNum.value) return
      currentPage.value += 1;
      getCategory()
    }
    function previousPage() {
      if(currentPage.value <= 0) return
      currentPage.value -= 1;
      getCategory()
    }

    // Fecth Total Categories    
    let { data: product_category, error } = await supabase
      .from('product_category')
      .select('*')

    // categoryImage upload
    const categoryImage = async (evt) => {
        let file = evt.target.files[0];

        try {
            if(!file || file.length === 0) {
                throw new Error("You must have at least one file to upload");
            } else {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                let {error: uploadError} = await supabase.storage.from('categories').upload(filePath, file)

                if(uploadError) throw uploadError

                const { data } = supabase.storage.from('categories').getPublicUrl(filePath)
                image.value = data.publicUrl;
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log('category image uploaded');
        }
    }
    // Update updateCategoryImage
    const updateCategoryImage = async (evt) => {
        let file = evt.target.files[0];

        try {
            if(!file || file.length === 0) {
                throw new Error("You must have at least one file to upload");
            } else {
                if (image.value) {
                    let str = image.value.split('/');
                    let result = str[str.length - 1];
                    await supabase
                        .storage
                        .from('categories')
                        .remove([result])
                }

                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                let {error: uploadError} = await supabase.storage.from('categories').upload(filePath, file)

                const { data } = supabase.storage.from('categories').getPublicUrl(filePath)
                image.value = data.publicUrl;
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log('category image uploaded');
        }
    }

    const addCategory = async () => {
      loading.value = true
      genSlug.value = slug(title.value)

      const { data, error } = await supabase
        .from('product_category')
        .insert([
          { 
            title: title.value, 
            image: image.value,
            description: description.value,
            slug: genSlug.value ,
            user_id: user.value.id
          },
        ])
        .select()
        
      getCategory()
      loading.value = false
      title.value = ''
      image.value = ''
      description.value = ''
      isOpen.value = false
      toast.add({ title: 'Category added' })
    }

</script>

<style>

</style>

