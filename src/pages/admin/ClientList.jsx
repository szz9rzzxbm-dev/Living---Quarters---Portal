import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'

/**
 * Admin: client list. Stub for the frontend-only phase.
 */
export default function ClientList() {
  return (
    <div className="view" style={{ padding: '2.6rem 3rem', maxWidth: 'var(--content-max)' }}>
      <PageHeader eyebrow="Admin CRM" heading={<>Your <em>clients</em></>} />
      <Panel title="Clients">
        <p className="muted">Every client and their projects will be listed here. Coming in a later phase.</p>
      </Panel>
    </div>
  )
}
