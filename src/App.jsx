import { Routes, Route, Navigate } from 'react-router-dom'

import PortalLayout from './components/PortalLayout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Client portal views
import Overview from './pages/client/Overview'
import Progress from './pages/client/Progress'
import Specs from './pages/client/Specs'
import Documents from './pages/client/Documents'
import Payments from './pages/client/Payments'
import Shop from './pages/client/Shop'
import Messages from './pages/client/Messages'

// Auth + admin + fallback
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admin/Dashboard'
import ProjectDetail from './pages/admin/ProjectDetail'
import ClientList from './pages/admin/ClientList'
import NewProject from './pages/admin/NewProject'

/**
 * Routing for the whole app.
 *
 * Auth is backed by the mock auth backend for now (no Supabase project yet),
 * but route protection and client/admin role separation are fully enforced.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Client portal — requires an authenticated client */}
      <Route element={<ProtectedRoute role="client" />}>
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Overview />} />
          <Route path="progress" element={<Progress />} />
          <Route path="specs" element={<Specs />} />
          <Route path="documents" element={<Documents />} />
          <Route path="payments" element={<Payments />} />
          <Route path="shop" element={<Shop />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>

      {/* Admin CRM — requires an authenticated admin */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/new" element={<NewProject />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
