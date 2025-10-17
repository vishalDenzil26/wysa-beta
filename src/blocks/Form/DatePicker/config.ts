import { label, name, required, width } from '@/fields/baseFormFields'
import { Field } from 'payload'
import { Block } from 'payload'

export const CustomDatePickerBlock: Block = {
  slug: 'customDatePicker',
  fields: [
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
          admin: {
            width: '50%',
          },
          ...width,
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Custom Date Pickers',
    singular: 'Custom Date Picker',
  },
}
