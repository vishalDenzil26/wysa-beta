import type { CollectionConfig } from 'payload'
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
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { revalidateBlog } from './hooks/revalidateBlog'
import { getServerSideURL } from '@/utilities/getURL'
import { setPublisherOnFirstPublish } from './hooks/setPublisherOnFirstPublish'
import { blogUpdateAccess } from './hooks/blogUpdateAccess'
import { blogDeleteAccess } from './hooks/blogDeleteAccess'
import { blogCreateAccess } from './hooks/blogCreateAccess'
export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  access: {
    create: blogCreateAccess,
    delete: blogDeleteAccess,
    read: authenticatedOrPublished,
    update: blogUpdateAccess,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'blog',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'blog',
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
                    BlockquoteFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    StrikethroughFeature(),
                    SubscriptFeature(),
                    SuperscriptFeature(),
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
                  relationTo: 'blog',
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
      relationTo: 'blogCategories',
      hasMany: true,
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
    {
      name: 'publisher',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true,
      },
    },
    ...slugField(),
    createParentField('resources', {
      admin: {
        position: 'sidebar',
      },
    }),
    {
      name: 'customCSS',
      label: 'Custom CSS',
      type: 'textarea',
      admin: {
        description: 'Enter full <style> tag with custom CSS to apply page level.',
        placeholder: '<style>\n  body {\n    background: #f0f0f0;\n  }\n</style>',
        rows: 10,
      },
    },
    {
      name: 'customScripts',
      label: 'Page-Specific Scripts',
      type: 'textarea',
      admin: {
        description: 'Enter <script> tags to be injected into the page',
        placeholder: `<script async src="https://example.com/script.js" data-custom="true"></script>\n<script>\n  console.log("Inline script loaded");\n</script>`,
        rows: 10,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBlog],
    beforeChange: [populatePublishedAt, setPublisherOnFirstPublish],
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
