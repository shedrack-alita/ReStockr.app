interface FetchLikeError {
  statusCode?: number
  statusMessage?: string
  data?: { message?: string }
}

export function getErrorMessage(err: unknown): string {
  const fetchError = err as FetchLikeError
  if (fetchError?.statusCode === 501) {
    return "Something went wrong. Please check back soon."
  }
  return fetchError?.data?.message ?? fetchError?.statusMessage ?? 'Something went wrong. Please try again.'
}
