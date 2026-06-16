import Chip from './Chip'
import Button from './Button'

/**
 * A single document line. `status` drives an optional chip; `action` an optional
 * ghost button label. Uses the shared .row primitive from global.css.
 */
export default function DocumentRow({ title, sub, status, action }) {
  return (
    <div className="row">
      <div className="lead">
        <div className="t">{title}</div>
        <div className="s">{sub}</div>
      </div>
      <div className="row-actions">
        {status === 'signed' && <Chip tone="signed">Signed</Chip>}
        {status === 'upcoming' && <Chip tone="upcoming">On handover</Chip>}
        {action && (
          <Button variant="ghost" as="button">
            {action}
          </Button>
        )}
      </div>
    </div>
  )
}
