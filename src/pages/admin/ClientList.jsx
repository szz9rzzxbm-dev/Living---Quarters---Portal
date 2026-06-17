import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'

/**
 * Admin: client list. Stub for the frontend-only phase.
 */
export default function ClientList() {
  return (
    <div className="view">
      <PageHeader eyebrow="Client management" heading={<>Your <em>clients</em></>} />
      <Panel title="Clients">
        <p className="muted">Every client and their projects will be listed here. Coming in a later phase.</p>
      </Panel>
    </div>
  )
}
