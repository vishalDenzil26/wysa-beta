import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const BlogNav: GlobalConfig = {
  slug: 'blogNav',
  admin: {
    hidden: ({ user }) => {
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'showBlogNav',
      type: 'checkbox',
      label: 'Show Blog Navigation',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide the blog navigation menu',
      },
    },
    {
      name: 'categories',
      type: 'array',
      maxRows: 11,
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'blogCategories',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
