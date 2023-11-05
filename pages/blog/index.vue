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
                                  <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Blogs</h2>
                                  <p class="text-sm text-gray-600 dark:text-gray-400">Add blogs, edit and delete.</p>
                              </div>

                              <div class="relative w-full flex items-center gap-1 border rounded-xl">
                                  <input type="text" placeholder="Search blog by title..." class="w-full py-2 focus:outline-none pl-4 rounded-xl" v-model="searchTerm">
                                  <button class="flex items-center w-10 justify-center" @click="getBlogs()">
                                      <Icon name="ph:magnifying-glass" class="text-zinc-400 hover:text-zinc-800" />
                                  </button>
                              </div>

                              <div class="w-full flex gap-2 justify-end items-center">
                                  <div class="flex items-center">
                                      <USelectMenu
                                          searchable
                                          class="h-full rounded-lg border font-medium"
                                          :class="category ? 'bg-zinc-800 text-white' : 'bg-white'"
                                          placeholder="Filter By Category"
                                          variant="none"
                                          :options="blog_category"
                                          option-attribute="title"
                                          v-model="category"
                                          size="lg"
                                      />
                                      <button v-if="category" class="border h-[40px] rounded-r-lg w-8 flex items-center justify-center" @click="clearSelectedCategory()">
                                          <Icon name="material-symbols:close" />
                                      </button>
                                  </div>

                                  <NuxtLink to="/blog/add-blog" class="h-[40px] px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold hover:bg-zinc-800 hover:text-white focus:outline-none text-sm">
                                      <Icon name="material-symbols:add" class="w-4 h-4" />
                                      Add Blog
                                  </NuxtLink>
                              </div>
                          </div>
                          <!-- End Header -->

                          <!-- Table -->
                          <UTable 
                              class="px-3"
                              :rows="products"
                              :columns="[
                                  { key: 'title', label: 'Title', sortable: true }, 
                                  { key: 'blog_category.title', label: 'Category' },
                                  { key: 'created_at', label: 'Created At' },
                                  { key: 'actions', label: 'Actions' }
                              ]"
                          >
                              <template #title-data="{ row }">
                                  <span class="">{{ row.title.substring(0,40)+".." }}</span>
                              </template>

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
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const toast = useToast()

  definePageMeta({
      colorMode: 'light',
      middleware: 'auth',
      layout: 'dashboard'
  })

  const items = (row) => [
      [{
          label: 'Edit',
          icon: 'i-heroicons-pencil-square-20-solid',
          click: async () => {
              navigateTo(`/product/${row.slug}`)
          }
      }],  
      [{
          label: 'Delete',
          icon: 'i-heroicons-trash-20-solid',
          click: async () => {
              let files = row.images;
              for(let index = 0; index < files.length; index++) {
                  const file = files[index];
                  let str = file.split('/');
                  let result = str[str.length - 1];
                  const { data, error } = await supabase.storage.from('products').remove(result)
              }
              await supabase.from('products').delete().eq('id', row.id)
              getBlogs();
              toast.add({ title: 'Product deleted' })
          }
      }]
  ]

  const blogs = ref([])

  const numbPerPage = ref(9)
  const currentPage = ref(0)
  const totalNumProducts = ref(0)
  const searchTerm = ref('')
  const isLoading = ref(true)

  const category = ref()

  // Because the first page is page 0
  const maxPageNum = computed(() => Math.max(0, Math.ceil(totalNumProducts.value / numbPerPage.value) - 1))
  const startProduct = computed(() => currentPage.value * numbPerPage.value)
  const stopProduct = computed(() => (currentPage.value + 1) * numbPerPage.value - 1)
  // Get the total number of products in the database

  function getBlogs(){
      isLoading.value = true
      if (searchTerm.value === '') {
          getAllBlogs()
      } else {
          searchProducts()
      }
  }
  // Fetch Total Products
  function getAllBlogs() {
      supabase
          .from('blogs')
          .select(`
              id, title, created_at, slug, featured,
              blog_category(
                  title
              )
          `)
          .order('id', { ascending: false })
          .range(startProduct.value, stopProduct.value)
          .then((res) => {
              const data = res.data
              if(data === null){
                  blogs.value = []
                  return
              }
              blogs.value = data
              isLoading.value = false
          })
      
      supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true})
          .then((res) => {
              totalNumProducts.value = res.count
          })
  }

  // Search Product By Title
  function searchProducts() {
      // Split the string on spaces
      const allWords = searchTerm.value.split(" ").filter(word => word !== "");

      // Add ":*" to each split element using map
      const allFuzzyWords = allWords.map(word => word + ":*");

      // Join the modified elements back together using join with a space separator
      const searchString = allFuzzyWords.join(" & ");

      supabase
          .from('blogs')
          .select('id, title, slug, created_at, featured')
          .textSearch('title', searchString)
          .order('id', { ascending: false })
          .range(startProduct.value, stopProduct.value)
          .then((res) => {
              const data = res.data
              if(data === null){
                  blogs.value = []
                  return
              }
              blogs.value = data
              isLoading.value = false
          })
      
      supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true})
          .textSearch('title', searchString)
          .then((res) => {
              totalNumProducts.value = res.count
          })
  }

  // Get Blog By Category
  function blogsByCategory() {
      supabase
          .from('blogs')
          .select(`
              id, title, created_at, slug, featured,
              blog_category(
                  title
              )
          `)
          .eq('category_id', category.value.id)
          .order('id', { ascending: false })
          .range(startProduct.value, stopProduct.value)
          .then((res) => {
              const data = res.data
              if(data === null){
                  blogs.value = []
                  return
              }
              blogs.value = data
              isLoading.value = false
          })
      
      supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true})
          .eq('category_id', category.value.id)
          .then((res) => {
              totalNumProducts.value = res.count
          })
  }
  function clearSelectedCategory(){
      category.value = ''
  }
  watch(category, (newVal) => {
      if (category.value === '') {
          getAllBlogs()
      } else {
        blogsByCategory()
      }
  })

  // Clear Search Term
  function clearSearchTerm() {
      searchTerm.value = ''
      getBlogs();
  }
  // search all if search term empty
  watch(searchTerm, (newVal) => {
      if (searchTerm.value === '') {
          getBlogs();
      }
  })

  let { data: blog_category } = await supabase
      .from('blog_category')
      .select('*')

  function nextPage() {
      if(currentPage.value >= maxPageNum.value) return
      currentPage.value += 1;
      getBlogs()
  }
  function previousPage() {
      if(currentPage.value <= 0) return
      currentPage.value -= 1;
      getBlogs()
  }

  getBlogs();

</script>

<style scoped>

</style>