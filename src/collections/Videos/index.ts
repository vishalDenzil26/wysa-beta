import type { ClientUser, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import {
  createResourcesListingRelation,
  deleteResourcesListingRelation,
} from './hooks/manageResourcesListingRelation'
import { getServerSideURL } from '@/utilities/getURL'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    hidden: ({ user }: { user: ClientUser }) => {
      return !user?.roles?.includes('admin')
    },
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbNail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Video duration',
      admin: {
        description: 'In minutes',
      },
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              type: 'upload',
              name: 'sourceFile',
              required: true,
              relationTo: 'media',
            },
          ],
          label: 'Content',
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
        position: 'sidebar',
      },
    },
    ...slugField(),
    createParentField('pages', {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
  hooks: {
    afterChange: [revalidatePage, createResourcesListingRelation],
    beforeChange: [populatePublishedAt],
    afterDelete: [deleteResourcesListingRelation],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
