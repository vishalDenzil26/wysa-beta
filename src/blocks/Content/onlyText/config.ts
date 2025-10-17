import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { GutterField } from '@/fields/gutter'

export const OnlyTextBlock: Block = {
  slug: 'onlyTextBlock',
  interfaceName: 'OnlyTextBlock',
  fields: [
    {
      name: 'width',
      type: 'select',
      defaultValue: 'w-full',
      options: [
        {
          label: 'One Third',
          value: 'w-1/3',
        },
        {
          label: 'Half',
          value: 'w-1/2',
        },
        {
          label: 'Two fifth',
          value: 'w-2/5',
        },
        {
          label: 'Two third',
          value: 'w-2/3',
        },
        {
          label: 'Full',
          value: 'w-full',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
            ParagraphFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    ...GutterField,
  ],
}
