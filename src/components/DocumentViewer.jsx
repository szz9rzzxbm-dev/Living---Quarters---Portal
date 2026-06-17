import styles from './DocumentViewer.module.css'

/**
 * Renders a placeholder "paper" preview of a document, varying by doc.docType
 * (contract | drawing | spec | survey). Stands in for a real file viewer until
 * documents are served from Supabase Storage.
 */
export default function DocumentViewer({ doc }) {
  if (!doc) return null

  return (
    <div className={styles.paper}>
      <div className={styles.letterhead}>
        <div className={styles.mark}>
          The Living<span>Quarters</span>
        </div>
        <div className={styles.docMeta}>{doc.meta}</div>
      </div>

      <h2 className={styles.title}>{doc.title}</h2>

      {doc.plan && <PlanDrawing />}

      {doc.items && (
        <div className={styles.specList}>
          {doc.items.map((it) => (
            <div className={styles.specRow} key={it.k}>
              <span className={styles.specK}>{it.k}</span>
              <span className={styles.specV}>{it.v}</span>
            </div>
          ))}
        </div>
      )}

      {doc.body?.map((section) => (
        <div className={styles.section} key={section.h}>
          <h3 className={styles.h}>{section.h}</h3>
          <p className={styles.p}>{section.p}</p>
        </div>
      ))}

      {doc.signature && <div className={styles.signature}>{doc.signature}</div>}

      <div className={styles.footer}>The Living Quarters Ltd · Preview document · For demonstration only</div>
    </div>
  )
}

/** A simple stylised plan, standing in for the real design drawing. */
function PlanDrawing() {
  return (
    <svg className={styles.plan} viewBox="0 0 400 220" role="img" aria-label="Kitchen plan drawing">
      <rect x="10" y="10" width="380" height="200" fill="none" stroke="#221e18" strokeWidth="2" />
      {/* run of units along the top */}
      <rect x="20" y="20" width="360" height="34" fill="#cdad7b22" stroke="#221e18" strokeWidth="1.2" />
      {/* island */}
      <rect x="120" y="110" width="160" height="60" fill="#cdad7b33" stroke="#221e18" strokeWidth="1.2" />
      <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#221e18" fontStyle="italic">
        Island 2400 × 1200
      </text>
      {/* tall units to the right */}
      <rect x="346" y="60" width="34" height="120" fill="#cdad7b22" stroke="#221e18" strokeWidth="1.2" />
      <text x="200" y="44" textAnchor="middle" fontSize="10" fill="#221e18">
        Run elevations · 1:20
      </text>
    </svg>
  )
}
