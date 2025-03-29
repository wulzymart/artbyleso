import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { CartStoreProvider } from '@/context/CartProvider'
import { AuthProvider } from '@/context/authContext'
import { SalesProvider } from '@/context/sales_checker'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SalesProvider>
          <CartStoreProvider>
            <HeaderThemeProvider>{children}</HeaderThemeProvider>
          </CartStoreProvider>
        </SalesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
