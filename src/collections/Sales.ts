import { isAdminOrSuperAdmin } from '@/access/roleBasedAccess'
import { CollectionConfig } from 'payload'

export const Sales: CollectionConfig<'sales'> = {
  slug: 'sales',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: () => true,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'from',
      label: 'Starts',
      type: 'date',
      required: true,
    },
    {
      name: 'to',
      label: 'Ends',
      type: 'date',
      required: true,
    },
    {
      name: 'percentage',
      label: 'Percentage (%)',
      type: 'number',
      required: true,
    },
  ],
}
