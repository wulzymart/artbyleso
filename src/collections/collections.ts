import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Collections: CollectionConfig = {
  slug: 'collections',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      label: 'Featured Image',
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ...slugField(),
  ],
}
