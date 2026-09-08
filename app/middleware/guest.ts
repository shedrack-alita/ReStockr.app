const ROLE_HOME: Record<string, string> = {
  customer: '/account',
  merchant: '/merchant/dashboard',
}

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  if (auth.status === 'idle') await auth.fetchSession()
  if (auth.isSignedIn) return navigateTo(ROLE_HOME[auth.user?.role ?? ''] ?? '/marketplace')
})
