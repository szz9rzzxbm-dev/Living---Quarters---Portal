import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'

/**
 * Admin: create new client + project. Stub for the frontend-only phase.
 */
export default function NewProject() {
  return (
    <div className="view" style={{ padding: '2.6rem 3rem', maxWidth: 'var(--content-max)' }}>
      <PageHeader eyebrow="Admin CRM" heading={<>New <em>project</em></>} />
      <Panel title="Create client & project">
        <p className="muted">A form to onboard a new client and open their project will live here. Coming in a later phase.</p>
      </Panel>
    </div>
  )
}
