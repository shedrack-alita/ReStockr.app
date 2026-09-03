<script setup lang="ts">
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
  { name: 'Instagram', icon: 'lucide:instagram' },
  { name: 'Facebook', icon: 'lucide:facebook' },
]
</script>

<template>
  <footer class="border-t border-border-subtle bg-white">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)]">
        <div>
          <AppLogo tone="light" />
          <p class="mt-3 max-w-xs text-sm text-text-secondary">
            ReStockr Technologies — the Commerce Operating System for Africa and emerging markets.
          </p>
          <ul class="mt-4 flex gap-3">
            <li v-for="social in socials" :key="social.name">
              <a
                href="#"
                class="flex size-9 items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
                :aria-label="social.name"
              >
                <Icon :name="social.icon" class="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div v-for="col in columns" :key="col.heading">
          <h3 class="font-semibold text-text-primary">{{ col.heading }}</h3>
          <ul class="mt-3 space-y-2 text-sm text-text-secondary">
            <li v-for="link in col.links" :key="link">
              <a href="#" class="hover:text-text-primary hover:underline focus-visible:outline-2 focus-visible:outline-focus-ring">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row">
        <p class="text-xs text-text-muted">© Copyright {{ year }} ReStockr Technologies</p>
        <div class="flex items-center gap-2" aria-label="Accepted payment methods: Visa and Mastercard">
          <Icon name="logos:visa" class="h-6 w-auto" aria-hidden="true" />
          <Icon name="logos:mastercard" class="h-6 w-auto" aria-hidden="true" />
        </div>
      </div>
    </div>
  </footer>
</template>
