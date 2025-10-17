import { Block } from 'payload'

export const FeaturedArticleBlock: Block = {
  slug: 'featuredArticleBlock',
  fields: [
    {
      type: 'select',
      name: 'backgroundColor',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secodary',
          value: 'secondary',
        },
        {
          label: 'Muted',
          value: 'muted',
        },
      ],
    },
    {
      type: 'array',
      name: 'articleCategories',
      fields: [
        { type: 'relationship', name: 'articleCategory', relationTo: 'categories', required: true },
      ],
    },
  ],
}
