import type { Block } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import { DynamicGridBlock } from '@/blocks/DynamicGridBlock/config'
import { GutterField } from '@/fields/gutter'
import { EditorBlock } from '../editor/config'

export const DynamicContentBlock: Block = {
  slug: 'dynamicContentBlock',
  interfaceName: 'DynamicContentBlock',
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
              label: '2/5',
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
            IndentFeature(),
            HorizontalRuleFeature(),
            BlocksFeature({ blocks: [EditorBlock] }),
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
  labels: { plural: 'Dynamic Content', singular: 'Dynamic Content' },
}
