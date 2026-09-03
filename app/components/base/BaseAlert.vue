<script setup lang="ts">
type Tone = 'danger' | 'success' | 'warning' | 'info'

withDefaults(defineProps<{ tone?: Tone }>(), {
  tone: 'info',
})

const toneClass: Record<Tone, string> = {
  danger: 'bg-danger-surface border-danger-border text-danger',
  success: 'bg-success-surface border-success-border text-success',
  warning: 'bg-gold-50 border-gold-200 text-warning',
  info: 'bg-surface-sunken border-border-subtle text-text-secondary',
}

const iconName: Record<Tone, string> = {
  danger: 'lucide:alert-circle',
  success: 'lucide:check-circle',
  warning: 'lucide:alert-triangle',
  info: 'lucide:info',
}
</script>

<template>
  <div role="alert" class="flex items-start gap-2 rounded-field border px-4 py-3 text-sm" :class="toneClass[tone]">
    <Icon :name="iconName[tone]" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
    <div class="flex-1"><slot /></div>
  </div>
</template>
