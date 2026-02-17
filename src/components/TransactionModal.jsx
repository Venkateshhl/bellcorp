import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'

export default function TransactionModal({ tx, onSave, onClose }) {
  const isEdit = !!tx?.id
  const [form, setForm] = useState({
    title: tx?.title || '',
    amount: tx ? Math.abs(tx.amount).toString() : '',
    category: tx?.category || 'Food',
    type: tx ? (tx.amount < 0 ? 'expense' : 'income') : 'expense',
    date: tx?.date || new Date().toISOString().split('T')[0],
    notes: tx?.notes || '',
  })
  const [error, setError] = useState('')

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setError('')
  }

  const save = () => {
    if (!form.title.trim()) return setError('Title is required')
    if (!form.amount || isNaN(Number(form.amount))) return setError('Valid amount is required')
    const amount = form.type === 'expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount))
    onSave({ ...tx, title: form.title.trim(), amount, category: form.category, date: form.date, notes: form.notes })
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal slide-up" style={{ padding: 28 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700 }}>
            {isEdit ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* Type Toggle */}
        <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 10, padding: 4, marginBottom: 20 }}>
          {['expense', 'income'].map((t) => (
            <button key={t} onClick={() => setForm((f) => ({ ...f, type: t }))}
              style={{
                flex: 1, padding: '8px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: 13,
                background: form.type === t ? (t === 'expense' ? 'var(--expense)' : 'var(--income)') : 'transparent',
                color: form.type === t ? (t === 'expense' ? '#fff' : '#040709') : 'var(--muted)',
                transition: 'all 0.2s',
              }}>
              {t === 'expense' ? '↑ Expense' : '↓ Income'}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Title</label>
            <input placeholder="e.g. Grocery Shopping" value={form.title} onChange={set('title')} />
          </div>

          <div className="grid2">
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Amount (₹ INR)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" value={form.amount} onChange={set('amount')} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Date</label>
              <input type="date" value={form.date} onChange={set('date')} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Category</label>
            <select value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c.id}>{c.id}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Notes (optional)</label>
            <textarea rows={2} placeholder="Any additional details..." value={form.notes} onChange={set('notes')} style={{ resize: 'none' }} />
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={save}>
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
