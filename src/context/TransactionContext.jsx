import { createContext, useContext, useState, useEffect } from 'react'
import { txService } from '../utils/txService'
import { useAuth } from './AuthContext'

const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (user) setTransactions(txService.getAll(user.id))
    else setTransactions([])
  }, [user])

  const addTransaction = (txData) => {
    if (!user) return
    const updated = txService.add(user.id, txData)
    setTransactions(updated)
  }

  const updateTransaction = (tx) => {
    if (!user) return
    const updated = txService.update(user.id, tx)
    setTransactions(updated)
  }

  const deleteTransaction = (id) => {
    if (!user) return
    const updated = txService.delete(user.id, id)
    setTransactions(updated)
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionContext)
