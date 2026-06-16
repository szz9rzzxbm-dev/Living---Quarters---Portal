import styles from './MessageThread.module.css'

/**
 * Read-only message thread. messages: [{ who, avatar, text, time }].
 * Avatar falls back to the first letter of the sender's name.
 */
export default function MessageThread({ messages = [] }) {
  return (
    <div>
      {messages.map((m, i) => (
        <div key={i} className={styles.msg}>
          <div className={styles.av}>{m.avatar || m.who?.charAt(0)}</div>
          <div className={styles.body}>
            <div className={styles.who}>{m.who}</div>
            <div className={styles.txt}>{m.text}</div>
            <div className={styles.tm}>{m.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
