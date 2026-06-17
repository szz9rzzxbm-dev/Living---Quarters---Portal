import Chip from './Chip'
import Button from './Button'

/**
 * A single document line. `status` drives an optional chip; `action` an optional
 * ghost button label that calls `onView` (e.g. to open the document viewer).
 */
export default function DocumentRow({ title, sub, status, action, onView }) {
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
          <Button variant="ghost" as="button" onClick={onView}>
            {action}
          </Button>
        )}
      </div>
    </div>
  )
}
