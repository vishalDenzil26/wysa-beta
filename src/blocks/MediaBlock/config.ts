import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'position',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Fullscreen',
              value: 'fullscreen',
            },
          ],
        },
        {
          name: 'rounded',
          type: 'select',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Default',
              value: 'rounded-2xl',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'mobileMedia',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'customImageClassName',
      type: 'text',
    },
  ],
}
