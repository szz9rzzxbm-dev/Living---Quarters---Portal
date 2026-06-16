import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import AffiliateCard from '../../components/AffiliateCard'
import { affiliates } from '../../lib/mockData'

export default function Shop() {
  return (
    <div className="view">
      <PageHeader eyebrow="Curated to match your design" heading={<>Furnish your <em>space</em></>} />
      <Panel title="Recommended pieces" tag="Partner links">
        <p className="muted" style={{ fontSize: '0.86rem', marginBottom: '1.4rem', maxWidth: '60ch' }}>
          Pieces chosen by your designer to complement the Whitlock kitchen. Buying through these links supports us at no
          extra cost to you.
        </p>
        <div className="aff-grid">
          {affiliates.map((a) => (
            <AffiliateCard key={a.name} {...a} />
          ))}
        </div>
      </Panel>
    </div>
  )
}
