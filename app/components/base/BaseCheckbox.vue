<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  modelValue: boolean
  error?: string
}>()

defineEmits<{ 'update:modelValue': [value: boolean] }>()

const id = useId()
</script>

<template>
  <div>
    <label :for="id" class="flex items-start gap-2.5 text-sm text-text-secondary">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :aria-invalid="!!error"
        class="mt-0.5 size-4 shrink-0 rounded border-border-strong text-green-600 focus-visible:outline-2 focus-visible:outline-focus-ring"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      >
      <span><slot /></span>
    </label>
    <p v-if="error" class="mt-1.5 text-xs font-medium text-danger">{{ error }}</p>
  </div>
</template>
