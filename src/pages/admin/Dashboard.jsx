import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import { useAuth } from '../../hooks/useAuth'

/**
 * Admin: all projects at a glance. Stub — the admin CRM is the next phase.
 * Included so admin-role auth and route protection can be demonstrated.
 */
export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="view">
      <PageHeader
        eyebrow="All projects"
        heading={<>Good to see you, <em>{user?.firstName}.</em></>}
        refLabel="Signed in as"
        refValue={user?.name}
      />
      <Panel title="Projects">
        <p className="muted">
          The admin dashboard will list every active project here. The team-facing CRM is the next phase of work.
        </p>
      </Panel>
    </div>
  )
}
