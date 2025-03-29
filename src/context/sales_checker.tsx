'use client'
import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import { getOngoingSales } from './helper/actions/check_sales'

interface useSalesReturn {
  salesPercentage?: number
}

const SalesContext = createContext<useSalesReturn | undefined>(undefined)
export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [salesPercentage, setSalesPercentage] = useState<number | undefined>(undefined)
  useEffect(() => {
    startTransition(async () => {
      const res = await getOngoingSales()
      if (res) {
        setSalesPercentage(res)
      }
    })
  }, [])
  return <SalesContext.Provider value={{ salesPercentage }}>{children}</SalesContext.Provider>
}

export function useSales() {
  const context = useContext(SalesContext)
  if (context === undefined) {
    throw new Error('useSales must be used within a SalesProvider')
  }
  return context
}
