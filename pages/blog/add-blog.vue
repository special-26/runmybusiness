<template>
  <div class="h-full">
      <header class="bg-white w-full flex justify-between items-center px-4 h-[50px] border-b border-dotted">
          <NuxtLink to="/product" class="items-center flex gap-2 text-sm">
              <Icon name="ic:baseline-keyboard-backspace" />
              back
          </NuxtLink>
              <button 
              class="bg-gray-800 text-white py-2 px-5 rounded-lg text-sm"
              type="submit" @click="addListing">
                  {{ loading ? 'Adding...' : 'Add Product' }}
              </button>
      </header>

      <div class="w-full h-full p-12">

          <!-- Category -->
          <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
              <div class="md:w-[30%]">
                  <h5 class="">Select Category</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Categories</p>
              </div>
              <div class="md:w-[70%] rounded-xl md:shadow flex-col flex p-3 w-full">
                  <div class="relative">
                      <USelectMenu v-model="category" :options="categories" option-attribute="title" searchable searchable-placeholder="Search a category..." size="xl" variant="none" placeholder="Select  category">
                          <template #label>
                              <span v-if="category">{{ category.title }}</span>
                          </template>
                      </USelectMenu>
                  </div>
              </div>
          </section>
            
          <!-- Basic Details -->
          <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
              <div class="md:w-[30%]">
                  <h5 class="">Product Headings</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Title and Short description</p>
              </div>
              <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                  <div class="relative">
                      <input placeholder="Project Title" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="title" />
                  </div>
                  <div class="relative">
                      <textarea rows="5" placeholder="Short Description" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="short_description"></textarea>
                  </div>
              </div>
          </section>


    </div>
</div>
</template>

<script setup>
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'   
  import Placeholder from '@tiptap/extension-placeholder'
  import CharacterCount from '@tiptap/extension-character-count'
  import Table from '@tiptap/extension-table'
  import TableCell from '@tiptap/extension-table-cell'
  import TableHeader from '@tiptap/extension-table-header'
  import TableRow from '@tiptap/extension-table-row'
  import Code from '@tiptap/extension-code'
  import TextAlign from '@tiptap/extension-text-align'
  import TextStyle from '@tiptap/extension-text-style'
  import FontFamily from '@tiptap/extension-font-family'
  import Youtube from '@tiptap/extension-youtube'
  import Link from '@tiptap/extension-link'
  import Image from '@tiptap/extension-image'
  import Highlight from '@tiptap/extension-highlight'
  import { Color } from '@tiptap/extension-color'

  import slug from 'slug';
  import CustomImage from '@/extensions/custom-image'
  
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const toast = useToast()

  definePageMeta({
      colorMode: 'light',
      middleware: 'auth',
      layout: 'dashboard'
  })

  const files = ref([])
  const activeItem = ref(null)

  const loading = ref(false)

  const genSlug =  ref('')
  const title =  ref('')
  const price =  ref('')
  const short_description =  ref('')
  const long_description =  ref('')
  const product_dimensions =  ref('')
  const item_weight =  ref('')
  const model_number =  ref('')
  const color =  ref('')
  const images =  ref([])
  const thumbnail =  ref('')
  const category =  ref()

  // Tiptap Editor
  const limit = ref(20000)
  const word_count = ref()
  const editor = ref(
      useEditor({
          extensions: [
              StarterKit,
              Placeholder.configure({
                  placeholder: "Write a long description of product...",
              }),
              CharacterCount.configure({
                  limit: limit.value,
              }),
              Youtube.configure({
                  controls: false,
              }),
              // Image.configure({
              //     resizable: true,
              //     allowBase64: true,
              // }),
              CustomImage.configure({
                  HTMLAttributes: {
                      class: 'custom-image'
                  }
              }),
              Table.configure({
                  resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell,
              Link.configure({
                  openOnClick: false,
              }),
              Highlight.configure({ multicolor: true }),
              TextAlign.configure({
                  types: ['heading', 'paragraph'],
              }),
              FontFamily,
              TextStyle,
              Color,
          ],
          content: '',
          editorProps: {
              attributes: {
                  spellcheck: 'true',
              },
          },
          onUpdate: ({editor}) => {
              let output = editor.getHTML();
              long_description.value = output
              word_count.value = editor.storage.characterCount.words();
          }
      })
  )

  let { data: categories, error } = await supabase
    .from('product_category')
    .select('*')

  const addListing = async () => {
      slugGenerator();
      loading.value = true;
      try {
          const { data, error } = await supabase
              .from('products')
              .insert([
                  {
                      title : title.value,
                      slug : genSlug.value,
                      price : price.value,
                      short_description : short_description.value,
                      long_description : long_description.value,
                      product_dimensions : product_dimensions.value,
                      item_weight : item_weight.value,
                      model_number : model_number.value,
                      color : color.value,
                      thumbnail : thumbnail.value,
                      images : images.value,
                      category_id : category.value.id,
                  },
              ])
              .select()

          toast.add({ title: 'Product added' });
          loading.value = false;
      } catch (error) {
          console.log(error)
      } finally {
          title.value = '',
          price.value = '',
          short_description.value = '',
          long_description.value = '',
          product_dimensions.value = '',
          item_weight.value = '',
          model_number.value = '',
          color.value = '',
          thumbnail.value = '',
          images.value = '',
          category.value = ''
      }
  }

  const slugGenerator = () => {
      const newSlug = slug(title.value)
      const res = Math.floor(Math.random() * Date.now()).toString(36).substring(2,5);
      genSlug.value = newSlug+'-'+res;
  }

  const uploadImages = async (evt) => {
      files.value = evt.target.files
      try {
          if(!files.value || files.value.length === 0) {
              throw new Error("You must have at least one file to upload");
          }

          for(let index = 0; index < files.value.length; index++) {
              const file = files.value[index];
              const fileExt = file.name.split('.').pop();
              const fileName = `${Math.random()}.${fileExt}`
              const filePath = `${fileName}`

              let {error: uploadError} = await supabase.storage.from('products').upload(filePath, file)

              if(uploadError) throw uploadError

              // preview image
              const { data } = supabase.storage.from('products').getPublicUrl(filePath)
              if(error) throw error

              // let str = data.publicUrl.split('/');
              // let result = str[str.length - 1];
              images.value.push(data.publicUrl);
          }
      } catch (error) {
          console.log(error);
      }
  }

  const deleteImage = async (index, file) => {
      images.value.splice(index, 1)

      // Extract file name from whole url
      let str = file.split('/');
      let result = str[str.length - 1];
      const { data, error } = await supabase.storage.from('products').remove(result)
  }

  const setAsThumbnail = (index, file) => {
      thumbnail.value = file;
      activeItem.value = index
  }
</script>

<style scoped>
.active{
  color: yellow;
}
</style>