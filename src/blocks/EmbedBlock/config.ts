import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const EmbedBlock: Block = {
  slug: 'embedBlock',
  interfaceName: 'Embed Block',
  fields: [
    {
      name: 'sourceURL',
      label: 'Source URL',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          admin: {
            description: 'Only pixel value',
          },
        },
        {
          name: 'height',
          type: 'number',
          admin: {
            description: 'Only pixel value',
          },
        },
      ],
    },
    {
      name: 'colorVariant',
      type: 'select',
      label: 'Color Variant',
      required: true,
      defaultValue: 'primary',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
}
