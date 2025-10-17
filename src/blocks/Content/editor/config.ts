import type { Block, Field } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import { GutterField } from '@/fields/gutter'

export const EditorBlock: Block = {
  slug: 'editorBlock',
  interfaceName: 'EditorBlock',
  fields: [
    {
      name: 'content',
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
            // Custom Features
            TextColorFeature(),
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
