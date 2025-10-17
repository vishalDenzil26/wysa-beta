import type { ClientUser, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { CallToAction } from '../../blocks/CallToAction/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
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
import { DynamicGridBlock } from '@/blocks/DynamicGridBlock/config'
import { FeedbackBlock } from '@/blocks/FeedbackBlock/config'
import { OnlyTextBlock } from '@/blocks/Content/onlyText/config'
import { DynamicContentBlock } from '@/blocks/Content/dynamic/config'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { EditorBlock } from '@/blocks/Content/editor/config'
import { EmbedBlock } from '@/blocks/EmbedBlock/config'
import { CategoryTabsBlock } from '@/blocks/CategoryTabsBlock/config'
import { latestArticle } from '@/articles/RenderLatestArticle/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'
import { InteractiveChatBlock } from '@/blocks/InteractiveChatBlock/config'
import { ImageSliderBlock } from '@/blocks/ImageSliderBlock/config'
import { getServerSideURL } from '@/utilities/getURL'
import { FeaturedBlogBlock } from '@/blocks/FeaturedBlogBlock/config'
import { BlogListingBlock } from '@/blocks/BlogListing/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                MediaBlock,
                InteractiveChatBlock,
                FormBlock,
                DynamicGridBlock,
                FeedbackBlock,
                OnlyTextBlock,
                DynamicContentBlock,
                FAQBlock,
                EditorBlock,
                EmbedBlock,
                CategoryTabsBlock,
                VideoBlock,
                ImageSliderBlock,
                FeaturedBlogBlock,
                BlogListingBlock,
              ],
            },
            {
              name: 'latestArticle',
              type: 'group',
              fields: latestArticle,
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
