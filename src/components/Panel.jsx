import styles from './Panel.module.css'

/**
 * Card / panel surface. Optional header with title and a tag (eyebrow above heading rule
 * applies to page sections; within a panel the title sits inline with an optional tag chip).
 */
export default function Panel({ title, tag, headRight, children, className = '' }) {
  return (
    <section className={`${styles.panel} ${className}`.trim()}>
      {(title || tag || headRight) && (
        <div className={styles.head}>
          {title && <h2>{title}</h2>}
          {tag && <span className={styles.tag}>{tag}</span>}
          {headRight}
        </div>
      )}
      {children}
    </section>
  )
}
