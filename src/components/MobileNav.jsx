import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'explorer', label: 'Explorer', icon: '◫' },
]

export default function MobileNav({ page, setPage }) {
  const { logout } = useAuth()

  return (
    <div className="mobile-nav">
      {NAV_ITEMS.map((n) => (
        <button key={n.id} onClick={() => setPage(n.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: page === n.id ? 'var(--accent)' : 'var(--muted)', fontSize: 12, fontFamily: 'Instrument Sans', fontWeight: 600 }}>
          <span style={{ fontSize: 22 }}>{n.icon}</span>
          {n.label}
        </button>
      ))}
      <button onClick={logout}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--muted)', fontSize: 12, fontFamily: 'Instrument Sans', fontWeight: 600 }}>
        <span style={{ fontSize: 22 }}>↪</span>
        Out
      </button>
    </div>
  )
}
