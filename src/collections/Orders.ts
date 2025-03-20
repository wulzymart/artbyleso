// src/payload/collections/Carts.ts

import { CollectionConfig } from 'payload'
import { isAdminOrSelf } from '@/access/roleBasedAccess'

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'customer', 'updatedAt'],
    group: 'Commerce',
  },
  access: {
    admin: () => false,
    // Only the customer who owns the cart or admins can read it
    read: ({ req, data }) => {
      if (!req.user) return false

      if (['super-admin', 'admin'].includes(req.user.role)) return true

      return req.user.role === 'customer' && data?.customer === req.user.id
    },
    // Only the customer who owns the cart can update it
    update: ({ req, data }) => {
      if (!req.user) return false

      if (['super-admin', 'admin'].includes(req.user.role)) return true

      return req.user.role === 'customer' && data?.customer === req.user.id
    },
    // Only admins can delete carts
    delete: isAdminOrSelf,
    // Cart creation is handled internally
    create: ({ req }) => {
      return false
    },
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      hasMany: false,
    },
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'artwork',
          type: 'relationship',
          relationTo: 'artworks',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Paid', value: 'paid' },
        {
          label: 'Pending',
          value: 'pending',
        },
      ],
    },
    {
      name: 'shipping',
      type: 'relationship',
      required: true,
      relationTo: 'shipments',
      hasMany: false,
    },
    {
      name: 'paymentInfo',
      type: 'relationship',
      relationTo: 'payments',
      hasMany: false,
    },
  ],
}

export default Orders
