import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { mockAuth } from '../lib/mockAuth'

/**
 * Auth context. Currently backed by the mock auth backend (src/lib/mockAuth.js);
 * swap `mockAuth` for `supabase.auth` here and the rest of the app is unchanged.
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore any persisted session on first load.
  useEffect(() => {
    const { data } = mockAuth.getSession()
    setUser(data.user)
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await mockAuth.signInWithPassword({ email, password })
    if (!error) setUser(data.user)
    return { error }
  }

  const signOut = async () => {
    await mockAuth.signOut()
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
