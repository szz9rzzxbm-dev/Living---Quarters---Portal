import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

/**
 * Admin: all projects at a glance. Stub — the admin CRM is not part of this
 * pass. Included so admin-role auth and route protection can be demonstrated.
 */
export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="view" style={{ padding: '2.6rem 3rem', maxWidth: 'var(--content-max)' }}>
      <PageHeader
        eyebrow="Admin CRM"
        heading={<>All <em>projects</em></>}
        refLabel="Signed in as"
        refValue={user?.name}
      />
      <Panel title="Projects" headRight={<Button variant="ghost" onClick={signOut}>Sign out</Button>}>
        <p className="muted">
          The admin dashboard will list every active project here. The team-facing CRM is the next phase of work.
        </p>
      </Panel>
    </div>
  )
}
