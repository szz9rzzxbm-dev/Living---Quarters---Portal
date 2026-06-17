import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Brand from '../components/Brand'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <Brand sub="Client Portal" size="md" />
        </div>
        <div className="eyebrow">Error 404</div>
        <h1 style={{ fontSize: '2.6rem', marginBottom: '0.8rem' }}>
          This page <em style={{ fontStyle: 'italic', color: 'var(--brass-soft)' }}>moved</em>
        </h1>
        <p className="muted" style={{ marginBottom: '1.6rem' }}>The page you were looking for isn't here.</p>
        <Button as={Link} to="/portal">
          Back to your portal
        </Button>
      </div>
    </div>
  )
}
