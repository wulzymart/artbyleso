import { isAdmin } from '@/access/is-admin'
import { CollectionConfig } from 'payload'

const Shipments: CollectionConfig = {
  slug: 'shipments',
  access: {
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
    },
    {
      name: 'trackingNumber',
      type: 'text',
    },
    {
      name: 'shippingProvider',
      type: 'text',
    },
    {
      name: 'shippingStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
    },
  ],
}

export default Shipments
