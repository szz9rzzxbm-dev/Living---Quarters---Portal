import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader'

/**
 * Guards a route subtree. Redirects to /login when signed out (remembering where
 * the user was headed), and enforces an optional role. Renders nested routes via
 * <Outlet />, or `children` when used as a wrapper.
 */
export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loader full label="Opening your portal" />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (role && user.role !== role) {
    // Signed in but wrong role — send them to their own home.
    return <Navigate to={user.role === 'admin' ? '/admin' : '/portal'} replace />
  }

  return children ?? <Outlet />
}
