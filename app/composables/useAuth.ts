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
    signUpMerchant: store.signUpMerchant,
    signInMerchant: store.signInMerchant,
    signUpRider: store.signUpRider,
    signInRider: store.signInRider,
    verifyOtp: store.verifyOtp,
  }
}
