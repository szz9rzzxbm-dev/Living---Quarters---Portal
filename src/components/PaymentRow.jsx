import Chip from './Chip'
import Button from './Button'

const CHIP_LABEL = { paid: 'Paid', due: 'Due soon', upcoming: 'Upcoming' }

/**
 * A single payment line. Shows the label and amount together, a status chip,
 * and a "Pay now" button when the payment is currently due.
 */
export default function PaymentRow({ label, amount, sub, status }) {
  return (
    <div className="row">
      <div className="lead">
        <div className="t">
          {label} · {amount}
        </div>
        <div className="s">{sub}</div>
      </div>
      <div className="row-actions">
        <Chip tone={status}>{CHIP_LABEL[status] || status}</Chip>
        {status === 'due' && <Button>Pay now</Button>}
      </div>
    </div>
  )
}
