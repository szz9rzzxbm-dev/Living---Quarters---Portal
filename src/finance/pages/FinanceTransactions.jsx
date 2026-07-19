import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import { useFinance } from '../hooks/useFinance'
import { formatCurrency, formatDate } from '../lib/format'
import { CATEGORIES, categoryById } from '../lib/categories'
import styles from './FinanceTransactions.module.css'

export default function FinanceTransactions() {
  const { connected, transactions, accounts } = useFinance()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [accountId, setAccountId] = useState('all')

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (search && !t.merchant.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'all' && t.category !== category) return false
      if (accountId !== 'all' && t.accountId !== accountId) return false
      return true
    })
  }, [transactions, search, category, accountId])

  if (!connected) return <Navigate to="/finance/connect" replace />

  return (
    <div className="view">
      <PageHeader eyebrow="Finance" heading={<>All <em>transactions.</em></>} />

      <div className={styles.filters}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search merchant…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="income">Income</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select className={styles.select} value={accountId} onChange={(e) => setAccountId(e.target.value)}>
          <option value="all">All accounts</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} · {a.mask}
            </option>
          ))}
        </select>
      </div>

      <Panel title={`${filtered.length} transactions`}>
        {filtered.length === 0 && <p className="muted">No transactions match those filters.</p>}
        {filtered.map((t) => {
          const account = accounts.find((a) => a.id === t.accountId)
          const cat = t.category === 'income' ? null : categoryById(t.category)
          return (
            <div className="row" key={t.id}>
              <div className="lead">
                <div className="t">{t.merchant}</div>
                <div className="s">
                  {formatDate(t.date)} · {account?.name}
                  {cat && (
                    <>
                      {' · '}
                      <span className={styles.catDot} style={{ background: cat.color }} />
                      {cat.label}
                    </>
                  )}
                </div>
              </div>
              <div className={`meta ${t.amount > 0 ? styles.positive : ''}`}>
                {t.amount > 0 ? '+' : ''}
                {formatCurrency(t.amount)}
              </div>
            </div>
          )
        })}
      </Panel>
    </div>
  )
}
