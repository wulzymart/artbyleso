import { isAdminOrSelf } from '@/access/roleBasedAccess'
import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'transactionId',
  },
  access: {
    read: isAdminOrSelf,
    update: () => false,
    delete: () => false,
    create: () => false,
  },
  fields: [
    {
      name: 'transactionId',
      type: 'text',
      required: true,
    },
    {
      name: 'transactionRef',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
    },
  ],
}
