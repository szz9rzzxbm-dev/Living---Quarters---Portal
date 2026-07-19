import { categorize } from './categories'

const STORAGE_KEY = 'lq-finance-v1'

export const INSTITUTIONS = [
  { id: 'chase', name: 'Chase', initials: 'CH', color: '#3987e5' },
  { id: 'boa', name: 'Bank of America', initials: 'BA', color: '#d95926' },
  { id: 'wells', name: 'Wells Fargo', initials: 'WF', color: '#c98500' },
  { id: 'capone', name: 'Capital One', initials: 'CO', color: '#e66767' },
  { id: 'ally', name: 'Ally Bank', initials: 'AL', color: '#199e70' },
  { id: 'citi', name: 'Citibank', initials: 'CI', color: '#9085e9' },
]

const RECURRING_MONTHLY = [
  { merchant: 'Meridian Property Mgmt', amount: -1450, day: 1, accountType: 'checking' },
  { merchant: 'Con Ed Utilities', amount: -84, day: 4, accountType: 'checking' },
  { merchant: 'Xfinity Internet', amount: -69, day: 6, accountType: 'checking' },
  { merchant: 'State Farm Insurance', amount: -118, day: 8, accountType: 'checking' },
  { merchant: 'Netflix', amount: -17.99, day: 12, accountType: 'credit' },
  { merchant: 'Spotify', amount: -11.99, day: 13, accountType: 'credit' },
  { merchant: 'iCloud+ Storage', amount: -2.99, day: 14, accountType: 'credit' },
  { merchant: 'The New York Times', amount: -8, day: 15, accountType: 'credit' },
  { merchant: 'Equinox Gym Membership', amount: -195, day: 3, accountType: 'checking' },
]

const PAYROLL = { merchant: 'Employer Payroll', amount: 3120 }

const EVERYDAY = [
  { merchant: "Trader Joe's", range: [22, 68] },
  { merchant: 'Whole Foods Market', range: [30, 95] },
  { merchant: 'Blue Bottle Coffee', range: [4, 9] },
  { merchant: 'Chipotle', range: [10, 16] },
  { merchant: 'DoorDash', range: [18, 42] },
  { merchant: 'Corner Diner', range: [12, 28] },
  { merchant: 'Amazon', range: [15, 140] },
  { merchant: 'Target', range: [20, 110] },
  { merchant: 'Zara', range: [35, 130] },
  { merchant: 'Best Buy', range: [40, 320] },
  { merchant: 'Uber', range: [9, 34] },
  { merchant: 'Shell Gas', range: [30, 55] },
  { merchant: 'Metro Transit Card', range: [20, 40] },
  { merchant: 'AMC Theatres', range: [14, 32] },
  { merchant: 'Steam', range: [10, 60] },
  { merchant: 'Ticketmaster', range: [45, 150] },
  { merchant: 'CVS Pharmacy', range: [8, 45] },
]

function rand(min, max) {
  return Math.random() * (max - min) + min
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function isoDate(d) {
  return d.toISOString().slice(0, 10)
}

function generateAccounts(institution) {
  return [
    {
      id: `${institution.id}-checking`,
      institution: institution.name,
      type: 'checking',
      name: 'Everyday Checking',
      mask: String(Math.floor(1000 + Math.random() * 8999)).slice(-4),
      balance: Math.round(rand(2400, 6800) * 100) / 100,
    },
    {
      id: `${institution.id}-savings`,
      institution: institution.name,
      type: 'savings',
      name: 'Online Savings',
      mask: String(Math.floor(1000 + Math.random() * 8999)).slice(-4),
      balance: Math.round(rand(8000, 22000) * 100) / 100,
    },
    {
      id: `${institution.id}-credit`,
      institution: institution.name,
      type: 'credit',
      name: 'Rewards Credit Card',
      mask: String(Math.floor(1000 + Math.random() * 8999)).slice(-4),
      balance: -Math.round(rand(300, 2200) * 100) / 100,
    },
  ]
}

function generateTransactions(accounts, months = 4) {
  const byType = Object.fromEntries(accounts.map((a) => [a.type, a]))
  const txns = []
  const now = new Date()
  let idCounter = 0

  for (let m = months - 1; m >= 0; m--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - m, 1)
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()

    for (const bill of RECURRING_MONTHLY) {
      const day = Math.min(bill.day, daysInMonth)
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
      if (date > now) continue
      const account = byType[bill.accountType] || accounts[0]
      txns.push({
        id: `t${idCounter++}`,
        accountId: account.id,
        date: isoDate(date),
        merchant: bill.merchant,
        amount: bill.amount,
        category: categorize(bill.merchant),
      })
    }

    for (const payDay of [3, 18]) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), Math.min(payDay, daysInMonth))
      if (date > now) continue
      txns.push({
        id: `t${idCounter++}`,
        accountId: byType.checking.id,
        date: isoDate(date),
        merchant: PAYROLL.merchant,
        amount: Math.round((PAYROLL.amount + rand(-40, 40)) * 100) / 100,
        category: 'income',
      })
    }

    const count = Math.floor(rand(24, 34))
    for (let i = 0; i < count; i++) {
      const day = Math.floor(rand(1, daysInMonth + 1))
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
      if (date > now) continue
      const spot = pick(EVERYDAY)
      const account = Math.random() < 0.6 ? byType.credit : byType.checking
      txns.push({
        id: `t${idCounter++}`,
        accountId: account.id,
        date: isoDate(date),
        merchant: spot.merchant,
        amount: -Math.round(rand(spot.range[0], spot.range[1]) * 100) / 100,
        category: categorize(spot.merchant),
      })
    }
  }

  return txns.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function connectBank(institutionId) {
  const institution = INSTITUTIONS.find((b) => b.id === institutionId) || INSTITUTIONS[0]
  const accounts = generateAccounts(institution)
  const transactions = generateTransactions(accounts)
  const state = { institution: institution.name, connectedAt: new Date().toISOString(), accounts, transactions }
  saveState(state)
  return state
}

export function disconnect() {
  localStorage.removeItem(STORAGE_KEY)
}
