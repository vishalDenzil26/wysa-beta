import { label, name, required, width } from '@/fields/baseFormFields'
import { Block } from 'payload'
export const CustomMultiCheckboxesBlock: Block = {
  slug: 'customMultiCheckboxes',
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
      type: 'array',
      name: 'checkboxes',
      label: 'Checkboxes',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [name, label],
        },
      ],
    },
    {
      type: 'row',
      fields: [width, required],
    },
  ],
  labels: {
    plural: 'Custom Multi Checkboxes',
    singular: 'Custom Multi Checkboxes',
  },
}
