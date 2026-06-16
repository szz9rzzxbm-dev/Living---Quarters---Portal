import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.css'

/**
 * Sidebar navigation item. Uses NavLink so the active route is highlighted.
 * `end` ensures the index route (/portal) isn't marked active on child routes.
 */
export default function NavItem({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
    >
      <span className={styles.dot} />
      {children}
    </NavLink>
  )
}
