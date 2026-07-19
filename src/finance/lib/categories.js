/**
 * Spending categories. Colours are the 8-slot categorical palette validated
 * against this app's dark ink/panel surfaces (see dataviz skill) — order is
 * fixed and never re-cycled per category, so it stays CVD-safe everywhere
 * the palette is reused (donut chart, legend, chips).
 */
export const CATEGORIES = [
  { id: 'housing', label: 'Housing & bills', color: '#3987e5' },
  { id: 'food', label: 'Food & dining', color: '#008300' },
  { id: 'shopping', label: 'Shopping', color: '#d55181' },
  { id: 'transport', label: 'Transport & travel', color: '#c98500' },
  { id: 'subscriptions', label: 'Subscriptions', color: '#199e70' },
  { id: 'entertainment', label: 'Entertainment', color: '#d95926' },
  { id: 'health', label: 'Health & fitness', color: '#9085e9' },
  { id: 'other', label: 'Other', color: '#e66767' },
]

export const INCOME_COLOR = '#87935f' // reuses the app's --green token

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}

/**
 * Simulates the merchant-category enrichment a real provider (e.g. Plaid)
 * returns alongside each transaction. Keyword match against the merchant name.
 */
const RULES = [
  { category: 'housing', keywords: ['property mgmt', 'rent', 'con ed', 'utilities', 'xfinity', 'internet', 'insurance', 'mortgage'] },
  { category: 'food', keywords: ['trader joe', 'whole foods', 'coffee', 'chipotle', 'diner', 'doordash', 'grubhub', 'grocery', 'bakery', 'restaurant'] },
  { category: 'shopping', keywords: ['amazon', 'target', 'zara', 'best buy', 'ikea', 'nordstrom', 'etsy'] },
  { category: 'transport', keywords: ['uber', 'lyft', 'shell', 'chevron', 'exxon', 'metro transit', 'delta air', 'united air', 'parking', 'gas'] },
  { category: 'subscriptions', keywords: ['netflix', 'spotify', 'icloud', 'nyt', 'new york times', 'hulu', 'disney+', 'gym membership app'] },
  { category: 'entertainment', keywords: ['amc', 'steam', 'ticketmaster', 'the tap room', 'bowling', 'concert'] },
  { category: 'health', keywords: ['equinox', 'cvs', 'pharmacy', 'dr.', 'medical', 'dental', 'fitness'] },
]

export function categorize(merchant) {
  const m = merchant.toLowerCase()
  for (const rule of RULES) {
    if (rule.keywords.some((k) => m.includes(k))) return rule.category
  }
  return 'other'
}
