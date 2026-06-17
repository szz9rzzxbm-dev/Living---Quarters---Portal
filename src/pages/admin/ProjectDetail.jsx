import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'

/**
 * Admin: single project detail + edit. Stub for the frontend-only phase.
 */
export default function ProjectDetail() {
  const { id } = useParams()
  return (
    <div className="view">
      <PageHeader eyebrow="Project management" heading={<>Project <em>detail</em></>} refLabel="Project" refValue={id} />
      <Panel title="Manage project">
        <p className="muted">Stage advancement, document upload and messaging will live here. Coming in a later phase.</p>
      </Panel>
    </div>
  )
}
