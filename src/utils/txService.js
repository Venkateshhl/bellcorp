import { uid } from '../utils/helpers'
import { SAMPLE_TRANSACTIONS } from '../utils/constants'

const txKey = (userId) => `bellcorp_tx_${userId}`

export const txService = {
  getAll: (userId) => {
    try {
      const stored = JSON.parse(localStorage.getItem(txKey(userId)) || 'null')
      if (stored) return stored
      if (userId === 'demo') return SAMPLE_TRANSACTIONS
      return []
    } catch { return [] }
  },

  save: (userId, txs) => localStorage.setItem(txKey(userId), JSON.stringify(txs)),

  add: (userId, tx) => {
    const txs = txService.getAll(userId)
    const newTx = { ...tx, id: uid(), userId }
    const updated = [newTx, ...txs]
    txService.save(userId, updated)
    return updated
  },

  update: (userId, updated) => {
    const txs = txService.getAll(userId).map((t) => (t.id === updated.id ? updated : t))
    txService.save(userId, txs)
    return txs
  },

  delete: (userId, id) => {
    const txs = txService.getAll(userId).filter((t) => t.id !== id)
    txService.save(userId, txs)
    return txs
  },
}
