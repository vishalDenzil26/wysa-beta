import { label, name, required, width } from '@/fields/baseFormFields'
import { Field } from 'payload'

export const CustomEmailFields: Field[] = [
  {
    type: 'row',
    fields: [
      name,
      label,
      {
        type: 'text',
        name: 'placeholder',
      },
    ],
  },
  width,
  required,
]
