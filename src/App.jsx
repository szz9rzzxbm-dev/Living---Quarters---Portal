import { Routes, Route, Navigate } from 'react-router-dom'

import PortalLayout from './components/PortalLayout'

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
 * Frontend-only phase: routes are NOT yet protected — auth guards
 * (client vs admin role) will wrap these once Supabase Auth is connected.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Client portal (protected later — requires client role) */}
      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<Overview />} />
        <Route path="progress" element={<Progress />} />
        <Route path="specs" element={<Specs />} />
        <Route path="documents" element={<Documents />} />
        <Route path="payments" element={<Payments />} />
        <Route path="shop" element={<Shop />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Admin CRM (protected later — requires admin role) */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/projects/:id" element={<ProjectDetail />} />
      <Route path="/admin/clients" element={<ClientList />} />
      <Route path="/admin/clients/new" element={<NewProject />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
