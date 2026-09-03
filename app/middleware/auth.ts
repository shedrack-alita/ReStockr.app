/**
 * Protects signed-in-only routes — apply via
 * `definePageMeta({ middleware: 'auth' })`. Not used by any page yet
 * (account/orders areas aren't built), but the auth feature isn't
 * complete without it, and everything it needs (useAuthStore) already
 * exists.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (auth.status === 'idle') await auth.fetchSession()
  if (!auth.isSignedIn) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
