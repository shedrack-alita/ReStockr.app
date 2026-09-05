import { z } from 'zod'

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

const phoneNumber = z.string().trim().min(7, 'Enter a valid mobile number')

export const merchantSignUpSchema = z.object({
  businessName: z.string().trim().min(2, 'Enter your business name'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  phone: phoneNumber,
  category: z.string().trim().min(1, 'Choose what you mostly sell'),
  password: strongPassword,
})

export const merchantSignInSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
  rememberMe: z.boolean().optional(),
})

export const riderSignUpSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name, as on your ID'),
  phone: phoneNumber,
  vehicle: z.enum(['motorbike', 'tricycle', 'van'], { message: 'Choose your means of delivery' }),
  password: strongPassword,
})

export const riderSignInSchema = z.object({
  phone: phoneNumber,
  password: z.string().min(1, 'Enter your password'),
  rememberMe: z.boolean().optional(),
})

export const verifyOtpSchema = z.object({
  channel: z.enum(['email', 'phone']),
  destination: z.string().min(1),
  code: z.string().length(4, 'Enter the 4-digit code'),
})
