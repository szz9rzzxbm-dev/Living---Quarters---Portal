import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Brand from '../../components/Brand'
import NavItem from '../../components/NavItem'
import { FinanceProvider } from '../context/FinanceContext'
import { useFinance } from '../hooks/useFinance'
import styles from './FinanceLayout.module.css'

const NAV = [
  { to: '/finance', label: 'Dashboard', end: true },
  { to: '/finance/transactions', label: 'Transactions' },
  { to: '/finance/accounts', label: 'Accounts' },
]

export default function FinanceLayout() {
  return (
    <FinanceProvider>
      <FinanceShell />
    </FinanceProvider>
  )
}

function FinanceShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { connected, institution, disconnectAll } = useFinance()

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <Brand sub="Finance" size="sm" />

        <nav className={styles.nav} onClick={() => setMenuOpen(false)}>
          {NAV.map((item) => (
            <NavItem key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div className={styles.foot}>
          {connected ? (
            <>
              <div className={styles.name}>{institution}</div>
              <div>Connected account</div>
              <button className={styles.linkBtn} onClick={disconnectAll}>
                Disconnect
              </button>
            </>
          ) : (
            <div>No bank connected</div>
          )}
          <Link className={styles.backLink} to="/portal">
            ← Client portal
          </Link>
        </div>
      </aside>

      <button className={styles.menuBtn} aria-label="Toggle navigation" onClick={() => setMenuOpen((v) => !v)}>
        ☰
      </button>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
