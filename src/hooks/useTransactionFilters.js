import { useState, useMemo, useEffect } from 'react'

const PAGE_SIZE = 10

export function useTransactionFilters(transactions, savedState = {}, onSaveState) {
  const [search, setSearch] = useState(savedState.search || '')
  const [category, setCategory] = useState(savedState.category || 'All')
  const [dateFrom, setDateFrom] = useState(savedState.dateFrom || '')
  const [dateTo, setDateTo] = useState(savedState.dateTo || '')
  const [type, setType] = useState(savedState.type || 'All')
  const [page, setPage] = useState(savedState.page || 1)

  // Persist filter state
  useEffect(() => {
    if (onSaveState) onSaveState({ search, category, dateFrom, dateTo, type, page })
  }, [search, category, dateFrom, dateTo, type, page])

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchSearch =
          !search ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          (t.notes && t.notes.toLowerCase().includes(search.toLowerCase()))
        const matchCat = category === 'All' || t.category === category
        const matchType =
          type === 'All' || (type === 'Income' ? t.amount > 0 : t.amount < 0)
        const matchFrom = !dateFrom || t.date >= dateFrom
        const matchTo = !dateTo || t.date <= dateTo
        return matchSearch && matchCat && matchType && matchFrom && matchTo
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, search, category, type, dateFrom, dateTo])

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length
  const loadMore = () => setPage((p) => p + 1)

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
    setDateFrom('')
    setDateTo('')
    setType('All')
    setPage(1)
  }

  return {
    search, setSearch,
    category, setCategory,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    type, setType,
    page, setPage,
    filtered, paginated, hasMore, loadMore, resetFilters,
  }
}
