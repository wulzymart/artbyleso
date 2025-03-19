import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { CartStoreProvider } from '@/context/CartProvider'
import { AuthProvider } from '@/context/authContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartStoreProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </CartStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
