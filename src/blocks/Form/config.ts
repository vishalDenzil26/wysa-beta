import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'colorVariant',
      type: 'select',
      label: 'Color Variant',
      defaultValue: 'primary',
      required: true,
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
    {
      name: 'enablePrivacyPolicyAgreement',
      type: 'checkbox',
      label: 'Enable privacy policy agreement',
      defaultValue: false,
    },
    {
      type: 'row',
      admin: {
        condition: (_data, sibilingData) => {
          if (sibilingData.enablePrivacyPolicyAgreement) {
            return true
          } else {
            return false
          }
        },
      },
      fields: [
        {
          name: 'beforePrivacyPolicyLink',
          type: 'text',
          label: 'Text before privacy policy',
        },
        {
          name: 'privacyPolicyURL',
          type: 'text',
          label: 'Privacy policy URL',
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
