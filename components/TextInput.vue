<script setup>
    import { onMounted, ref } from 'vue';

    defineProps(['modelValue']);

    defineEmits(['update:modelValue']);

    const input = ref(null);

    onMounted(() => {
        if (input.value.hasAttribute('autofocus')) {
            input.value.focus();
        }
    });

    defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        class="bg-white border border-gray-200 dark:border-gray-800 focus:outline-zinc-600 p-3 rounded-lg dark:bg-gray-900 w-full dark:text-gray-300 focus:bg-white focus:dark:bg-gray-900 "
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
    />
</template>
