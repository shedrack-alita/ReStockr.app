export type UserRole = 'customer' | 'merchant' | 'rider'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
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

/** See /Merchant feature/2. Merchant Registration.png — store details are collected later, in onboarding. */
export interface MerchantSignUpPayload {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface MerchantSignInPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export type RiderVehicle = 'motorbike' | 'tricycle' | 'van'

/** See ReStockr UI/Authentication Pages/Rider Registration Flow 1&2.png. */
export interface RiderSignUpPayload {
  name: string
  phone: string
  vehicle: RiderVehicle
  password: string
}

export interface RiderSignInPayload {
  phone: string
  password: string
  rememberMe?: boolean
}

/**
 * OTP verification — shared by the customer/merchant/rider "Check your
 * inbox" screen (ReStockr UI/Authentication Pages/Verification.png,
 * Merchant Verification.png, Rider's Verification.png are all this same
 * screen). `channel` says whether `destination` is an email or a phone
 * number, since the rider flow verifies a phone instead.
 */
export type OtpChannel = 'email' | 'phone'

export interface VerifyOtpPayload {
  channel: OtpChannel
  destination: string
  code: string
}
