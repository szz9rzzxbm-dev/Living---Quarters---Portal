import styles from './SpecList.module.css'

/**
 * Key/value spec list used for appliances and finishes.
 * items: [{ k, v, s }] — k is the label, v the value, s an optional detail line.
 */
export default function SpecList({ items = [] }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={styles.spec}>
          <div className={styles.k}>{it.k}</div>
          <div className={styles.v}>
            {it.v}
            {it.s && <small>{it.s}</small>}
          </div>
        </div>
      ))}
    </div>
  )
}
