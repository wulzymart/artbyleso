import { Access, FieldAccess } from 'payload'
import type { User } from '@/payload-types'

// Check if user is a Super Admin
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}
// Check if user is either a Super Admin or Admin
export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['super-admin', 'admin'].includes(user.role)
}

// Check if user is a specific customer or an admin
export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (['super-admin', 'admin'].includes(user.role)) return true
  if (user.role === 'customer' && user.id === id) return true
  return false
}

// Field-level access for customer self-deletion
export const canMarkAsDeleted: FieldAccess = ({ req: { user }, id, data }) => {
  if (!user) return false
  // Admins can always update this field
  if (['super-admin', 'admin'].includes(user.role)) return true

  // Customers can only mark themselves as deleted
  if (user.role === 'customer' && user.id === id) {
    // Only allow setting to true, not back to false
    if (data?.isDeleted === true) return true
  }

  return false
}

// Admin creation access
export const canCreateAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['super-admin', 'admin'].includes(user.role)
}

// Check if the user can manage all users (Super Admin only)
export const canManageAllUsers: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin'
}

// Check if the user can manage customers (Admin or Super Admin)
export const canManageCustomers: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['super-admin', 'admin'].includes(user.role)
}

// Customers can only read and update themselves
export const customerSelfAccess: Access = ({ req: { user }, id }) => {
  if (!user) return false

  if (user.role === 'customer' && user.id === id) return true

  return false
}

export const adminSelfAccess: Access = ({ req: { user }, id }) => {
  if (!user) return false

  if (user.role === 'admin' && user.id === id) return true

  return false
}

export const superAdminSelfAccess: Access = ({ req: { user }, id }) => {
  if (!user) return false

  if (user.role === 'super-admin' && user.id === id) return true

  return false
}
