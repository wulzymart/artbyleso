'use client'
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Customer } from '@/payload-types'
import { toast } from 'sonner'

interface UseAuthReturn {
  user: Customer | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, collection?: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  checkAuth: () => Promise<void>
}
const AuthContext = createContext<UseAuthReturn | undefined>(undefined)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Function to check authentication status
  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/customers/me', {
        credentials: 'include', // Important for cookies
      })

      if (!response.ok) {
        setUser(null)
        setIsAuthenticated(false)
        return
      }

      const data = await response.json()
      setUser(data.user)
      setIsAuthenticated(true)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (email: string, password: string, collection: string = 'customers') => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      setUser(data.user)
      setIsAuthenticated(true)
      router.push('/account')
      toast.success(`welcome back ${data.user.firstName}`)
    } catch (err) {
      toast.error('Failed to login')
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setLoading(true)
      await fetch('/api/customer/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      setIsAuthenticated(false)
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
