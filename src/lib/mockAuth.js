/**
 * Mock auth backend — the stand-in for Supabase Auth.
 *
 * This deliberately mirrors the shape of `supabase.auth` so the real client can
 * be dropped in later with minimal change:
 *   - signInWithPassword({ email, password }) -> { data: { user }, error }
 *   - signOut()                               -> { error }
 *   - getSession()                            -> { data: { user } }
 *
 * Sessions are persisted to localStorage. Seeded accounts stand in for
 * Supabase `auth.users` joined to a `profiles` table holding role + name.
 */

const STORAGE_KEY = 'lq.session'

// Seeded accounts. In Supabase these become real auth users + a profiles row.
const ACCOUNTS = [
  {
    id: 'usr_eleanor',
    email: 'eleanor@example.com',
    password: 'living',
    role: 'client',
    name: 'Eleanor Whitlock',
    firstName: 'Eleanor',
    projectRef: 'LQ-2618',
  },
  {
    id: 'usr_team',
    email: 'team@thelivingquarters.com',
    password: 'living',
    role: 'admin',
    name: 'Priya Anand',
    firstName: 'Priya',
    projectRef: null,
  },
]

/** Strip the password before anything leaves this module. */
function publicUser(account) {
  if (!account) return null
  const { password, ...rest } = account
  return rest
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { id } = JSON.parse(raw)
    return publicUser(ACCOUNTS.find((a) => a.id === id))
  } catch {
    return null
  }
}

export const mockAuth = {
  getSession() {
    return { data: { user: readStored() } }
  },

  async signInWithPassword({ email, password }) {
    // Tiny delay so loading states are exercised, like a real network call.
    await new Promise((r) => setTimeout(r, 350))
    const account = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === String(email).trim().toLowerCase() && a.password === password,
    )
    if (!account) {
      return { data: { user: null }, error: { message: 'Those details don’t match an account. Check and try again.' } }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: account.id }))
    return { data: { user: publicUser(account) }, error: null }
  },

  async signOut() {
    localStorage.removeItem(STORAGE_KEY)
    return { error: null }
  },
}
