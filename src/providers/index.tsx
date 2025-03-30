import React from 'react'

import { CartStoreProvider } from '@/context/CartProvider'
import { AuthProvider } from '@/context/authContext'
import { SalesProvider } from '@/context/sales_checker'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <SalesProvider>
        <CartStoreProvider>{children}</CartStoreProvider>
      </SalesProvider>
    </AuthProvider>
  )
}
