export function useProduct(slug: string) {
  const store = useProductsStore()

  if (store.status === 'idle') void store.fetch()

  const product = computed(() => store.bySlug(slug))
  const status = computed(() => store.status)

  return { product, status }
}
