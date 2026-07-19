import { useState } from 'react'
import { formatCurrency, formatMonth } from '../lib/format'
import styles from './TrendChart.module.css'

const INCOME_COLOR = '#3987e5'
const SPEND_COLOR = '#e66767'

/** Grouped income/spend bars, one shared baseline + scale (never dual-axis). */
export default function TrendChart({ months }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(1, ...months.flatMap((m) => [m.income, m.spend]))

  return (
    <div className={styles.wrap}>
      <ul className={styles.legend}>
        <li>
          <span className={styles.swatch} style={{ background: INCOME_COLOR }} /> Income
        </li>
        <li>
          <span className={styles.swatch} style={{ background: SPEND_COLOR }} /> Spend
        </li>
      </ul>

      <div className={styles.chart}>
        {months.map((m) => (
          <div className={styles.col} key={m.month}>
            <div className={styles.bars}>
              {[
                { key: 'income', value: m.income, color: INCOME_COLOR },
                { key: 'spend', value: m.spend, color: SPEND_COLOR },
              ].map((s) => (
                <div className={styles.barTrack} key={s.key}>
                  {hover?.month === m.month && hover?.key === s.key && (
                    <div className={styles.tooltip}>{formatCurrency(s.value)}</div>
                  )}
                  <div
                    className={styles.bar}
                    style={{ height: `${(s.value / max) * 100}%`, background: s.color }}
                    onMouseEnter={() => setHover({ month: m.month, key: s.key })}
                    onMouseLeave={() => setHover(null)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.monthLabel}>{formatMonth(m.month)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
