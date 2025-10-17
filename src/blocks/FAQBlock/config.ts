import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { Block, Field } from 'payload'

const faqItems: Field[] = [
  {
    name: 'question',
    label: 'Question',
    type: 'text',
    required: true,
  },
  {
    name: 'answer',
    label: 'Answer',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, ParagraphFeature(), FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
  },
  {
    name: 'category',
    label: 'Category',
    type: 'relationship',
    relationTo: 'categories',
    required: true,
  },
]

const FAQFilters: Field[] = [
  {
    name: 'faqCategories',
    label: 'FAQ Categories',
    type: 'array',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'Category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
          },
          {
            name: 'displayName',
            label: 'Display Name',
            type: 'text',
          },
        ],
      },
    ],
  },
]

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'faqsContent',
          label: 'FAQs Content',
          fields: [
            {
              name: 'faqItems',
              label: 'FAQ Items',
              type: 'array',
              fields: faqItems,
            },
          ],
        },
        {
          name: 'faqsFilter',
          label: 'FAQs Filters',
          fields: FAQFilters,
        },
      ],
    },
  ],
}
