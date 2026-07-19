import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import Button from '../../components/Button'
import ConnectBankModal from '../components/ConnectBankModal'
import { useFinance } from '../hooks/useFinance'
import { formatCurrency } from '../lib/format'
import styles from './FinanceAccounts.module.css'

const TYPE_LABEL = { checking: 'Checking', savings: 'Savings', credit: 'Credit card' }

export default function FinanceAccounts() {
  const { connected, institution, accounts, connectedAt, connect } = useFinance()
  const [open, setOpen] = useState(false)

  if (!connected) return <Navigate to="/finance/connect" replace />

  return (
    <div className="view">
      <PageHeader eyebrow="Finance" heading={<>Linked <em>accounts.</em></>} />

      <Panel
        title={institution}
        tag={`Connected ${new Date(connectedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
        headRight={
          <Button variant="ghost" className={styles.switchBtn} onClick={() => setOpen(true)}>
            Switch bank
          </Button>
        }
      >
        <div className={styles.grid}>
          {accounts.map((a) => (
            <div className={styles.card} key={a.id}>
              <div className={styles.cardTop}>
                <span className={styles.type}>{TYPE_LABEL[a.type]}</span>
                <span className={styles.mask}>•••• {a.mask}</span>
              </div>
              <div className={styles.name}>{a.name}</div>
              <div className={a.balance < 0 ? styles.balanceNeg : styles.balance}>{formatCurrency(a.balance)}</div>
            </div>
          ))}
        </div>
      </Panel>

      <ConnectBankModal
        open={open}
        onClose={() => setOpen(false)}
        onConnected={(institutionId) => {
          connect(institutionId)
          setOpen(false)
        }}
      />
    </div>
  )
}
