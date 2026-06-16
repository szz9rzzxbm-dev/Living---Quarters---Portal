import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import DocumentRow from '../../components/DocumentRow'
import { documents } from '../../lib/mockData'

export default function Documents() {
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
