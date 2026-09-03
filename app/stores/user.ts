/**
 * Signed-in user's profile/addresses/preferences — distinct from
 * app/stores/auth.ts (which only holds session identity). Not built yet —
 * depends on the auth feature having a real backend to fetch a profile
 * from.
 */
export const useUserStore = defineStore('user', () => {
  // TODO: profile, addresses, updateProfile().
  return {}
})
