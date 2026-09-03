/**
 * The mocks show Naira as "₦3,500" — no decimals, comma-grouped. Using a
 * manual formatter instead of `Intl.NumberFormat('en-NG', { style:
 * 'currency', currency: 'NGN' })` because ICU's en-NG currency formatting
 * varies by Node/ICU build and isn't guaranteed to match that exact shape.
 */
export function formatCurrency(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-US')}`
}
