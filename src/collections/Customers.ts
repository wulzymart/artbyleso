// src/payload/collections/Customers.ts
import { CollectionConfig } from 'payload'
import {
  isAdminOrSuperAdmin,
  isAdminOrSelf,
  canManageCustomers,
  canMarkAsDeleted,
} from '@/access/roleBasedAccess'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { email } from 'node_modules/payload/dist/fields/validations'

const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'isDeleted', 'role', 'cart'],
    group: 'Users',
  },
  defaultPopulate: {
    email: true,
    firstName: true,
    lastName: true,
    role: true,
    cart: true,
  },
  access: {
    admin: () => false,
    // Admins can read all customers, customers can only read themselves
    read: isAdminOrSelf,
    // Admins can create customers
    create: ({ req }) => {
      // If it's a public registration, allow it
      if (!req.user) return true

      // Otherwise, only admins can create customers
      return isAdminOrSuperAdmin({ req })
    },
    // Admins can update any customer, customers can only update themselves
    update: isAdminOrSelf,
    // Only admins can truly delete customers
    delete: canManageCustomers,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    { name: 'phoneNumber', type: 'text', label: 'Phone Number' },
    { name: 'address', type: 'text', label: 'Address' },
    { name: 'city', type: 'text', label: 'City' },
    { name: 'state', type: 'text', label: 'State' },
    // {name: 'country', type: 'text', label: 'Country'},
    // {name: 'zipCode', type: 'text', label: 'Zip Code'},
    {
      name: 'isDeleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark customer as deleted (soft delete)',
      },
      access: {
        update: canMarkAsDeleted,
      },
    },
    {
      name: 'orders',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [{ label: 'Customer', value: 'customer' }],
      defaultValue: 'customer',
      access: {
        update: () => false,
      },
    },
    // Add other customer-specific fields
  ],
}

export default Customers
