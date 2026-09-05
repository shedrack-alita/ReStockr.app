import type { SessionResponse } from '#shared/types/auth'

export default defineEventHandler((): SessionResponse => {
  return { user: null }
})
