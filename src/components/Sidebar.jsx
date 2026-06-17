import NavItem from './NavItem'
import Brand from './Brand'
import styles from './Sidebar.module.css'
import { useAuth } from '../hooks/useAuth'
import { useProject } from '../hooks/useProject'

const NAV = [
  { to: '/portal', label: 'Overview', end: true },
  { to: '/portal/progress', label: 'Project Progress' },
  { to: '/portal/specs', label: 'Design & Appliances' },
  { to: '/portal/documents', label: 'Contract & Documents' },
  { to: '/portal/payments', label: 'Invoices & Payments' },
  { to: '/portal/shop', label: 'Furnish Your Space' },
  { to: '/portal/messages', label: 'Messages' },
]

/**
 * Fixed 240px sidebar. `open` toggles the off-canvas drawer on mobile;
 * `onNavigate` lets the parent close the drawer after a selection.
 */
export default function Sidebar({ open = false, onNavigate }) {
  const { signOut } = useAuth()
  const { client } = useProject()

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <Brand sub="Client Portal" size="sm" />

      <nav className={styles.nav} onClick={onNavigate}>
        {NAV.map((item) => (
          <NavItem key={item.to} to={item.to} end={item.end}>
            {item.label}
          </NavItem>
        ))}
      </nav>

      <div className={styles.foot}>
        <div className={styles.name}>{client?.fullName || 'Your project'}</div>
        <div>{client?.address}</div>
        <button className={styles.signout} onClick={signOut}>
          Sign out
        </button>
      </div>
    </aside>
  )
}
