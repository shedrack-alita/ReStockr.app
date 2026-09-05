export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (auth.status === 'idle') await auth.fetchSession()
  if (!auth.isSignedIn) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
