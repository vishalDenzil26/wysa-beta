import { Block } from 'payload'

export const CategoryTabsBlock: Block = {
  slug: 'categoryTabsBlock',
  fields: [
    {
      name: 'categoriesFilters',
      label: 'Categories filters',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'Category',
              type: 'relationship',
              relationTo: 'categories',
            },
            {
              name: 'displayName',
              label: 'Display Name',
              type: 'text',
            },
            {
              name: 'navigationType',
              type: 'select',
              defaultValue: 'page',
              options: [
                {
                  label: 'Page',
                  value: 'page',
                },
                {
                  label: 'Param',
                  value: 'param',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
