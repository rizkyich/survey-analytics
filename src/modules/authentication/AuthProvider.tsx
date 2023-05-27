import { createContext, useContext, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useLocalStorage from '../../hooks/useLocalStorage'

interface AuthContextProps {
  user: any
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(() => ({ user, logout }), [user])

  useEffect(() => {
    if (!value.user) {
      navigate('/login')
    }
  }, [value.user, navigate])

  if (!value.user) {
    return <>Loading...</>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
