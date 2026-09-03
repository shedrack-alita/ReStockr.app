/**
 * Full user profile contract (addresses, preferences) — distinct from
 * shared/types/auth.ts's `AuthUser`, which is only the minimal identity
 * shape the session endpoint returns. Not built yet.
 */
export interface UserProfile {
  id: string
  // TODO: addresses, phone, preferences, etc.
}
