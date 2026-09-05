<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    modelValue: string | undefined
    label: string
    options: { value: string; label: string }[]
    error?: string
    hint?: string
  }>(),
  { error: undefined, hint: undefined },
)

defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()
</script>

<template>
  <label :for="id" class="block">
    <span class="mb-1.5 block text-sm font-semibold text-text-primary">{{ label }}</span>
    <span class="relative block">
      <select
        :id="id"
        :value="modelValue ?? ''"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        class="w-full appearance-none rounded-field border border-border-subtle bg-surface-input px-4 py-2.5 pr-10 text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
        :class="error ? '!border-danger' : ''"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <Icon name="lucide:chevron-down" class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
    </span>
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-xs font-medium text-danger">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-xs text-text-muted">{{ hint }}</p>
  </label>
</template>
