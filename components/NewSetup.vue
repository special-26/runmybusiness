<template>
    <section class="bg-white dark:bg-gradient-to-br from-gray-950 dark:bg-gray-900 ">
      <div class="w-full flex flex-col items-center">

          <!-- Website Type -->
          <div class="w-full border-b px-20 py-12">
              <h3 class="mb-6 font-bold dark:text-gray-200 text-3xl text-center">Select Website Type</h3>
              <div class="flex flex-col sm:flex-row w-full justify-center gap-4">
                <URadio label="Real Estate" value="realestate" v-model="website_type" class="border rounded-xl px-4 py-2" color="indigo" />
                <URadio label="Product/Service" value="product" v-model="website_type" class="border rounded-xl px-4 py-2" color="indigo" />
              </div>
          </div>
          
          <!-- Website Name -->
          <div class="w-full border-b px-20 py-12">
              <h3 class="my-6 font-bold dark:text-gray-200 text-3xl text-center">Website Name</h3>
              <input placeholder='Website Name' class="p-4 focus:outline-gray-700 mb-6 border w-full rounded-xl" type="text" v-model="website_name" />
          </div>

          <!-- Select Templates -->
          <div class="w-full border-b px-20 py-12">
            <h3 class="mt-6 font-bold dark:text-zinc-200 text-3xl mb-1 text-center">Select Templates</h3>
            <p class="mb-6 w-full text-center text-zinc-500 text-sm">(You can change it later)</p>
            <div class="w-full">
                <div class="grid md:grid-cols-4 gap-6 w-full">
                  <template v-if="website_type === 'product'">
                    <section 
                      v-for="list in product" 
                      class="w-full shadow-xl rounded-xl cursor-pointer border-2 relative overflow-hidden" 
                      @click="selectTemplate(list.url, list.id)"
                    >
                      <button 
                        class="w-6 h-6 bg-secondary text-white absolute top-0 right-0 z-10 rounded flex items-center justify-center"
                        :class="[(list.id === activeId) ? 'block' : 'hidden',]"
                      >
                        <Icon name="material-symbols:check-small-rounded" class=" w-6 h-6" />
                      </button>

                      <img :src="list.image" 
                        alt="" 
                        class="group-hover:blur-[2px] transition duration-100 ease-in-out object-cover w-full rounded-xl h-[200px]"
                        :class="[(list.id === activeId) ? ' grayscale' : '']"
                      >
                      <button class="flex items-center justify-center gap-2 w-full text-gray-900 bg-zinc-100 text-xs font-bold px-3 py-2 rounded-b-xl">
                          Live preview
                      </button>
                    </section>
                  </template>
                  <template v-else>
                    <section 
                      v-for="list in realestate" 
                      class="w-full shadow-xl rounded-xl cursor-pointer border-2 relative overflow-hidden" 
                      @click="selectTemplate(list.url, list.id)"
                    >
                      <button 
                        class="w-6 h-6 bg-secondary text-white absolute top-0 right-0 z-10 rounded flex items-center justify-center"
                        :class="[(list.id === activeId) ? 'block' : 'hidden',]"
                      >
                        <Icon name="material-symbols:check-small-rounded" class=" w-6 h-6" />
                      </button>

                      <img :src="list.image" 
                        alt="" 
                        class="group-hover:blur-[2px] transition duration-100 ease-in-out object-cover w-full rounded-xl h-[200px]"
                        :class="[(list.id === activeId) ? ' grayscale' : '']"
                      >
                      <button class="flex items-center justify-center gap-2 w-full text-gray-900 bg-zinc-100 text-xs font-bold px-3 py-2 rounded-b-xl">
                          Live preview
                      </button>
                    </section>
                  </template>
                </div>
            </div>
          </div>

          <button class="px-6 py-3 rounded-lg text-white bg-gray-800 my-6 flex items-center gap-2" type="submit" @click="requestWebsite">
              Send Request
          </button>
      </div>
    </section>
</template>

<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter();

  const activeId = ref(null)

  const website_type = ref('realestate')
  const website_name = ref('')
  const website_template = ref('')

  const product = [
    {
        id: 2,
        type: 'listing',
        template_name: 'listing_two',
        image: '/images/demo/w_2.jpg',
        url: 'www.example1.com'
    },
    {
        id: 3,
        type: 'listing',
        template_name: 'listing_three',
        image: '/images/demo/w_3.jpg',
        url: 'www.example2.com'
    },
  ]
  const realestate = [
    {
        id: 1,
        type: 'listing',
        template_name: 'listing_one',
        image: '/images/demo/w_1.jpg',
        url: 'www.example3.com'
    }
  ]

  const types = [
    { value: 'realestate', label: 'Real Estate' },
    { value: 'product', label: 'Product/Service' }
  ]

  const selectTemplate = (url, id) => {
    website_template.value = url
    activeId.value = id
  }

  const requestWebsite = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .update(
          { 
            website: true,
            website_type: website_type.value, 
            website_name: website_name.value,
            website_template: website_template.value,
          },
        )
        .eq('id', user.value.id)
        .select()

        window.location.reload(true)

  }
</script>

<style>

</style>

