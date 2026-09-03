/**
 * Public surface for the auth feature — pages/components call this rather
 * than reaching into useAuthStore() directly, so the store stays an
 * implementation detail that's free to change shape later.
 */
export function useAuth() {
  const store = useAuthStore()

  return {
    user: computed(() => store.user),
    isSignedIn: computed(() => store.isSignedIn),
    status: computed(() => store.status),
    fetchSession: store.fetchSession,
    signUp: store.signUp,
    signIn: store.signIn,
    signOut: store.signOut,
    forgotPassword: store.forgotPassword,
    resetPassword: store.resetPassword,
  }
}
