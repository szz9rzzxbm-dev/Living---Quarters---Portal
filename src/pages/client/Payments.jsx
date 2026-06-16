import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import StatCard from '../../components/StatCard'
import PaymentRow from '../../components/PaymentRow'
import { project, payments } from '../../lib/mockData'

export default function Payments() {
  return (
    <div className="view">
      <PageHeader eyebrow="Clear, itemised" heading={<>Invoices &amp; <em>payments</em></>} />

      <div className="stats">
        <StatCard label="Contract total" value={project.contractTotal} />
        <StatCard label="Paid to date" value={project.paidToDate} sub="50% complete" />
        <StatCard label="Outstanding" value={project.outstanding} />
      </div>

      <Panel title="Payment schedule">
        {payments.map((p) => (
          <PaymentRow key={p.label} {...p} />
        ))}
      </Panel>
    </div>
  )
}
