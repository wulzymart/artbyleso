import { isAdminOrSelf } from '@/access/roleBasedAccess'
import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  access: {
    read: isAdminOrSelf,
    update: () => false,
    delete: () => false,
    create: () => false,
  },
  fields: [
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
    {
      name: 'gateway',
      type: 'select',
      required: true,
      options: [
        { label: 'Paystack', value: 'paystack' },
        { label: 'Flutterwave', value: 'flutterwave' },
      ],
    },
    {
      name: 'paystackInfo',
      type: 'group',
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.gateway === 'paystack'
        },
      },
      fields: [
        {
          name: 'message',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          type: 'text',
          required: true,
        },
        {
          name: 'reference',
          type: 'text',
          required: true,
        },
        {
          name: 'trans',
          type: 'text',
        },
        {
          name: 'redirecturl',
          type: 'text',
        },
        {
          name: 'transaction',
          type: 'text',
        },
        {
          name: 'trxref',
          type: 'text',
        },
      ],
    },
    // {
    //   name: 'flutterwaveInfo',
    // },

    {
      name: 'amount',
      type: 'number',
      required: true,
    },
  ],
}
