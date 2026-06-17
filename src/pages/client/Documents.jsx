import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import DocumentRow from '../../components/DocumentRow'
import Loader from '../../components/Loader'
import { useProject } from '../../hooks/useProject'

export default function Documents() {
  const { loading, documents } = useProject()

  if (loading) {
    return (
      <div className="view">
        <Loader label="Loading your documents" />
      </div>
    )
  }

  return (
    <div className="view">
      <PageHeader eyebrow="Everything in writing" heading={<>Contract &amp; <em>documents</em></>} />
      <Panel title="Documents">
        {documents.map((doc) => (
          <DocumentRow key={doc.title} {...doc} />
        ))}
      </Panel>
    </div>
  )
}
