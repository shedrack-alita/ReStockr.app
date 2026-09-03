/**
 * Shared shape for the landing-page showcase cards (see
 * components/common/ProductCard.vue and ProductGrid.vue). Not a catalog
 * type — there's no backend/CMS behind this yet, just static marketing
 * copy — but factored out so the two components that share it don't
 * import types from each other's SFCs.
 */
export interface ShowcaseProduct {
  name: string
  price: number
  comparePrice: number
  image: { seed: string; alt: string }
  status: string
}
