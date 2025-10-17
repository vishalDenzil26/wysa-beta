import type { ClientUser, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { hero } from '@/heros/config'
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
import { latestArticle } from '@/articles/RenderLatestArticle/config'
import { getServerSideURL } from '@/utilities/getURL'

export const Resources: CollectionConfig = {
  slug: 'resources',
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
          collection: 'resources',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'resources',
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
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          label: 'Latest article',
          fields: latestArticle,
        },
        {
          fields: [
            {
              type: 'text',
              name: 'listingLabel',
              required: true,
            },
            {
              type: 'array',
              name: 'listingByPage',
              admin: {
                condition: (data) => {
                  if (data.slug === 'resources') {
                    return true
                  }
                  return false
                },
              },
              fields: [
                {
                  type: 'select',
                  name: 'resourceCollectionType',
                  required: true,
                  options: [
                    {
                      label: 'News',
                      value: 'news',
                    },
                    {
                      label: 'Reports',
                      value: 'reports',
                    },
                    {
                      label: 'Videos',
                      value: 'videos',
                    },
                  ],
                },
              ],
            },
            {
              type: 'array',
              name: 'listingByCategory',
              admin: {
                condition: (data) => {
                  if (data.slug !== 'resources') {
                    return true
                  }
                  return false
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'relationship',
                      name: 'Category',
                      relationTo: 'categories',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              type: 'radio',
              name: 'showViewAll',
              defaultValue: 'no',
              options: [
                {
                  label: 'Yes',
                  value: 'yes',
                },
                {
                  label: 'No',
                  value: 'no',
                },
              ],
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
    createParentField('resources', {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
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
