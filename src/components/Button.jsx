import styles from './Button.module.css'

/**
 * Primary button: brass-soft fill, ink text. Ghost: brass outline, transparent.
 * Always uppercase, sentence-case copy, never rounded-pill.
 */
export default function Button({ variant = 'primary', as = 'button', children, className = '', ...rest }) {
  const cls = `${styles.btn} ${variant === 'ghost' ? styles.ghost : ''} ${className}`.trim()
  const Tag = as
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}
