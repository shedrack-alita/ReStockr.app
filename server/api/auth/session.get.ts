import type { SessionResponse } from '#shared/types/auth'

/**
 * Unlike the other auth routes, this one isn't a stub — "no backend yet"
 * genuinely means "nobody is signed in", so always reporting a null user
 * is the correct behavior today, not a placeholder. Once real session
 * storage exists, this reads whatever cookie/token scheme the backend
 * uses instead.
 */
export default defineEventHandler((): SessionResponse => {
  return { user: null }
})
