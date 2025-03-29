import { isAdminOrSuperAdmin } from '@/access/roleBasedAccess'
import { CollectionConfig, GlobalConfig } from 'payload'

export const Sales: GlobalConfig = {
  slug: 'sales',
  access: {
    read: () => true,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'percentage',
      label: 'Percentage (%)',
      type: 'number',
      defaultValue: 0,
      required: false,
    },
  ],
}
