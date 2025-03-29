import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdminOrSuperAdmin } from '../access/roleBasedAccess'
import { slugField } from '@/fields/slug'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: anyone,
    update: isAdminOrSuperAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  defaultPopulate: {
    title: true,
    description: true,
    images: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Portfolio Images',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
}
