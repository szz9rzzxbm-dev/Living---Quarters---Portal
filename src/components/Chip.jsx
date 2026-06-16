import styles from './Chip.module.css'

/**
 * Status chip / badge. Outline only, no fill.
 * tone: paid | due | upcoming | signed | neutral
 */
export default function Chip({ tone = 'neutral', children }) {
  return <span className={`${styles.chip} ${styles[tone] || ''}`}>{children}</span>
}
