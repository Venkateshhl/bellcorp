import { uid } from '../utils/helpers'

const USERS_KEY = 'bellcorp_users'
export const SESSION_KEY = 'bellcorp_session'

export const authService = {
  getUsers: () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
  },

  saveUsers: (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users)),

  getSession: () => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
  },

  login: (email, password) => {
    const users = authService.getUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) return { error: 'Invalid email or password' }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return { user }
  },

  register: (name, email, password) => {
    const users = authService.getUsers()
    if (users.find((u) => u.email === email)) return { error: 'Email already registered' }
    const user = { id: uid(), name, email, password }
    authService.saveUsers([...users, user])
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return { user }
  },

  logout: () => localStorage.removeItem(SESSION_KEY),
}
