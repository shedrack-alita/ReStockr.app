/**
 * Reactive currency *selection* (which currency the user is viewing prices
 * in, exchange-rate conversion) — distinct from app/utils/currency.ts's
 * formatCurrency(), which only formats a NGN amount as a string and has no
 * notion of multiple currencies. Not built yet — this store only becomes
 * meaningful once ReStockr sells outside a single-currency market.
 */
export function useCurrency() {
  // TODO: expose currency ref, setCurrency(), convert(amountInNgn).
}
