import { useTransactions } from '../context/TransactionContext'
import { useAuth } from '../context/AuthContext'
import { fmt, fmtDate } from '../utils/helpers'
import { CATEGORIES, getCat } from '../utils/constants'

function SummaryCard({ label, value, sub, accent, icon }) {
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, opacity: 0.15 }}>{icon}</div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <p className="mono" style={{ fontSize: 26, fontWeight: 500, color: accent || 'var(--text)', letterSpacing: -1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{sub}</p>}
    </div>
  )
}

function CategoryBreakdown({ transactions }) {
  const expenses = transactions.filter((t) => t.amount < 0)
  const totalExp = expenses.reduce((s, t) => s + Math.abs(t.amount), 0)

  const grouped = CATEGORIES.filter((c) => c.id !== 'Income')
    .map((cat) => ({
      ...cat,
      total: expenses.filter((t) => t.category === cat.id).reduce((s, t) => s + Math.abs(t.amount), 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)

  if (!grouped.length) {
    return <div className="card" style={{ color: 'var(--muted)', fontSize: 14 }}>No expense data yet.</div>
  }

  // Donut
  const r = 60, cx = 80, cy = 80, circ = 2 * Math.PI * r
  let acc = 0
  const segments = grouped.map((c) => {
    const pct = totalExp ? c.total / totalExp : 0
    const dash = pct * circ
    const gap = circ - dash
    const offset = -acc * circ
    acc += pct
    return { ...c, dash, gap, offset }
  })

  return (
    <div className="card">
      <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Spending by Category</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <svg width={160} height={160} viewBox="0 0 160 160">
          {segments.map((s) => (
            <circle key={s.id} cx={cx} cy={cy} r={r}
              fill="none" stroke={s.color} strokeWidth={18}
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={s.offset}
              style={{ transition: 'stroke-dashoffset 0.8s' }}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r={44} fill="var(--surface)" />
          <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--muted)" fontSize={10} fontFamily="DM Mono">total</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text)" fontSize={11} fontFamily="DM Mono" fontWeight="500">{fmt(totalExp)}</text>
        </svg>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
          {grouped.slice(0, 6).map((c) => (
            <div key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>{c.icon} {c.id}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{fmt(c.total)}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${totalExp ? (c.total / totalExp) * 100 : 0}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onAdd }) {
  const { user } = useAuth()
  const { transactions } = useTransactions()

  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
  const balance = totalIncome - totalExpense
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

  return (
    <div className="fade-in" style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 className="syne" style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
            Good {greeting},<br />
            <span style={{ color: 'var(--accent)' }}>{user?.name?.split(' ')[0]}</span>.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <SummaryCard label="Net Balance" value={fmt(balance)} accent={balance >= 0 ? 'var(--income)' : 'var(--expense)'} icon="◈" sub={`${transactions.length} transactions`} />
        <SummaryCard label="Total Income" value={fmt(totalIncome)} accent="var(--income)" icon="↓" />
        <SummaryCard label="Total Expenses" value={fmt(totalExpense)} accent="var(--expense)" icon="↑" />
        <SummaryCard label="Savings Rate" value={totalIncome ? `${((1 - totalExpense / totalIncome) * 100).toFixed(1)}%` : '—'} icon="◎" sub="of income saved" />
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: 24 }}>
        <CategoryBreakdown transactions={transactions} />
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h3>
        {recent.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>No transactions yet. Add one to get started!</p>
        ) : (
          recent.map((t) => {
            const cat = getCat(t.category)
            return (
              <div key={t.id} className="tx-row">
                <div className="tx-icon" style={{ background: cat.color + '22' }}>{cat.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{t.category} · {fmtDate(t.date)}</p>
                </div>
                <span className="mono" style={{ fontSize: 15, fontWeight: 500, color: t.amount < 0 ? 'var(--expense)' : 'var(--income)' }}>
                  {t.amount < 0 ? '-' : '+'}{fmt(Math.abs(t.amount))}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
