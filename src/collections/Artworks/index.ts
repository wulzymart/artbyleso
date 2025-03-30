import type { CollectionConfig } from 'payload'

import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import { slugField } from '@/fields/slug'
import { isAdminOrSuperAdmin } from '@/access/roleBasedAccess'
import { anyone } from '@/access/anyone'

export const Artworks: CollectionConfig<'artworks'> = {
  slug: 'artworks',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: anyone,
    update: isAdminOrSuperAdmin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    collection: true,
    mainImage: true,
    additionalImages: true,
    inStock: true,
    originalPrice: true,
    discountPeriod: true,
    discountedPrice: true,
    dimensions: true,
    printVersion: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'artworks',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'artworks',
        req,
      }),
    useAsTitle: 'title',
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
    },
    {
      name: 'year',
      type: 'number',
    },
    {
      name: 'medium',
      type: 'select',
      options: [
        {
          label: 'Acrylic',
          value: 'Acrylic',
        },
        {
          label: 'Watercolor',
          value: 'Watercolor',
        },
        {
          label: 'Oil Painting',
          value: 'Oil-Painting',
        },
        {
          label: 'Mixed Media',
          value: 'Mixed-Media',
        },
        {
          label: 'Digital Art',
          value: 'Digital-Art',
        },
        {
          label: 'Other',
          value: 'Other',
        },
      ],
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        {
          name: 'height',
          type: 'number',
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          required: true,
        },
        {
          name: 'unit',
          type: 'select',
          options: ['cm', 'inches'],
          defaultValue: 'cm',
        },
      ],
    },
    {
      name: 'originalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'discountedPrice',
      type: 'number',
    },
    {
      name: 'discountPeriod',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
        },
      ],
    },
    {
      name: 'printVersion',
      type: 'group',
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'discountedPrice',
          type: 'number',
        },
      ],
    },
    {
      name: 'collection',
      type: 'relationship',
      relationTo: 'collections',
      hasMany: false,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'additionalImages',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
