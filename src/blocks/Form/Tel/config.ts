import { Block } from 'payload'

import { Field } from 'payload'

export const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

export const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

export const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

export const CustomTelFields: Block = {
  slug: 'tel',
  labels: {
    singular: 'Telephone Field',
    plural: 'Telephone Fields',
  },
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
    {
      type: 'row',
      fields: [
        {
          ...width,
        },
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
    required,
  ],
}
