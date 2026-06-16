import styles from './AffiliateCard.module.css'

/**
 * Partner / affiliate product card. Renders as a link when an href is supplied.
 */
export default function AffiliateCard({ category, name, price, href }) {
  return (
    <a
      className={styles.card}
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
    >
      <div className={styles.cat}>{category}</div>
      <div className={styles.nm}>{name}</div>
      <div className={styles.pr}>{price}</div>
      <div className={styles.lk}>Shop the piece</div>
    </a>
  )
}
