<script setup lang="ts">
import { NuxtLink } from '#components'

/**
 * Base button. Renders a real <button> normally, or a <NuxtLink> when `to`
 * is passed — same visual styles either way, so callers don't need two
 * components for "looks like a button, navigates like a link".
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'dark' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    /** Full-width block button — used for primary form submits. */
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    to: undefined,
    type: 'button',
    loading: false,
    disabled: false,
    block: false,
  },
)

const isDisabled = computed(() => props.disabled || props.loading)

const variantClass: Record<NonNullable<typeof props.variant>, string> = {
  primary: 'bg-gold-500 text-gray-950 hover:bg-gold-400 active:bg-gold-600',
  dark: 'bg-gray-950 text-white hover:bg-gray-800 active:bg-gray-900',
  outline: 'bg-transparent border-2 border-current hover:bg-white/10',
  ghost: 'bg-transparent text-green-600 hover:bg-green-50',
}

const sizeClass: Record<NonNullable<typeof props.size>, string> = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-base px-6 py-3 gap-2',
  lg: 'text-base px-8 py-4 gap-2',
}
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="!to && isDisabled ? true : undefined"
    :aria-disabled="to && isDisabled ? 'true' : undefined"
    class="inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClass[variant], sizeClass[size], block ? 'w-full' : '', to && isDisabled ? 'pointer-events-none opacity-50' : '']"
    @click="to && isDisabled ? $event.preventDefault() : undefined"
  >
    <Icon v-if="loading" name="lucide:loader-2" class="size-4 animate-spin" aria-hidden="true" />
    <slot />
  </component>
</template>
