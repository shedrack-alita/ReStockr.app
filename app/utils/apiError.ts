interface FetchLikeError {
  statusCode?: number
  statusMessage?: string
  data?: { message?: string }
}

/**
 * Turns a $fetch error from one of our own API routes into a message
 * that's safe to show a user. Every mutation under /api/auth/* currently
 * 501s (see server/utils/apiError.ts, a deliberate stub — no real backend
 * exists yet) — this is what turns that into an honest, non-technical
 * message instead of a raw "501 Not Implemented" surfaced verbatim.
 */
export function getErrorMessage(err: unknown): string {
  const fetchError = err as FetchLikeError
  if (fetchError?.statusCode === 501) {
    return "This isn't available yet — we're still connecting this to a live backend. Please check back soon."
  }
  return fetchError?.data?.message ?? fetchError?.statusMessage ?? 'Something went wrong. Please try again.'
}
