export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="modal" style={{ maxWidth: 360, padding: 28 }}>
        <p style={{ fontSize: 15, marginBottom: 20, lineHeight: 1.6, textAlign: 'center', color: 'var(--text)' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
