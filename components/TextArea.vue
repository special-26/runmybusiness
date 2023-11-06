<template>
  <textarea class="bg-white border border-gray-200 dark:border-gray-800 focus:outline-zinc-600 p-3 rounded-lg dark:bg-gray-900 w-full dark:text-gray-300" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>