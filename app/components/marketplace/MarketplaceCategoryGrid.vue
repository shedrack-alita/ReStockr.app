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
  'Home Decor': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Woman_examining_lamps_in_a_store_while_shopping_for_home_decor.jpg',
    alt: 'A home decor store aisle with lamps and furnishings on display',
  },
  'Electronics': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Mobile_device_on_display_at_the_Media_Markt_Sontplein%2C_Groningen_%282019%29_10.jpg',
    alt: 'Smartphones on display at an electronics store',
  },
  'Power': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Apple_iPod_Chargers.jpg',
    alt: 'Chargers and power adapters laid out together',
  },
  'Personal Care': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Batom_espelho_salto._-_Flickr_-_Ana_Patr%C3%ADcia_Almeida.jpg',
    alt: 'Lipstick and personal care products styled as a product shot',
  },
  'Home Appliances': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Kitchen_cabinet_display_2009_with_bend.jpg',
    alt: 'Kitchen appliances and cabinetry on showroom display',
  },
  "Women's": {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/ArtAmbient_boutique_interior_Arta.jpg',
    alt: "Interior of a women's fashion boutique",
  },
  "Men's": {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Charvet_Place_Vend%C3%B4me_shop_window_01.jpg',
    alt: "Men's fashion shop window display",
  },
  'Kiddies': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/759_Toysland.jpg',
    alt: 'Shelves of toys on display in a toy store',
  },
  'Office Appliances': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/EFTA00000324_-_Modern_office_space_featuring_a_large_Epson_printer_a_glass_desk_with_a_chair_and_a_vibrant_orange_accent_chair_against_a_patterned_carpet.jpg',
    alt: 'A modern office space with a desk, chair and large printer',
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
