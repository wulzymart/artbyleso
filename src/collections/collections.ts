import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/access/is-admin'
import { isAdminOrSuperAdmin } from '@/access/roleBasedAccess'

export const Collections: CollectionConfig = {
  slug: 'collections',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: anyone,
    update: isAdminOrSuperAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    description: true,
    featuredImage: true,
    artworks: true,
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
    {
      label: 'Artworks',
      name: 'artworks',
      type: 'join',
      collection: 'artworks',
      on: 'collection',
      virtual: true,
    },
    ...slugField(),
  ],
}
