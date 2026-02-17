import { useState } from 'react'
import { authService } from '../utils/authService'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const { login, demoLogin } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setError('')
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 600))
    const result =
      mode === 'login'
        ? authService.login(form.email, form.password)
        : authService.register(form.name, form.email, form.password)
    if (result.error) { setError(result.error); setLoading(false) }
    else login(result.user)
  }

  const handleDemo = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    demoLogin()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 1 }}>
      <div className="slide-up" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
            ◈
          </div>
          <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>Bellcorp</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Personal Finance Tracker</p>
        </div>

        {/* Mode Tabs */}
        <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['login', 'register'].map((m) => (
            <button key={m} className={`tab ${mode === m ? 'active' : ''}`} style={{ flex: 1, textTransform: 'capitalize' }}
              onClick={() => { setMode(m); setError('') }}>
              {m}
            </button>
          ))}
        </div>

        <div className="card" style={{ borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Full Name</label>
              <input placeholder="Alex Johnson" value={form.name} onChange={set('name')} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: 13, background: 'rgba(255,95,109,0.08)', padding: '8px 12px', borderRadius: 8 }}>
              {error}
            </p>
          )}

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4, height: 44 }}
            onClick={submit} disabled={loading}>
            {loading
              ? <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>◌</span>
              : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            or
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={handleDemo}>
            Try Demo Account
          </button>
        </div>
      </div>
    </div>
  )
}
