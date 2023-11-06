<template>
    <div class="relative">
      <header class="bg-white w-full flex justify-between items-center pr-6 h-[50px] border-b border-dotted">
          <ProfileNav />
          <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-1 rounded-md border hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all text-sm" @click="isOpen = true">
              <Icon name="material-symbols:add" class="w-4 h-4" />
              Add Link
          </button>
      </header>

      <section class="p-6">
          <!-- Table -->
          <template v-if="links">
            <UTable 
                class="border rounded-xl"
                :rows="links"
                :columns="[
                    { key: 'title', label: 'Title', sortable: true }, 
                    { key: 'icon', label: 'Icon' },
                    { key: 'url', label: 'Url' },
                    { key: 'actions', label: 'Actions' }
                ]"
            >
              <template #icon-data="{ row }">
                <button class="shadow-inner rounded-xl w-10 h-10 border">
                  <Icon :name="row.icon" />
                </button>
              </template>
              <template #actions-data="{ row }">
                <button class="bg-red-100 text-red-400 rounded-lg border border-red-300 px-3 py-1 text-xs" @click="deleteLink(row.id)">Delete</button>
              </template>
            </UTable>
          </template>
          <!-- End Table -->
      </section>

      <!-- Add New Link -->
      <UModal v-model="isOpen">
          <div class="card">
            <div class="card-header flex items-center justify-between py-4 px-6 border-b text-sm font-semibold bg-zinc-50">
                New Social Link
            </div>
            <div class="card-body">
                <section class="p-6 space-y-5">
                  <input type="text" class="p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Website Name" v-model="title">
                  <input type="text" class="p-3 rounded-xl border w-full focus:outline-none shadow-inner" placeholder="Paste link" v-model="url">
                </section>
                <section class="border-t px-5 pb-5">
                  <h3 class="font-bold text-sm my-3">Select Icon</h3>
                  <div class="grid grid-cols-7 gap-2 w-full h-44 overflow-y-auto">
                    <button 
                      v-for="icon in icons" :key="icon" 
                      class="w-full h-12 shadow-inner rounded-xl border"
                      @click="selectIcon(icon)"
                      :class="[(icon === activeId) ? ' bg-zinc-800 text-zinc-100' : '']"
                    >
                      <Icon :name="icon" class="w-5 h-5" />
                    </button>
                  </div>
                </section>

                <button class="w-full border-t p-3 flex items-center bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 font-semibold justify-center gap-2" @click="addNewLink">
                    <span>{{ loading ? 'saving...' : 'Save' }}</span>
                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" />
                </button>
            </div>
          </div>
      </UModal>
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

  const activeId = ref(null)

  const isOpen = ref(false)
  const loading = ref(false)

  const icons = ref([
    'entypo-social:behance',
    'entypo-social:dribbble',
    'entypo-social:dropbox',
    'entypo-social:facebook', 'brandico:facebook',
    'entypo-social:github', 'entypo-social:github-with-circle', 'brandico:github', 
    'entypo-social:google', 'entypo-social:google-with-circle',
    'entypo-social:google-drive',
    'entypo-social:instagram', 'entypo-social:instagram-with-circle', 'brandico:instagram', 'brandico:instagram-filled',
    'entypo-social:linkedin', 'entypo-social:linkedin-with-circle', 'brandico:linkedin', 'brandico:linkedin-rect',
    'entypo-social:pinterest', 'entypo-social:pinterest-with-circle',
    'entypo-social:skype', 
    'entypo-social:spotify',
    'entypo-social:twitter', 'entypo-social:twitter-with-circle', 'brandico:twitter-bird',
    'entypo-social:vimeo', 
    'entypo-social:youtube', 'entypo-social:youtube-with-circle'

  ])

  const title = ref('')
  const url = ref('')

  const links = ref([])

  const fetchData = async () => {
    let { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('user_id', user.value.id)
    links.value = data
  }
  fetchData()

  const addNewLink = async () => {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .insert([
            { 
              title: title.value, url: url.value, icon: activeId.value, user_id: user.value.id
            },
          ])
          .select()
          toast.add({ title: 'Link added' });
          isOpen.value = false
          fetchData()
      } catch (error) {
        console.log(error)
      } finally {
        title.value = '', 
        url.value = '',
        activeId.value = ''
      }
  }

  const selectIcon = (id) => {
    activeId.value = id
  }

  const deleteLink = async (id) => {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id)

    toast.add({ title: 'Link deleted' });
    fetchData()
  }


</script>

<style>

</style>

