import styles from './ProgressTrack.module.css'

/**
 * Vertical stage tracker. Each step has a status of 'done' | 'current' | ''.
 * steps: [{ label, when, status, sub }]
 */
export default function ProgressTrack({ steps = [] }) {
  return (
    <div className={styles.track}>
      {steps.map((s, i) => (
        <div key={i} className={`${styles.step} ${s.status ? styles[s.status] : ''}`}>
          <div className={styles.marker}>
            <div className={styles.ring} />
            <div className={styles.bar} />
          </div>
          <div>
            <div className={styles.label}>{s.label}</div>
            {s.sub && <div className={styles.sub}>{s.sub}</div>}
          </div>
          <div className={styles.when}>{s.when}</div>
        </div>
      ))}
    </div>
  )
}
