import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ConnectBankModal from '../components/ConnectBankModal'
import { useFinance } from '../hooks/useFinance'
import styles from './FinanceConnect.module.css'

export default function FinanceConnect() {
  const [open, setOpen] = useState(false)
  const { connected, connect } = useFinance()
  const navigate = useNavigate()

  if (connected) return <Navigate to="/finance" replace />

  return (
    <div className="view">
      <div className={styles.hero}>
        <div className="eyebrow">Get started</div>
        <h1 className={styles.heading}>
          See exactly where your <em>money is going.</em>
        </h1>
        <p className={styles.copy}>
          Connect a bank account to pull in your transactions and get an automatic
          breakdown by category — groceries, subscriptions, dining, bills and more.
        </p>
        <Button onClick={() => setOpen(true)}>Connect a bank account</Button>
      </div>

      <ConnectBankModal
        open={open}
        onClose={() => setOpen(false)}
        onConnected={(institutionId) => {
          connect(institutionId)
          setOpen(false)
          navigate('/finance')
        }}
      />
    </div>
  )
}
