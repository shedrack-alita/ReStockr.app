export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  if (auth.status === 'idle') await auth.fetchSession()
  if (auth.isSignedIn) return navigateTo('/marketplace')
})
