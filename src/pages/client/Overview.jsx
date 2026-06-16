import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import StatCard from '../../components/StatCard'
import MessageThread from '../../components/MessageThread'
import Chip from '../../components/Chip'
import Button from '../../components/Button'
import { client, project, team, messages } from '../../lib/mockData'

export default function Overview() {
  return (
    <div className="view">
      <PageHeader
        eyebrow="Welcome back"
        heading={<>Good afternoon, <em>{client.firstName}.</em></>}
        refLabel="Project reference"
        refValue={project.reference}
      />

      <div className="stats">
        <StatCard label="Current Stage" value={project.stageLabel} sub={`Stage ${project.stage} of 8 · on schedule`} small />
        <StatCard label="Estimated Install" value={project.installDate} sub="Provisional window confirmed" small />
        <StatCard label="Balance" value={project.outstanding} sub={`of ${project.contractTotal} outstanding`} />
      </div>

      <Panel title="Latest update" tag="New">
        <MessageThread messages={[messages[0]]} />
      </Panel>

      <div className="grid2">
        <Panel title="Next step">
          <div className="row">
            <div className="lead">
              <div className="t">Pre-delivery balance</div>
              <div className="s">Due before delivery · 7 Jul</div>
            </div>
            <Chip tone="due">Due soon</Chip>
          </div>
          <div className="row">
            <div className="lead">
              <div className="t">Confirm install access</div>
              <div className="s">Parking &amp; entry details</div>
            </div>
            <Button variant="ghost">Confirm</Button>
          </div>
        </Panel>

        <Panel title="Your team">
          {team.map((member) => (
            <div className="row" key={member.name}>
              <div className="lead">
                <div className="t">{member.name}</div>
                <div className="s">{member.role}</div>
              </div>
              <div className="meta">{member.meta}</div>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  )
}
