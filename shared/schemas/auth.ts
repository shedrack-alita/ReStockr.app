import { z } from 'zod'

/**
 * Validation for the auth API contract (shared/types/auth.ts). Used on
 * both sides: the server route handlers validate the request body against
 * these before doing anything else, and the frontend forms use the same
 * schemas via @vee-validate/zod so client and server never disagree about
 * what "valid" means.
 */

/** Shared by signUpSchema and resetPasswordSchema — a reset password must be exactly as strong as a new one. */
const strongPassword = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/\d/, 'Include a number')
  .regex(/[A-Z]/, 'Include an uppercase letter')

export const signUpSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: strongPassword,
  marketingOptIn: z.boolean().optional(),
})

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
  rememberMe: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: strongPassword,
})
