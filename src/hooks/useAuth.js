/**
 * Auth state — NOT connected yet.
 *
 * Frontend-only stub. Returns a signed-in client so the portal is reachable
 * during development. Once Supabase Auth is wired up, this will subscribe to
 * the session and expose the real user, role and sign-in / sign-out actions.
 */
export function useAuth() {
  return {
    loading: false,
    user: { email: 'eleanor@example.com', role: 'client' },
    signIn: async () => {},
    signOut: async () => {},
  }
}
