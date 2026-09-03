/**
 * Auth API contract — the request/response shapes for `server/api/auth/*`.
 * Lives in `shared/` (not `app/types/`) because both the server route
 * handlers and the frontend store/composable import it: Nuxt 4 auto-import
 * makes `shared/` visible from both `app/` and `server/` without a
 * relative import.
 *
 * These routes are currently stubs (see server/api/auth/*.ts) — no real
 * backend exists yet — but the contract is real and stable so the
 * frontend can be built against it now.
 */

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface SessionResponse {
  user: AuthUser | null
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
  /** Newsletter/marketing opt-in — optional, defaults to false server-side. */
  marketingOptIn?: boolean
}

export interface SignInPayload {
  email: string
  password: string
  /** "Remember me" — a longer-lived session vs. the default session-only cookie. */
  rememberMe?: boolean
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}
