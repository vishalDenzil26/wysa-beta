import type { ClientUser, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { DynamicGridBlock } from '@/blocks/DynamicGridBlock/config'
import { DynamicContentBlock } from '@/blocks/Content/dynamic/config'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { revalidateReportsArticle } from './hooks/revalidateReportsArticle'
import {
  createResourcesListingRelation,
  deleteResourcesListingRelation,
} from './hooks/manageResourcesListingRelation'
import { getServerSideURL } from '@/utilities/getURL'

export const Reports: CollectionConfig = {
  slug: 'reports',
  labels: {
    singular: 'Report',
    plural: 'Reports',
  },
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
          collection: 'reports',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'reports',
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
          fields: [
            {
              name: 'thumbNail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'bannerImage',
              type: 'upload',
              label: 'Banner Image',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'breadcrumbColor',
              type: 'select',
              label: 'Breadcrumb color',
              defaultValue: 'text-white',
              options: [
                {
                  label: 'Light',
                  value: 'text-white',
                },
                {
                  label: 'Primary',
                  value: 'text-primary',
                },
                {
                  label: 'Secondary',
                  value: 'text-secondary',
                },
              ],
            },
            {
              name: 'duration',
              type: 'number',
              label: 'Reading time',
              required: true,
              admin: {
                description: 'In minutes',
              },
            },
          ],
          label: 'Metadata',
        },
        {
          fields: [
            {
              name: 'abstract',
              label: 'Abstract',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                    ParagraphFeature(),
                    BlocksFeature({ blocks: [MediaBlock, DynamicContentBlock, DynamicGridBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    //Custom features
                    TextColorFeature(),
                  ]
                },
              }),
              label: 'Article body',
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          label: 'Related articles',
          fields: [
            {
              name: 'relatedArticles',
              type: 'array',
              label: 'Related articles',
              fields: [
                {
                  name: 'relatedArticle',
                  label: 'Related article',
                  type: 'relationship',
                  relationTo: 'news',
                },
              ],
            },
          ],
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
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    ...slugField(),
    createParentField('resources', {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateReportsArticle, createResourcesListingRelation],
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
