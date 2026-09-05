import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@pinia/nuxt',
  ],

  devtools: { enabled: false},

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      // @nuxtjs/seo (nuxt-seo-utils) defaults this to '%s %separator %siteName',
      // auto-appending "| ReStockr" to every page's title from site.name below.
      // Every page already sets its own full "ReStockr - X" title itself, so
      // the template should pass it through untouched.
      titleTemplate: '%s',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700&family=Anton&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/logos/logomark-green.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  routeRules: {
    '/': { isr: 300 },
  },

  site: {
    url: 'https://restockr.example.com',
    name: 'ReStockr',
  },

  ogImage: {
    enabled: false,
  },

  icon: {
    mode: 'svg',
  },

  image: {
    domains: ['picsum.photos', 'fastly.picsum.photos', 'img.icons8.com'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  compatibilityDate: '2025-07-15',
})
