// src/types/index.ts

export type UserRole = 'super-admin' | 'admin' | 'customer'

export interface BaseUser {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface AdminUser extends BaseUser {
  role: 'super-admin' | 'admin'
  firstName: string
  lastName: string
}

export interface CustomerUser extends BaseUser {
  role: 'customer'
  firstName: string
  lastName: string
  isDeleted: boolean
  cart?: string // Reference to Cart collection
}

export interface Cart {
  id: string
  customer: string // Reference to Customer
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  product: string // Reference to Product
  quantity: number
  price: number
}
