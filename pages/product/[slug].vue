<template>
  <div class="h-full">
      <header class="bg-white w-full flex justify-between items-center px-4 h-[50px] border-b border-dotted">
          <NuxtLink to="/product" class="items-center flex gap-2 text-sm">
              <Icon name="ic:baseline-keyboard-backspace" />
              back
          </NuxtLink>
              <button 
              class="bg-gray-800 text-white py-2 px-5 rounded-lg text-sm"
              type="submit" @click="updateProduct">
                  {{ loading ? 'Updating...' : 'Update Product' }}
              </button>
      </header>

      <div class="w-full h-full p-12" v-if="product">

          <!-- Category -->
          <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
              <div class="md:w-[30%]">
                  <h5 class="">Select Category</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Categories</p>
              </div>
              <div class="md:w-[70%] rounded-xl md:shadow flex-col flex p-3 w-full">
                  <div class="relative" v-if="categories">
                      <USelectMenu v-model="product.product_category" :options="categories" option-attribute="title" searchable searchable-placeholder="Search a category..." size="xl" variant="none" placeholder="Select  category">
                          <template #label>
                              <span v-if="product.product_category">{{ product.product_category.title }}</span>
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
              <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 w-full">
                  <div class="relative p-6 space-y-5">
                      <input placeholder="Project Title" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.title" />
                      <textarea rows="5" placeholder="Short Description" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.short_description"></textarea>
                  </div>
                  <!-- Bullet Points -->
                  <section class="w-full border-t p-6">
                        <div class="relative">
                            <div class="flex items-center justify-between w-full">
                                <h3 class="flex items-center gap-1">
                                    <Icon name="tdesign:bulletpoint" />
                                    <label class="">Bullets Points</label>
                                </h3>
                                <!-- <button class="py-1.5 px-2 border text-xs rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50" @click="addPoint">+ Add Point</button> -->
                            </div>
                            <div v-for="(point, index) in product.points" :key="index" class="mb-2 flex items-center gap-1 mt-4">
                                <input placeholder="New Point" class="w-full px-3 py-2 border focus:outline-gray-700 rounded-lg" v-model="point.item" />
                                <button class="w-10 py-2 rounded-lg text-zinc-500 hover:text-zinc-800 shadow-inner bg-zinc-50" @click="removePoint(point)">
                                    <Icon name="material-symbols:close" />
                                </button>
                            </div>
                        </div>
                        <div class="button-group flex items-center justify-center">
                            <button class="w-full py-1.5 px-2 mt-2 text-xs rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50" @click="addPoint">+ Add Point</button>
                        </div>

                    </section>
              </div>

          </section>

          <!-- Other Details -->
          <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
              <div class="md:w-[30%]">
                  <h5 class="dark:text-gray-200">Product Details</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Price, Product dimensions, Product wieght, model number and color</p>
              </div>
              <div class="md:w-[70%] rounded-xl shadow flex-col flex">
                  <!-- Price and property type -->
                  <section class="p-6">
                      <div class="grid grid-cols-2 gap-6">
                                <!-- Price -->
                                <div class="relative">
                                    <label class="">Price</label>
                                    <div class="input-group relative overflow-hidden rounded-xl">
                                        <input  placeholder="Price" class="w-full rounded-xl p-3 pl-8 border  focus:outline-gray-700" v-model="product.price" />
                                        <span class="absolute left-0 top-0 bottom-0 pl-3 flex items-center justify-center">
                                            <Icon name="ic:outline-currency-rupee" class="text-zinc-600 h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                              <!-- Product Dimension -->
                              <div class="relative">
                                  <label class="">Product Dimensions</label>
                                  <input  placeholder="Product Dimensions" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.product_dimensions" />
                              </div>
                              <!-- Product Weight -->
                              <div class="relative">
                                  <label class="">Product Weight</label>
                                  <input  placeholder="Item Weight" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.item_weight" />
                              </div>
                              <!-- Model Number -->
                              <div class="relative">
                                  <label class="">Model Number</label>
                                  <input  placeholder="Model Number" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.model_number" />
                              </div>
                              <!-- Color -->
                              <div class="relative">
                                  <label class="">Color</label>
                                  <input  placeholder="Color" class="w-full p-3 border focus:outline-gray-700 rounded-xl" v-model="product.color" />
                              </div>
                      </div>
                  </section>
              </div>
          </section>

          <!-- Image Gallery -->
          <section class="flex gap-6 md:flex-row flex-col mb-12">
              <div class="md:w-[30%]">
                  <h5 class="dark:text-gray-200">Image Gallery</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Upload Upto 10 Image. <br/> <small>Format must be .jpg, .jpeg, .png</small></p>
              </div>
              <div class="md:w-[70%] shadow rounded-xl flex-col flex gap-6">
                  <div class="flex items-center justify-between border-b p-6">
                      <h5 class="font-bold">Image Gallery</h5>
                      <label for="upload">
                          <span class="flex items-center gap-2 text-sm border px-3 py-2 rounded-lg cursor-pointer">
                              <Icon name="solar:upload-square-line-duotone" class="w-5 h-5" />
                              Upload Image
                          </span>
                      </label>
                      <input type="file" id="upload" multiple class="w-full upload hidden" @change="uploadImages">
                  </div>
                  <!-- uploaded image preview -->
                  <div class="grid grid-cols-4 gap-4 p-6">
                      <figure class="w-full relative overflow-hidden" v-for="(image, index) in images" :key="index">
                          <img :src="image" :alt="product.title" class="border w-full h-36 object-cover rounded-t-xl" />
                          <div class="flex items-center w-full bg-zinc-900 text-white py-1 border rounded-b-lg">
                              <button @click="setAsThumbnail(index, image)" class="text-xs flex items-center justify-center w-full border-r">
                                  <Icon name="material-symbols:star-rounded" 
                                      class="h-4 w-4" 
                                      :class="{active : index === activeItem}"
                                  />
                              </button>
                              <button @click="deleteImage(index, image)" class="text-xs flex items-center justify-center w-full">
                                  <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
                              </button>
                          </div>
                      </figure>
                  </div>
              </div>
          </section>

          <!-- Long Description -->
          <section class="mb-12 flex gap-6 md:flex-row flex-col pb-12">
              <div class="md:w-[30%]">
                  <h5 class="dark:text-gray-200">Long Description</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-300">Additional product details</p>
                  <p class="text-sm text-gray-500 dark:text-gray-300">It could be list, bullet points, image, etc</p>
              </div>
              <div class="md:w-[70%] rounded-xl shadow flex-col flex overflow-hidden">
                  <!-- Tiptap Editor -->
                  <div class="relative h-[50vh] overflow-y-auto w-full text-zinc-800">
                      <div v-if="editor" class="flex items-center gap-2 p-2 border-b sticky top-0 bg-white z-10">
                          <UTooltip text="Bold" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                                  <Icon name="material-symbols:format-bold" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Italic" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                                  <Icon name="material-symbols:format-italic" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Strike" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                                  <Icon name="ic:baseline-strikethrough-s" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Paragraph" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                                  <Icon name="mdi:format-paragraph" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Heading 1" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                                  <Icon name="ci:heading-h1" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Heading 2" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                                  <Icon name="ci:heading-h2" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Heading 3" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                                  <Icon name="ci:heading-h3" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Heading 4" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                                  <Icon name="ci:heading-h4" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Bullet list" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                                  <Icon name="material-symbols:format-list-bulleted-rounded" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Numbered list" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                                  <Icon name="ic:round-format-list-numbered" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Line break" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().setHorizontalRule().run()">
                                  <Icon name="ph:arrows-out-line-vertical" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Undo" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                                  <Icon name="solar:undo-left-outline" />
                              </button>
                          </UTooltip>
                          <UTooltip text="Redo" class="w-full">
                              <button class="rounded-lg shadow-inner flex items-center justify-center border w-full h-8 bg-white hover:bg-zinc-100" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                                  <Icon name="solar:undo-right-outline" />
                              </button>
                          </UTooltip>
                      </div>
                      <editor-content :editor="editor" class="w-full" />
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
    const route = useRoute()

    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })

    const files = ref([])
    const activeItem = ref(null)
    const images = ref([])
    const product = ref([])

    const loading = ref(false)

    const genSlug =  ref('')

    const addPoint = () => {
        product.value.points.push({
            item: ""
        })
    }
    const removePoint = (i) => {
        product.value.points.splice(i, 1)
    }

    async function fetchProduct() {
        let { data, error } = await supabase
            .from('products')
            .select(`
            *, 
            product_category(
                id,
                title
            )
            `)
            .eq('slug', route.params.slug)
            .single()  
        
            product.value = data
            images.value = data.images
            // pointsArr.value = data.points
    }
    fetchProduct()

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
          onCreate({ editor }) {
              editor.commands.setContent(product.value.long_description)
              let output = editor.getHTML();
              product.value.long_description = output
          },
          onUpdate: ({editor}) => {
              let output = editor.getHTML();
              product.value.long_description = output
          }
      })
  )

  let { data: categories } = await supabase
    .from('product_category')
    .select('*')

  // Update Product
  const updateProduct = async () => {
      slugGenerator();
      loading.value = true;
      try {
          const { data, error } = await supabase
              .from('products')
              .update({
                  title : product.value.title,
                  slug : genSlug.value,
                  price : product.value.price,
                  short_description : product.value.short_description,
                  long_description : product.value.long_description,
                  product_dimensions : product.value.product_dimensions,
                  item_weight : product.value.item_weight,
                  model_number : product.value.model_number,
                  color : product.value.color,
                  thumbnail : product.value.thumbnail,
                  images : images.value,
                  category_id : product.value.product_category.id,
                  points: product.value.points,
              })
              .eq('id', product.value.id)
              .select()

          toast.add({ title: 'Product updated' });
          loading.value = false;
      } catch (error) {
          console.log(error)
      } finally {

      }
  }

  const slugGenerator = () => {
      const newSlug = slug(product.value.title)
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

              updateProduct()
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
      updateProduct()
  }

  const setAsThumbnail = (index, file) => {
      product.thumbnail = file;
      activeItem.value = index
  }
</script>

<style scoped>
.active{
  color: yellow;
}
</style>