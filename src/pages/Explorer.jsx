import { useState } from 'react'
import { useTransactions } from '../context/TransactionContext'
import { useTransactionFilters } from '../hooks/useTransactionFilters'
import { fmt, fmtDate } from '../utils/helpers'
import { CATEGORIES, getCat } from '../utils/constants'
import TransactionModal from '../components/TransactionModal'
import ConfirmDialog from '../components/ConfirmDialog'

/* ── Transaction Detail View ── */
function TxDetail({ tx, onBack, onEdit, onDelete }) {
  const cat = getCat(tx.category)
  return (
    <div className="fade-in" style={{ maxWidth: 500 }}>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }} onClick={onBack}>← Back</button>
      <div className="card" style={{ borderRadius: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: cat.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
            {cat.icon}
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Syne' }}>{tx.title}</p>
            <span className="tag" style={{ background: cat.color + '22', color: cat.color, marginTop: 4 }}>{tx.category}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <DetailRow label="Amount">
            <span className="mono" style={{ fontSize: 22, color: tx.amount < 0 ? 'var(--expense)' : 'var(--income)' }}>
              {tx.amount < 0 ? '-' : '+'}{fmt(Math.abs(tx.amount))}
            </span>
          </DetailRow>
          <DetailRow label="Date">{fmtDate(tx.date)}</DetailRow>
          {tx.notes && <DetailRow label="Notes">{tx.notes}</DetailRow>}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onEdit}>✎ Edit</button>
          <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={onDelete}>✕ Delete</button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{children}</span>
    </div>
  )
}

/* ── Explorer Page ── */
export default function Explorer({ onAdd, savedState, onSaveState }) {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions()
  const [selectedId, setSelectedId] = useState(null)
  const [editTx, setEditTx] = useState(null)
  const [deleteTx, setDeleteTx] = useState(null)

  const filters = useTransactionFilters(transactions, savedState, onSaveState)

  // ── Detail View ──
  if (selectedId) {
    const tx = transactions.find((t) => t.id === selectedId)
    if (!tx) { setSelectedId(null); return null }
    return (
      <>
        <TxDetail
          tx={tx}
          onBack={() => setSelectedId(null)}
          onEdit={() => { setEditTx(tx); setSelectedId(null) }}
          onDelete={() => { setDeleteTx(tx); setSelectedId(null) }}
        />
        {editTx && (
          <TransactionModal tx={editTx}
            onSave={(t) => { updateTransaction(t); setEditTx(null) }}
            onClose={() => setEditTx(null)} />
        )}
        {deleteTx && (
          <ConfirmDialog
            message={`Delete "${deleteTx.title}"?`}
            onConfirm={() => { deleteTransaction(deleteTx.id); setDeleteTx(null) }}
            onCancel={() => setDeleteTx(null)} />
        )}
      </>
    )
  }

  return (
    <div className="fade-in" style={{ maxWidth: 800 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <h2 className="syne" style={{ fontSize: 22, fontWeight: 800 }}>Transaction Explorer</h2>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add</button>
      </div>

      {/* Search */}
      <div className="search-wrap" style={{ marginBottom: 16 }}>
        <span className="search-icon">⌕</span>
        <input placeholder="Search transactions…" value={filters.search}
          onChange={(e) => { filters.setSearch(e.target.value); filters.setPage(1) }} />
      </div>

      {/* Type chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {['All', 'Income', 'Expense'].map((t) => (
          <button key={t} className={`chip ${filters.type === t ? 'active' : ''}`}
            onClick={() => { filters.setType(t); filters.setPage(1) }}>
            {t}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {['All', ...CATEGORIES.map((c) => c.id)].map((c) => (
          <button key={c} className={`chip ${filters.category === c ? 'active' : ''}`}
            onClick={() => { filters.setCategory(c); filters.setPage(1) }}>
            {c === 'All' ? 'All Categories' : `${getCat(c).icon} ${c}`}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>From</span>
          <input type="date" value={filters.dateFrom} onChange={(e) => { filters.setDateFrom(e.target.value); filters.setPage(1) }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>To</span>
          <input type="date" value={filters.dateTo} onChange={(e) => { filters.setDateTo(e.target.value); filters.setPage(1) }} />
        </div>
        {(filters.search || filters.category !== 'All' || filters.dateFrom || filters.dateTo || filters.type !== 'All') && (
          <button className="btn btn-ghost btn-sm" onClick={filters.resetFilters}>Clear All</button>
        )}
      </div>

      {/* Count */}
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        Showing {filters.paginated.length} of {filters.filtered.length} transaction{filters.filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Transaction List */}
      <div className="card" style={{ padding: 8 }}>
        {filters.paginated.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>◎</div>
            <p>No transactions found.</p>
          </div>
        ) : (
          filters.paginated.map((t) => {
            const cat = getCat(t.category)
            return (
              <div key={t.id} className="tx-row" onClick={() => setSelectedId(t.id)}>
                <div className="tx-icon" style={{ background: cat.color + '22' }}>{cat.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{t.category} · {fmtDate(t.date)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 500, color: t.amount < 0 ? 'var(--expense)' : 'var(--income)' }}>
                    {t.amount < 0 ? '-' : '+'}{fmt(Math.abs(t.amount))}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}
                      onClick={(e) => { e.stopPropagation(); setEditTx(t) }}>✎</button>
                    <button className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }}
                      onClick={(e) => { e.stopPropagation(); setDeleteTx(t) }}>✕</button>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Load More */}
        {filters.hasMore && (
          <div style={{ textAlign: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <button className="btn btn-ghost" onClick={filters.loadMore}>
              Load More ({filters.filtered.length - filters.paginated.length} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {editTx && (
        <TransactionModal tx={editTx}
          onSave={(t) => { updateTransaction(t); setEditTx(null) }}
          onClose={() => setEditTx(null)} />
      )}
      {deleteTx && (
        <ConfirmDialog
          message={`Delete "${deleteTx.title}"? This cannot be undone.`}
          onConfirm={() => { deleteTransaction(deleteTx.id); setDeleteTx(null) }}
          onCancel={() => setDeleteTx(null)} />
      )}
    </div>
  )
}
