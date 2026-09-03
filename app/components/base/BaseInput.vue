<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: string
    placeholder?: string
    autocomplete?: string
    error?: string
    hint?: string
  }>(),
  {
    type: 'text',
    placeholder: undefined,
    autocomplete: undefined,
    error: undefined,
    hint: undefined,
  },
)

defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()
</script>

<template>
  <label :for="id" class="block">
    <span class="mb-1.5 flex items-center justify-between gap-3">
      <span class="text-sm font-semibold text-text-primary">{{ label }}</span>
      <slot name="label-extra" />
    </span>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      class="w-full rounded-field border border-border-subtle bg-surface-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
      :class="error ? '!border-danger' : ''"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-xs font-medium text-danger">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-xs text-text-muted">{{ hint }}</p>
  </label>
</template>
