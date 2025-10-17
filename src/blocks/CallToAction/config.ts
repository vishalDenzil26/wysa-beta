import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import { GutterField } from '@/fields/gutter'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background color',
      type: 'select',
      defaultValue: 'bg-none',
      options: [
        {
          value: 'bg-primary-foreground',
          label: 'Primary',
        },
        {
          value: 'bg-secondary-foreground',
          label: 'Secondary',
        },
        {
          value: 'bg-none',
          label: 'None',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background image',
          admin: {
            condition: (_data, siblingData) => {
              if (siblingData.backgroundColor === 'bg-none') {
                return true
              }
              return false
            },
          },
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mobileBackgroundImage',
          label: 'Mobile background image',
          admin: {
            condition: (_data, siblingData) => {
              if (siblingData.backgroundColor === 'bg-none') {
                return true
              }
              return false
            },
          },
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rounded',
          label: 'Border radius',
          type: 'select',
          defaultValue: 'rounded-2xl',
          options: [
            {
              label: 'Default',
              value: 'rounded-2xl',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
        {
          name: 'width',
          type: 'select',
          label: 'Width',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Full width',
              value: 'w-full',
            },
          ],
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'h-full',
          label: 'Height',
          options: [
            {
              label: 'Default',
              value: 'h-full',
            },
            {
              label: 'Viewport height',
              value: 'h-screen',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'alignContent',
          label: 'Align inner content',
          type: 'select',
          defaultValue: 'left',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
        },
        {
          name: 'justifyContent',
          label: 'Justify content',
          type: 'select',
          defaultValue: 'justify-center',
          options: [
            {
              label: 'Center',
              value: 'justify-center',
            },
            {
              label: 'Start',
              value: 'justify-start',
            },
            {
              label: 'End',
              value: 'justify-end',
            },
            {
              label: 'Space between',
              value: 'justify-between',
            },
            {
              label: 'Space around',
              value: 'justify-around',
            },
          ],
        },
        {
          name: 'contentWidth',
          label: 'Content width',
          type: 'select',
          defaultValue: 'w-full',
          options: [
            {
              label: 'Full',
              value: 'w-full',
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
              label: '3/4',
              value: 'w-3/4',
            },
          ],
        },
      ],
    },
    {
      name: 'customClassNames',
      type: 'text',
      admin: {
        description: 'Use space to separate class names',
      },
    },
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
            //Custom features
            TextColorFeature(),
          ]
        },
      }),
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            //Custom features
            TextColorFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'imageGroup',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    linkGroup({
      appearances: [
        'primary',
        'secondary',
        'primary-ghost',
        'secondary-ghost',
        'primary-ghost-with-arrow',
        'secondary-ghost-with-arrow',
        'primary-only-arrow',
        'secondary-only-arrow',
      ],
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: 'verticalPadding',
      type: 'select',
      defaultValue: 'py-5 md:py-14',
      options: [
        { label: 'Top', value: 'pt-5 md:pt-14' },
        { label: 'Bottom', value: 'pb-5 md:pb-14' },
        { label: 'Both', value: 'py-5 md:py-14' },
        { label: 'None', value: 'py-0' },
      ],
    },
    ...GutterField,
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
