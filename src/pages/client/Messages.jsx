import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import MessageThread from '../../components/MessageThread'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { useProject } from '../../hooks/useProject'
import styles from './Messages.module.css'

export default function Messages() {
  const { loading, client, messages } = useProject()
  const [thread, setThread] = useState([])
  const [draft, setDraft] = useState('')

  // Seed the local thread once data arrives.
  useEffect(() => {
    if (messages) setThread(messages)
  }, [messages])

  if (loading) {
    return (
      <div className="view">
        <Loader label="Loading your messages" />
      </div>
    )
  }

  const send = (e) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    // Optimistic append. With Supabase this also inserts into `messages`.
    setThread((prev) => [
      ...prev,
      { who: client.fullName, avatar: client.firstName?.charAt(0), text: body, time: 'Just now' },
    ])
    setDraft('')
  }

  return (
    <div className="view">
      <PageHeader eyebrow="Always here" heading={<>Your <em>messages</em></>} />
      <Panel title="Conversation">
        <MessageThread messages={thread} />
        <form className={styles.composer} onSubmit={send}>
          <input
            className={styles.input}
            placeholder="Message your project coordinator, Priya…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Write a message"
          />
          <Button as="button" type="submit" disabled={!draft.trim()}>
            Send
          </Button>
        </form>
      </Panel>
    </div>
  )
}
