import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import Button from '../components/Button'
import Brand from '../components/Brand'
import { useAuth } from '../hooks/useAuth'

/**
 * Login screen. Authenticates against the current auth backend (mock for now,
 * Supabase later) and redirects to wherever the user was headed, or their home.
 */
export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Already signed in — don't show the form.
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/portal'} replace />
  }

  const home = location.state?.from?.pathname || '/portal'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate(home, { replace: true })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Brand sub="Client Portal" size="md" />
        <h1 className={styles.h1}>
          Welcome <em>back</em>
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <Button as="button" type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className={styles.help}>
          <a className={styles.helpLink} href="#forgotten">
            Forgotten password?
          </a>
          <a className={styles.helpLink} href="mailto:hello@thelivingquarters.com">
            Contact your coordinator
          </a>
        </div>

        <p className={styles.note}>Accounts are created by your project team — there’s no public sign-up.</p>

        <div className={styles.demo}>
          <span>Demo logins</span>
          Client — eleanor@example.com · living
          <br />
          Team — team@thelivingquarters.com · living
        </div>
      </div>
    </div>
  )
}
