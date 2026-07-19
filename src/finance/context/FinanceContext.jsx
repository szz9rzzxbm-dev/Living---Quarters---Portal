import { createContext, useCallback, useMemo, useState } from 'react'
import { loadState, connectBank, disconnect as disconnectStore } from '../lib/financeStore'
import { categoryById } from '../lib/categories'

export const FinanceContext = createContext(null)

function monthKey(dateStr) {
  return dateStr.slice(0, 7) // YYYY-MM
}

export function FinanceProvider({ children }) {
  const [state, setState] = useState(() => loadState())

  const connect = useCallback((institutionId) => {
    setState(connectBank(institutionId))
  }, [])

  const disconnectAll = useCallback(() => {
    disconnectStore()
    setState(null)
  }, [])

  const derived = useMemo(() => {
    if (!state) return null
    const { accounts, transactions } = state
    const now = new Date()
    const thisMonthKey = monthKey(now.toISOString())

    const netWorth = accounts.reduce((sum, a) => sum + a.balance, 0)
    const thisMonthTxns = transactions.filter((t) => monthKey(t.date) === thisMonthKey)

    const spendMap = new Map()
    let totalSpend = 0
    for (const t of thisMonthTxns) {
      if (t.amount >= 0) continue
      const amt = Math.abs(t.amount)
      spendMap.set(t.category, (spendMap.get(t.category) || 0) + amt)
      totalSpend += amt
    }
    const spendByCategory = [...spendMap.entries()]
      .map(([id, amount]) => ({ ...categoryById(id), id, amount, pct: totalSpend ? amount / totalSpend : 0 }))
      .sort((a, b) => b.amount - a.amount)

    const totalIncome = thisMonthTxns.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)

    const merchantMap = new Map()
    for (const t of thisMonthTxns) {
      if (t.amount >= 0) continue
      merchantMap.set(t.merchant, (merchantMap.get(t.merchant) || 0) + Math.abs(t.amount))
    }
    const topMerchants = [...merchantMap.entries()]
      .map(([merchant, amount]) => ({ merchant, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)

    const trendMap = new Map()
    for (const t of transactions) {
      const key = monthKey(t.date)
      if (!trendMap.has(key)) trendMap.set(key, { month: key, income: 0, spend: 0 })
      const bucket = trendMap.get(key)
      if (t.amount > 0) bucket.income += t.amount
      else bucket.spend += Math.abs(t.amount)
    }
    const monthlyTrend = [...trendMap.values()].sort((a, b) => (a.month < b.month ? -1 : 1)).slice(-6)

    return {
      netWorth,
      totalSpend,
      totalIncome,
      spendByCategory,
      topMerchants,
      monthlyTrend,
      recentTransactions: transactions.slice(0, 10),
    }
  }, [state])

  const value = useMemo(
    () => ({
      connected: !!state,
      institution: state?.institution,
      accounts: state?.accounts ?? [],
      transactions: state?.transactions ?? [],
      connectedAt: state?.connectedAt,
      connect,
      disconnectAll,
      ...derived,
    }),
    [state, derived, connect, disconnectAll]
  )

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
