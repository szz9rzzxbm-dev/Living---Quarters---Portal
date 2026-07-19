const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const currencyCompact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' })

export function formatCurrency(amount, compact = false) {
  return (compact ? currencyCompact : currency).format(amount)
}

export function formatMonth(monthKey) {
  const [y, m] = monthKey.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', { month: 'short' })
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
