'use client'
import { useState, useEffect, createContext, useContext, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Customer } from '@/payload-types'
import { toast } from 'sonner'
import { getCurrentCustomer, loginCustomer, logoutCustomer } from '@/context/helper/actions/login'
import { set } from 'zod'

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
      const user = await getCurrentCustomer()
      if (!user) {
        setUser(null)
        setIsAuthenticated(false)
        setLoading(false)
        return
      }
      setUser(user)
      setIsAuthenticated(true)
      setLoading(false)
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
    startTransition(async () => {
      try {
        const user = await loginCustomer({ email, password })
        setUser(user)
        setIsAuthenticated(true)
        toast.success('Logged in successfully')
        router.push('/')
      } catch (err: any) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    })
  }

  // Logout function
  const logout = async () => {
    startTransition(async () => {
      await logoutCustomer()
      toast.success('Logged out successfully')
      setUser(null)
      setIsAuthenticated(false)
      router.push('/')
    })
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
