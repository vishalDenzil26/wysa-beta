import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  interfaceName: 'Video Block',
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
      name: 'mobileThumbNail',
      label: 'Mobile Thumbnail image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'upload',
      name: 'sourceFile',
      admin: {
        description: 'Only MP4 supported.',
      },
      required: true,
      relationTo: 'media',
    },
  ],
}
