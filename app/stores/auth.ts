import type {
  AuthUser,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SessionResponse,
  SignInPayload,
  SignUpPayload,
} from '#shared/types/auth'

/**
 * Auth state, backed by server/api/auth/* — currently all stubs (see
 * server/utils/apiError.ts) since there's no real backend yet. The store
 * itself is the real, final shape: once the backend exists, nothing here
 * changes, only the server route implementations do.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const status = ref<'idle' | 'pending' | 'ready'>('idle')

  const isSignedIn = computed(() => user.value !== null)

  /** Reads the current session. Safe to call more than once — later calls just refresh. */
  async function fetchSession() {
    status.value = 'pending'
    try {
      const res = await $fetch<SessionResponse>('/api/auth/session')
      user.value = res.user
    } catch {
      user.value = null
    } finally {
      status.value = 'ready'
    }
  }

  async function signUp(payload: SignUpPayload) {
    const res = await $fetch<{ user: AuthUser }>('/api/auth/signup', { method: 'POST', body: payload })
    user.value = res.user
  }

  async function signIn(payload: SignInPayload) {
    const res = await $fetch<{ user: AuthUser }>('/api/auth/signin', { method: 'POST', body: payload })
    user.value = res.user
  }

  async function signOut() {
    try {
      await $fetch('/api/auth/signout', { method: 'POST' })
    } finally {
      // Clear local state regardless of whether the server call succeeded
      // — the user's intent was to sign out, and there's no session to
      // keep client-side either way once that's cleared.
      user.value = null
    }
  }

  async function forgotPassword(payload: ForgotPasswordPayload) {
    await $fetch('/api/auth/forgot-password', { method: 'POST', body: payload })
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    await $fetch('/api/auth/reset-password', { method: 'POST', body: payload })
  }

  return { user, status, isSignedIn, fetchSession, signUp, signIn, signOut, forgotPassword, resetPassword }
})
