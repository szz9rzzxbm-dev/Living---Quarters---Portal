import styles from './Loader.module.css'

/**
 * Calm loading state. `full` centres it in the viewport (route-level);
 * otherwise it sits inline within a panel/section.
 */
export default function Loader({ label = 'Loading', full = false }) {
  return (
    <div className={`${styles.wrap} ${full ? styles.full : ''}`}>
      <span className={styles.dot} />
      <span className={styles.text}>{label}</span>
    </div>
  )
}
