import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { Block, Field } from 'payload'

const feedBackItems: Field[] = [
  {
    name: 'consumerType',
    label: 'Consume type',
    type: 'text',
    required: true,
  },
  {
    name: 'origin',
    label: 'Origin',
    type: 'text',
    required: true,
  },
  {
    name: 'quote',
    label: 'Consumer says',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, ParagraphFeature(), FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
  },
]

export const FeedbackBlock: Block = {
  slug: 'feedBackBlock',
  interfaceName: 'FeedbackBlock',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background color',
      type: 'select',
      defaultValue: 'bg-primary-foreground',
      required: true,
      options: [
        {
          label: 'Primary',
          value: 'bg-primary-foreground',
        },
        {
          label: 'Secondary',
          value: 'bg-secondary-foreground',
        },
      ],
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subText',
      label: 'Sub text',
      type: 'text',
      required: true,
    },
    {
      name: 'feedBackContent',
      label: 'Feedback Content',
      type: 'array',
      fields: feedBackItems,
    },
  ],
}
