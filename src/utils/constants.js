export const CATEGORIES = [
  { id: 'Food', icon: '🍔', color: '#f7c35f' },
  { id: 'Transport', icon: '🚗', color: '#00e5b0' },
  { id: 'Rent', icon: '🏠', color: '#7c6bff' },
  { id: 'Shopping', icon: '🛍️', color: '#ff7eb3' },
  { id: 'Health', icon: '💊', color: '#56cfb2' },
  { id: 'Entertainment', icon: '🎬', color: '#ff9060' },
  { id: 'Utilities', icon: '💡', color: '#60aaff' },
  { id: 'Income', icon: '💰', color: '#00e5b0' },
  { id: 'Other', icon: '📦', color: '#a0aec0' },
]

export const getCat = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[8]

export const SAMPLE_TRANSACTIONS = [
  { id: 't1', userId: 'demo', title: 'Grocery Shopping', amount: -2400, category: 'Food', date: '2024-01-20', notes: 'Weekly haul' },
  { id: 't2', userId: 'demo', title: 'Monthly Salary', amount: 85000, category: 'Income', date: '2024-01-01', notes: '' },
  { id: 't3', userId: 'demo', title: 'Ola Ride', amount: -320, category: 'Transport', date: '2024-01-19', notes: 'Office commute' },
  { id: 't4', userId: 'demo', title: 'Netflix', amount: -649, category: 'Entertainment', date: '2024-01-18', notes: '' },
  { id: 't5', userId: 'demo', title: 'Electricity Bill', amount: -1850, category: 'Utilities', date: '2024-01-17', notes: 'January bill' },
  { id: 't6', userId: 'demo', title: 'Apartment Rent', amount: -22000, category: 'Rent', date: '2024-01-01', notes: '' },
  { id: 't7', userId: 'demo', title: 'Doctor Visit', amount: -800, category: 'Health', date: '2024-01-15', notes: 'Annual checkup' },
  { id: 't8', userId: 'demo', title: 'Myntra Jacket', amount: -2499, category: 'Shopping', date: '2024-01-14', notes: '' },
  { id: 't9', userId: 'demo', title: 'Lunch Out', amount: -540, category: 'Food', date: '2024-01-13', notes: 'Biryani place' },
  { id: 't10', userId: 'demo', title: 'Freelance Project', amount: 15000, category: 'Income', date: '2024-01-10', notes: 'Logo design' },
  { id: 't11', userId: 'demo', title: 'Metro Pass', amount: -600, category: 'Transport', date: '2024-01-10', notes: '' },
  { id: 't12', userId: 'demo', title: 'Pharmacy', amount: -480, category: 'Health', date: '2024-01-08', notes: '' },
]
