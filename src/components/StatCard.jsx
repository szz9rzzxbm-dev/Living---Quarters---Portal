import styles from './StatCard.module.css'

/**
 * Summary stat card. `small` reduces the headline size for text values
 * (e.g. "In Manufacture") versus numeric values (e.g. "£14,280").
 */
export default function StatCard({ label, value, sub, small = false }) {
  return (
    <div className={styles.stat}>
      <div className={styles.lbl}>{label}</div>
      <div className={`${styles.big} ${small ? styles.small : ''}`}>{value}</div>
      {sub && <div className={styles.sm}>{sub}</div>}
    </div>
  )
}
