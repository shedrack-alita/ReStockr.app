<script setup lang="ts">
/**
 * FAQ accordion, built on native <details>/<summary> rather than a
 * hand-rolled ARIA widget — it's keyboard-operable, announces
 * expanded/collapsed state, and works with Find-in-page out of the box,
 * for less code than reimplementing the same guarantees by hand.
 */
withDefaults(
  defineProps<{
    items: { question: string; answer: string }[]
    /** Question text of the item that should start expanded, if any. */
    defaultOpen?: string
  }>(),
  {
    defaultOpen: undefined,
  },
)
</script>

<template>
  <div class="divide-y divide-border-subtle rounded-card bg-surface-card">
    <details
      v-for="(item, i) in items"
      :key="i"
      class="group px-5 py-4 open:pb-4"
      :open="item.question === defaultOpen"
    >
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-text-primary marker:content-none focus-visible:outline-2 focus-visible:outline-focus-ring"
      >
        {{ item.question }}
        <Icon
          name="lucide:chevron-down"
          class="size-5 shrink-0 text-text-muted transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p class="mt-2 text-sm leading-relaxed text-text-secondary">{{ item.answer }}</p>
    </details>
  </div>
</template>
