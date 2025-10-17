import type { Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances =
  | 'primary'
  | 'secondary'
  | 'primary-ghost'
  | 'secondary-ghost'
  | 'primary-ghost-with-arrow'
  | 'secondary-ghost-with-arrow'
  | 'primary-only-arrow'
  | 'secondary-only-arrow'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  primary: {
    label: 'Primary',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  'primary-ghost': {
    label: 'Primary ghost',
    value: 'primary-ghost',
  },
  'secondary-ghost': {
    label: 'Secondary ghost',
    value: 'secondary-ghost',
  },
  'primary-ghost-with-arrow': {
    label: 'Primary ghost with arrow',
    value: 'primary-ghost-with-arrow',
  },
  'secondary-ghost-with-arrow': {
    label: 'Secodary ghost with arrow',
    value: 'secondary-ghost-with-arrow',
  },
  'primary-only-arrow': {
    label: 'Primary only arrow',
    value: 'primary-only-arrow',
  },
  'secondary-only-arrow': {
    label: 'Secondary only arrow',
    value: 'secondary-only-arrow',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages', 'resources'],
      required: false,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: false,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: false,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.primary,
      appearanceOptions.secondary,
      appearanceOptions['primary-ghost'],
      appearanceOptions['secondary-ghost'],
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'primary',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
