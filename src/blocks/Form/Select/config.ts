import { label, name, required, width } from '@/fields/baseFormFields'
import { Field } from 'payload'

export const CustomSelectFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        admin: {
          width: '50%',
        },
        ...name,
      },
      {
        admin: {
          width: '50%',
        },
        ...label,
      },
    ],
  },
  {
    type: 'row',
    fields: [
      width,
      {
        name: 'defaultValue',
        type: 'text',
        label: 'Default Value',
        localized: true,
      },
      {
        type: 'text',
        name: 'placeholder',
      },
    ],
  },
  {
    name: 'options',
    type: 'array',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'label',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Label',
            localized: true,
            required: true,
          },
          {
            name: 'value',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Value',
            required: true,
          },
        ],
      },
    ],
    label: 'Select Attribute Options',
    labels: {
      plural: 'Options',
      singular: 'Option',
    },
  },
  required,
]
