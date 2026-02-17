import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { TransactionProvider } from './context/TransactionContext'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Explorer from './pages/Explorer'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import TransactionModal from './components/TransactionModal'
import { useTransactions } from './context/TransactionContext'
import GetAppButton from './components/GetAppButton'

/* ── Protected App Shell ── */
function AppShell() {
  const { user } = useAuth()
  const { addTransaction } = useTransactions()
  const [page, setPage] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)
  const [explorerState, setExplorerState] = useState({})

  if (!user) return <AuthPage />

  return (
    <>
      {/* Backgrounds */}
      <div className="noise" />
      <div className="glow-teal" />
      <div className="glow-gold" />

      <div style={{ display: 'flex', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Sidebar page={page} setPage={setPage} />

        <main className="main-content" style={{ paddingBottom: 80 }}>
          {page === 'dashboard' && (
            <Dashboard onAdd={() => setShowModal(true)} />
          )}
          {page === 'explorer' && (
            <Explorer
              onAdd={() => setShowModal(true)}
              savedState={explorerState}
              onSaveState={setExplorerState}
            />
          )}
        </main>

        <MobileNav page={page} setPage={setPage} />
      </div>

      {showModal && (
        <TransactionModal
          onSave={(tx) => { addTransaction(tx); setShowModal(false) }}
          onClose={() => setShowModal(false)}
        />
      )}
      <GetAppButton />
    </>
  )
}

/* ── Root: Wrap with Providers ── */
export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppShell />
      </TransactionProvider>
    </AuthProvider>
  )
}
