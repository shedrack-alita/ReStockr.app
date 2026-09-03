/**
 * Keeps signed-in users off login/register/forgot-password — applied via
 * `definePageMeta({ middleware: 'guest' })` on those pages.
 */
export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  if (auth.status === 'idle') await auth.fetchSession()
  if (auth.isSignedIn) return navigateTo('/')
})
