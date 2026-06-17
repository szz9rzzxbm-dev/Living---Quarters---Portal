import { useAuthContext } from '../context/AuthContext'

/**
 * Auth state for the app: { user, loading, signIn, signOut }.
 *
 * `user` is null when signed out, otherwise { id, email, role, name, firstName, ... }.
 * Backed by AuthContext, which currently uses the mock auth backend and will use
 * Supabase Auth once connected.
 */
export function useAuth() {
  return useAuthContext()
}
