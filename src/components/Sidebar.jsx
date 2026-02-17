import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'explorer', label: 'Explorer', icon: '◫' },
]

export default function Sidebar({ page, setPage }) {
  const { user, logout } = useAuth()

  return (
    <div className="sidebar">
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingLeft: 4 }}>
        <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          ◈
        </div>
        <span className="syne" style={{ fontSize: 16, fontWeight: 800 }}>Bellcorp</span>
      </div>

      {/* Nav Links */}
      {NAV_ITEMS.map((n) => (
        <button key={n.id} className={`nav-link ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
          <span style={{ fontSize: 16 }}>{n.icon}</span>
          {n.label}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* User + Logout */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
            <p style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
          </div>
        </div>
        <button className="nav-link" onClick={logout}>
          <span>↪</span> Sign Out
        </button>
      </div>
    </div>
  )
}
