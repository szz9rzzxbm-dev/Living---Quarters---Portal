import { useState } from 'react'
import { formatCurrency } from '../lib/format'
import styles from './DonutChart.module.css'

/**
 * Categorical donut. Segments carry a 2px surface gap + rounded ends (the
 * palette's fixed slot order is set by the caller — see lib/categories.js).
 */
export default function DonutChart({ segments, centerLabel, centerValue }) {
  const [hovered, setHovered] = useState(null)
  const size = 200
  const stroke = 28
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const gap = 3
  const total = segments.reduce((s, seg) => s + seg.amount, 0)

  let offset = 0
  const arcs = segments.map((seg) => {
    const len = total ? (seg.amount / total) * circumference : 0
    const dash = Math.max(len - gap, 0)
    const arc = { ...seg, dash, gapLen: circumference - dash, offset }
    offset += len
    return arc
  })

  const active = segments.find((s) => s.id === hovered)

  return (
    <div className={styles.wrap}>
      <div className={styles.chartBox}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Spending by category">
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {arcs.map((seg) => (
              <circle
                key={seg.id}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={hovered === seg.id ? stroke + 4 : stroke}
                strokeLinecap="round"
                strokeDasharray={`${seg.dash} ${seg.gapLen}`}
                strokeDashoffset={-seg.offset}
                className={styles.segment}
                onMouseEnter={() => setHovered(seg.id)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </g>
        </svg>
        <div className={styles.center}>
          <div className={styles.centerValue}>{formatCurrency(active ? active.amount : centerValue)}</div>
          <div className={styles.centerLabel}>{active ? active.label : centerLabel}</div>
        </div>
      </div>

      <ul className={styles.legend}>
        {segments.map((seg) => (
          <li
            key={seg.id}
            className={`${styles.row} ${hovered && hovered !== seg.id ? styles.dim : ''}`}
            onMouseEnter={() => setHovered(seg.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.swatch} style={{ background: seg.color }} />
            <span className={styles.label}>{seg.label}</span>
            <span className={styles.pct}>{Math.round(seg.pct * 100)}%</span>
            <span className={styles.amount}>{formatCurrency(seg.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
