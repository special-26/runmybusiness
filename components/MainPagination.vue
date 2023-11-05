<template>
  <div class="flex items-center gap-1">
      <UButton color="white" 
        @click="$emit('loadPrevious')"
        :disabled="prevdisabled"
      >
        <Icon name="material-symbols:arrow-left-alt-rounded" class="w-5 h-5 text-zinc-700" />
      </UButton>
      <UButton color="white" 
        @click="$emit('loadNext')"
        :disabled="nxtdisabled"
      >
        <Icon name="material-symbols:arrow-right-alt-rounded" class="w-5 h-5 text-zinc-700" />
      </UButton>
    </div>
</template>

<script setup>
  const emit = defineEmits([
    'loadNext',
    'loadPrevious',
  ])
  const props = defineProps({
    nxtdisabled: Boolean,
    prevdisabled: Boolean
  })
</script>

<style>

</style>

