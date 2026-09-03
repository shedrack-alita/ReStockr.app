<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
    :class="modelValue ? 'bg-green-600' : 'bg-gray-400'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="inline-block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
      :class="modelValue ? 'translate-x-5' : 'translate-x-0.5'"
      aria-hidden="true"
    />
  </button>
</template>
