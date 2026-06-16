import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'

/**
 * Admin: all projects at a glance. Stub — not built out in the frontend-only phase.
 */
export default function Dashboard() {
  return (
    <div className="view" style={{ padding: '2.6rem 3rem', maxWidth: 'var(--content-max)' }}>
      <PageHeader eyebrow="Admin CRM" heading={<>All <em>projects</em></>} />
      <Panel title="Projects">
        <p className="muted">The admin dashboard will list every active project here. Coming in a later phase.</p>
      </Panel>
    </div>
  )
}
