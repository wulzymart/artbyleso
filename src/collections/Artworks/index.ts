import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
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
    images: { image: true, id: true },
    price: true,
    availableInPrint: true,
    printPrice: true,
    mainDiscount: true,
    mainDiscountPrice: true,
    printDiscount: true,
    printDiscountPrice: true,
    publishedAt: true,
    meta: {
      image: true,
      description: true,
    },
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
      name: 'collection',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'collections',
      hasMany: false,
    },
    {
      name: 'salesStatus',
      type: 'select',
      defaultValue: 'available',
      label: 'Sales Status',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Sold Out',
          value: 'soldOut',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      defaultValue: '0',
      label: 'Price (NGN)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'availableInPrint',
      label: 'Available in Print',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'printPrice',
      label: 'Print Price (NGN)',
      type: 'number',
      defaultValue: '0',
      admin: {
        condition: (_, siblingData) => siblingData.availableInPrint === true,
        position: 'sidebar',
      },
    },
    {
      name: 'mainDiscount',
      label: 'Main Discount',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mainDiscountPrice',
      label: 'Main Discount Price (NGN)',
      type: 'number',
      defaultValue: '0',
      admin: {
        condition: (_, siblingData) => siblingData.mainDiscount === true,
        position: 'sidebar',
      },
    },
    {
      name: 'printDiscount',
      label: 'Print Discount',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.availableInPrint === true,
        position: 'sidebar',
      },
    },
    {
      name: 'printDiscountPrice',
      label: 'Print Discount Price (NGN)',
      type: 'number',
      defaultValue: '0',
      admin: {
        condition: (_, siblingData) =>
          siblingData.availableInPrint === true && siblingData.printDiscount === true,
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'images',
              label: 'Images',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
              minRows: 1,
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
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
