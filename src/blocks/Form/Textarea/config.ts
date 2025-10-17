import { label, name, required, width } from '@/fields/baseFormFields'
import { Field } from 'payload'

export const CustomTextareaFields: Field[] = [
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
]
