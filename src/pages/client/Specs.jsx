import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import SpecList from '../../components/SpecList'
import Loader from '../../components/Loader'
import { useProject } from '../../hooks/useProject'

export default function Specs() {
  const { loading, appliances, finishes } = useProject()

  if (loading) {
    return (
      <div className="view">
        <Loader label="Loading your specification" />
      </div>
    )
  }

  return (
    <div className="view">
      <PageHeader eyebrow="Your specification" heading={<>Design &amp; <em>appliances</em></>} />
      <div className="grid2">
        <Panel title="Appliances">
          <SpecList items={appliances} />
        </Panel>
        <Panel title="Finishes & materials">
          <SpecList items={finishes} />
        </Panel>
      </div>
    </div>
  )
}
