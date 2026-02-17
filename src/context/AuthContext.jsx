import { createContext, useContext, useState } from 'react'
import { authService, SESSION_KEY } from '../utils/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getSession())

  const login = (u) => setUser(u)

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const demoLogin = async () => {
    const demoUser = { id: 'demo', name: 'Alex Demo', email: 'demo@bellcorp.io' }
    localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
