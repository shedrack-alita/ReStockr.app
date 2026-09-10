<script setup lang="ts">
withDefaults(defineProps<{ dark?: boolean }>(), { dark: false })

const year = new Date().getFullYear()

const columns = [
  {
    heading: 'Company',
    links: ['About us', 'Contact us'],
  },
  {
    heading: 'Privacy Policy',
    links: ['General', 'Merchant', 'Customers', 'Riders'],
  },
  {
    heading: 'Terms of Use',
    links: ['General Terms of Use', 'Merchant Terms of Use', 'Rider Terms of Use'],
  },
]

const socials: { name: string; icon: string }[] = [
  { name: 'X (Twitter)', icon: 'lucide:twitter' },
  { name: 'TikTok', icon: 'simple-icons:tiktok' },
  { name: 'Threads', icon: 'simple-icons:threads' },
  { name: 'Instagram', icon: 'lucide:instagram' },
  { name: 'Facebook', icon: 'lucide:facebook' },
]
</script>

<template>
  <footer :class="dark ? 'bg-gray-950' : 'border-t border-border-subtle bg-white'">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)]">
        <div>
          <AppLogo :tone="dark ? 'dark' : 'light'" />
          <h3 v-if="dark" class="mt-3 font-display text-lg font-bold text-white">Built for Africa. Designed for the world.</h3>
          <p class="mt-2 max-w-xs text-sm" :class="dark ? 'text-white/70' : 'text-text-secondary'">
            <template v-if="dark">ReStockr is on a mission to power the future of commerce with intelligence.</template>
            <template v-else>ReStockr Technologies — the Commerce Operating System for Africa and emerging markets.</template>
          </p>
          <ul class="mt-4 flex gap-3">
            <li v-for="social in socials" :key="social.name">
              <a
                href="#"
                class="flex size-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-focus-ring"
                :class="
                  dark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary'
                "
                :aria-label="social.name"
              >
                <Icon :name="social.icon" class="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div v-for="col in columns" :key="col.heading">
          <h3 class="font-semibold" :class="dark ? 'text-white' : 'text-text-primary'">{{ col.heading }}</h3>
          <ul class="mt-3 space-y-2 text-sm" :class="dark ? 'text-white/70' : 'text-text-secondary'">
            <li v-for="link in col.links" :key="link">
              <a
                href="#"
                class="hover:underline focus-visible:outline-2 focus-visible:outline-focus-ring"
                :class="dark ? 'hover:text-white' : 'hover:text-text-primary'"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 sm:flex-row"
        :class="dark ? 'border-white/10' : 'border-border-subtle'"
      >
        <p class="text-xs" :class="dark ? 'text-white/50' : 'text-text-muted'">© Copyright {{ year }} | ReStockr Technologies</p>
        <div class="flex items-center gap-2" aria-label="Accepted payment methods: Visa, Mastercard and Paystack">
          <span class="flex h-6 items-center rounded bg-gray-950 px-2">
            <NuxtImg src="/images/logo/paystack-logo-white.png" alt="Paystack" width="88" height="17" class="h-3 w-auto" />
          </span>
          <Icon name="logos:visa" class="h-6 w-auto" aria-hidden="true" />
          <Icon name="logos:mastercard" class="h-6 w-auto" aria-hidden="true" />
          
        </div>
      </div>
    </div>
  </footer>
</template>
