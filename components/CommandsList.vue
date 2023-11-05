<template>
  <div class="items rounded-lg bg-white shadow w-72 h-72 overflow-y-auto overflow-contain">
      <template v-if="items.length">
          <button
              :class="{ 'is-selected': index === selectedIndex }"
              v-for="(item, index) in items"
              :key="index"
              @click=selectItem(index)
              class="item flex gap-3 items-center w-full p-2 rounded hover:bg-zinc-100" 
          >
              <button class="border text-zinc-800 rounded h-9 w-9 flex items-center justify-center">
                  <Icon :name="item.icon" class="h-4 w-4" />
              </button>
              <div class="w-auto">
                  <h5 class="text-sm w-full text-left text-zinc-800">{{ item.title }}</h5>
                  <p class="text-[12px] w-full text-left text-zinc-500">{{ item.description }}</p>
              </div>
          </button>
      </template>
      <div class="item" v-else>
          No result
      </div>
  </div>
</template>

<script>
export default {
props: {
  items: {
    type: Array,
    required: true,
  },

  command: {
    type: Function,
    required: true,
  },
},

data() {
  return {
    selectedIndex: 0,
  }
},

watch: {
  items() {
    this.selectedIndex = 0
  },
},

methods: {
  onKeyDown({ event }) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      this.enterHandler()
      return true
    }

    return false
  },

  upHandler() {
    this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
  },

  downHandler() {
    this.selectedIndex = (this.selectedIndex + 1) % this.items.length
  },

  enterHandler() {
    this.selectItem(this.selectedIndex)
  },

  selectItem(index) {
    const item = this.items[index]

    if (item) {
      this.command(item)
    }
  },
},
}
</script>

<style>
.item.is-selected {
	 background: #f4f4f5;
}
</style>