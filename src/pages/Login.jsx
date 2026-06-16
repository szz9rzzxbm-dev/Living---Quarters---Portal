import styles from './Login.module.css'
import Button from '../components/Button'

/**
 * Login screen. Frontend-only stub — the form does not authenticate yet.
 * Supabase email + password auth will be wired up in a later session.
 */
export default function Login() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.brand}>
          The Living<span>Quarters</span>
        </div>
        <div className="eyebrow" style={{ marginTop: '0.9rem' }}>
          Client Portal
        </div>
        <h1 className={styles.h1}>
          Welcome <em>back</em>
        </h1>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            // Auth not connected yet (frontend-only).
          }}
        >
          <label className={styles.field}>
            <span>Email</span>
            <input type="email" autoComplete="email" placeholder="you@example.com" />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input type="password" autoComplete="current-password" placeholder="••••••••" />
          </label>
          <Button as="button" type="submit" className={styles.submit}>
            Sign in
          </Button>
        </form>

        <p className={styles.note}>Accounts are created by your project team. Trouble signing in? Contact your coordinator.</p>
      </div>
    </div>
  )
}
