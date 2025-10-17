import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { HighlightTextFeature } from '@/plugins/lexical-features/HighlightText'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'primary',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Primary Hero',
          value: 'primary',
        },
      ],
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'min-h-[80vh]',
      label: 'Height',
      options: [
        {
          label: 'Default',
          value: 'min-h-[80vh]',
        },
        {
          label: 'Full viewport',
          value: 'min-h-screen',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => {
          return [
            ...defaultFeatures,
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            // Custom features
            HighlightTextFeature(),
            TextColorFeature(),
          ]
        },
      }),
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'descriptionColor',
          type: 'select',
          label: 'Description color',
          defaultValue: 'text-white',
          options: [
            {
              label: 'Light',
              value: 'text-white',
            },
            {
              label: 'Dark',
              value: 'text-foreground',
            },
          ],
        },
        {
          name: 'breadcrumbColor',
          type: 'select',
          label: 'Breadcrumb color',
          defaultValue: 'text-white',
          options: [
            {
              label: 'Light',
              value: 'text-white',
            },
            {
              label: 'Primary',
              value: 'text-primary',
            },
            {
              label: 'Secondary',
              value: 'text-secondary',
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      required: true,
    },
    link({}),
  ],
  label: false,
}
