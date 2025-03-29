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
          name: 'version',
          label: 'Version',
          type: 'select',
          required: true,
          options: [
            { label: 'Print', value: 'Print' },
            {
              label: 'Canvas',
              value: 'Canvas',
            },
          ],
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
      name: 'shippingAddress',
      label: 'Shipping Address',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'shipping',
      type: 'relationship',
      required: false,
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
