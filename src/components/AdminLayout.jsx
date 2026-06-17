import { Outlet } from 'react-router-dom'
import Brand from './Brand'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'
import styles from './AdminLayout.module.css'

/**
 * Minimal shell for the admin CRM. Carries the Living Quarters wordmark and a
 * sign-out so branding and session controls are consistent across admin pages.
 */
export default function AdminLayout() {
  const { signOut } = useAuth()
  return (
    <div className={styles.wrap}>
      <header className={styles.bar}>
        <Brand sub="Admin CRM" size="sm" />
        <Button variant="ghost" onClick={signOut}>
          Sign out
        </Button>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
