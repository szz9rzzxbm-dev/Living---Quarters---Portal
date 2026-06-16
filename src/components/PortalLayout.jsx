import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import styles from './PortalLayout.module.css'

/**
 * Client portal shell: fixed sidebar + scrolling main content. The mobile menu
 * button toggles the off-canvas sidebar; selecting a nav item closes it again.
 */
export default function PortalLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <button
        className={styles.menuBtn}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((v) => !v)}
      >
        ☰
      </button>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
