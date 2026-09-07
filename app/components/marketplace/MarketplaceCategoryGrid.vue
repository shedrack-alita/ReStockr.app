<script setup lang="ts">

const props = defineProps<{ categories: readonly string[] }>()

const banner = computed(() => props.categories[0])
const pairs = computed(() => {
  const rest = props.categories.slice(1)
  const chunks: string[][] = []
  for (let i = 0; i < rest.length; i += 2) chunks.push(rest.slice(i, i + 2))
  return chunks
})


const categoryImages: Record<string, { url: string; alt: string }> = {
  'Electronics': {
    url: '/images/categories/electronics.jpg',
    alt: 'A pair of headphones photographed on a plain grey background',
  },
  'Personal Care': {
    url: '/images/categories/personal-care.jpg',
    alt: 'A collection of fragrance bottles arranged together',
  },
  'Footwear': {
    url: '/images/categories/footwear.jpg',
    alt: 'Four pairs of sneakers stacked on display boxes',
  },
  'Eyewear': {
    url: '/images/categories/eyewear.jpg',
    alt: 'Two pairs of sunglasses resting on a marble surface',
  },
  'Sportswear': {
    url: '/images/categories/sportswear.jpg',
    alt: 'A football resting on a stack of folded national-team jerseys',
  },
  'Bags': {
    url: '/images/categories/bags.jpg',
    alt: 'A tan leather handbag with a silk scarf tied to the handle',
  },
  'Power': {
    url: '/images/categories/power.jpg',
    alt: 'A box of LED grow light bulbs with three bulbs standing beside it',
  },
  'Headwear': {
    url: '/images/categories/headwear.jpg',
    alt: 'A grid of baseball caps in many different colours',
  },
  'Grocery': {
    url: '/images/categories/grocery.jpg',
    alt: 'Four cans of sparkling tonic soda in different flavours',
  },
}

function categoryImage(category: string) {
  return categoryImages[category]
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
    <div class="grid gap-3 sm:gap-4">
      <MarketplaceCategoryTile v-if="banner" :name="banner" :image="categoryImage(banner)" />
      <div v-for="(pair, i) in pairs" :key="i" class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <MarketplaceCategoryTile v-for="category in pair" :key="category" :name="category" :image="categoryImage(category)" />
      </div>
    </div>
  </section>
</template>
