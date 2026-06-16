/**
 * Page-level header. Eyebrow always sits above the heading. `heading` may include
 * an <em> for the italic brass emphasis used throughout the portal. Optional `ref`
 * renders the right-aligned project reference block.
 */
export default function PageHeader({ eyebrow, heading, refLabel, refValue }) {
  return (
    <div className="topbar">
      <div className="greeting">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{heading}</h1>
      </div>
      {refValue && (
        <div className="ref">
          {refLabel}
          <b>{refValue}</b>
        </div>
      )}
    </div>
  )
}
