import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import MessageThread from '../../components/MessageThread'
import Button from '../../components/Button'
import { messages } from '../../lib/mockData'

export default function Messages() {
  return (
    <div className="view">
      <PageHeader eyebrow="Always here" heading={<>Your <em>messages</em></>} />
      <Panel title="Conversation">
        <MessageThread messages={messages} />
        <div className="row" style={{ borderTop: '1px solid var(--line)', marginTop: '1rem', paddingTop: '1.4rem' }}>
          <div className="lead" style={{ flex: 1 }}>
            <div className="s">Message your project coordinator, Priya</div>
          </div>
          <Button>Send a message</Button>
        </div>
      </Panel>
    </div>
  )
}
