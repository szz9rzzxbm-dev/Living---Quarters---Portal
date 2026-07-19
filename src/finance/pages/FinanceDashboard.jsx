import { Navigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import StatCard from '../../components/StatCard'
import DonutChart from '../components/DonutChart'
import TrendChart from '../components/TrendChart'
import { useFinance } from '../hooks/useFinance'
import { formatCurrency, formatDate } from '../lib/format'
import { categoryById } from '../lib/categories'
import styles from './FinanceDashboard.module.css'

export default function FinanceDashboard() {
  const { connected, netWorth, totalSpend, totalIncome, spendByCategory, topMerchants, monthlyTrend, recentTransactions } =
    useFinance()

  if (!connected) return <Navigate to="/finance/connect" replace />

  const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long' })

  return (
    <div className="view">
      <PageHeader eyebrow="Finance" heading={<>Where your money went <em>this month.</em></>} />

      <div className="stats">
        <StatCard label="Net worth" value={formatCurrency(netWorth)} sub="Across all linked accounts" />
        <StatCard label={`${monthLabel} income`} value={formatCurrency(totalIncome)} sub="Deposits this month" />
        <StatCard label={`${monthLabel} spend`} value={formatCurrency(totalSpend)} sub="Outflows this month" />
      </div>

      <Panel title="Spending by category" tag={monthLabel}>
        {spendByCategory.length ? (
          <DonutChart segments={spendByCategory} centerLabel="Total spend" centerValue={totalSpend} />
        ) : (
          <p className="muted">No spending recorded yet this month.</p>
        )}
      </Panel>

      <div className="grid2">
        <Panel title="Income vs spend" tag="Last 6 months">
          <TrendChart months={monthlyTrend} />
        </Panel>

        <Panel title="Top merchants" tag={monthLabel}>
          {topMerchants.map((m) => (
            <div className="row" key={m.merchant}>
              <div className="lead">
                <div className="t">{m.merchant}</div>
              </div>
              <div className="meta">{formatCurrency(m.amount)}</div>
            </div>
          ))}
        </Panel>
      </div>

      <Panel title="Recent transactions">
        {recentTransactions.map((t) => {
          const cat = t.category === 'income' ? null : categoryById(t.category)
          return (
            <div className="row" key={t.id}>
              <div className="lead">
                <div className="t">{t.merchant}</div>
                <div className="s">
                  {formatDate(t.date)}
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
