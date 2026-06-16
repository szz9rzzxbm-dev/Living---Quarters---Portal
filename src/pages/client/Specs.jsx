import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import SpecList from '../../components/SpecList'
import { appliances, finishes } from '../../lib/mockData'

export default function Specs() {
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
