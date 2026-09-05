import type { AuthUser, UserRole } from '#shared/types/auth'

export function buildMockUser(identifier: string, name: string | undefined, role: UserRole): AuthUser {
  const isEmail = identifier.includes('@')
  const derivedName = isEmail
    ? identifier.split('@')[0]!.replace(/[._-]+/g, ' ')
    : 'New rider'

  return {
    id: crypto.randomUUID(),
    name: (name?.trim() || derivedName).replace(/\b\w/g, (c) => c.toUpperCase()),
    email: isEmail ? identifier : `${identifier.replace(/\D/g, '')}@rider.restockr.mock`,
    role,
  }
}
