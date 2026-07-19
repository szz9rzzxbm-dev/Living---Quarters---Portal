import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { INSTITUTIONS } from '../lib/financeStore'
import styles from './ConnectBankModal.module.css'

const STEPS = ['Verifying institution', 'Fetching accounts', 'Categorizing recent transactions']

/**
 * Stands in for a real Plaid Link flow. No credentials are collected here —
 * this is a demo data generator, not a real bank connection.
 */
export default function ConnectBankModal({ open, onClose, onConnected }) {
  const [picked, setPicked] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (!open) {
      setPicked(null)
      setStepIndex(0)
    }
  }, [open])

  useEffect(() => {
    if (!picked) return
    if (stepIndex >= STEPS.length) {
      onConnected(picked.id)
      return
    }
    const t = setTimeout(() => setStepIndex((i) => i + 1), 550)
    return () => clearTimeout(t)
  }, [picked, stepIndex, onConnected])

  return (
    <Modal open={open} onClose={onClose} title="Connect a bank account">
      {!picked && (
        <>
          <p className={styles.intro}>
            Choose your bank to link its accounts. This demo simulates the connection with
            realistic sample data — no real credentials are requested or sent anywhere.
          </p>
          <div className={styles.grid}>
            {INSTITUTIONS.map((bank) => (
              <button key={bank.id} className={styles.bank} onClick={() => setPicked(bank)}>
                <span className={styles.mark} style={{ background: bank.color }}>
                  {bank.initials}
                </span>
                {bank.name}
              </button>
            ))}
          </div>
        </>
      )}

      {picked && (
        <div className={styles.connecting}>
          <span className={styles.mark} style={{ background: picked.color }}>
            {picked.initials}
          </span>
          <div className={styles.connectingTitle}>Connecting to {picked.name}</div>
          <ul className={styles.stepList}>
            {STEPS.map((label, i) => (
              <li key={label} className={i <= stepIndex ? styles.done : ''}>
                <span className={styles.dot} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}
