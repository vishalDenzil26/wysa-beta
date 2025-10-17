import { link } from '@/fields/link'
import { TextColorFeature } from '@/plugins/lexical-features/TextColor'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const RatingBlock: Block = {
  slug: 'ratingBlock',
  interfaceName: 'Rating block',
  fields: [
    {
      name: 'rateCount',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
    },
    {
      name: 'feedback',
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
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
    },
    link({ appearances: ['secondary-ghost-with-arrow', 'secondary-only-arrow'] }),
  ],
}
