import styles from './Brand.module.css'

/**
 * The Living Quarters wordmark. Used across every surface for consistent
 * branding. `sub` renders the eyebrow line beneath (e.g. "Client Portal").
 * `size`: 'sm' (sidebar) | 'md' (login / standalone pages).
 */
export default function Brand({ sub, size = 'sm' }) {
  return (
    <div className={`${styles.brand} ${styles[size]}`}>
      <div className={styles.mark}>
        The Living<span>Quarters</span>
      </div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  )
}
