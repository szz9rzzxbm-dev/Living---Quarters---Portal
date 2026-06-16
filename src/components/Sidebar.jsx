import NavItem from './NavItem'
import styles from './Sidebar.module.css'

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
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <div>
        <div className={styles.brand}>
          The Living<span>Quarters</span>
        </div>
        <div className={styles.brandSub}>Client Portal</div>
      </div>

      <nav className={styles.nav} onClick={onNavigate}>
        {NAV.map((item) => (
          <NavItem key={item.to} to={item.to} end={item.end}>
            {item.label}
          </NavItem>
        ))}
      </nav>

      <div className={styles.foot}>
        <div className={styles.name}>Eleanor &amp; James Whitlock</div>
        <div>The Old Rectory, Surrey</div>
      </div>
    </aside>
  )
}
