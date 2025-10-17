import type { Block } from 'payload'

export const ImageSliderBlock: Block = {
  slug: 'imageSliderBlock',
  interfaceName: 'ImageSliderBlock',
  fields: [
    {
      name: 'sliderImages',
      label: 'Slider Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
