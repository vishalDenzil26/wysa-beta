import type { CollectionConfig } from 'payload'
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
import { getServerSideURL } from '@/utilities/getURL'
import { setPublisherOnFirstPublish } from '../Blogs/hooks/setPublisherOnFirstPublish'
import { blogUpdateAccess } from '../Blogs/hooks/blogUpdateAccess'
import { blogCreateAccess } from '../Blogs/hooks/blogCreateAccess'
import { blogCatDeleteAccess } from './hooks/blogCatDeleteAccess'

export const BlogCategories: CollectionConfig = {
  slug: 'blogCategories',
  access: {
    create: blogCreateAccess,
    delete: blogCatDeleteAccess,
    read: authenticatedOrPublished,
    update: blogUpdateAccess,
  },
  admin: {
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
        collection: 'blogCategories',
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
    afterChange: [revalidatePage],
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
