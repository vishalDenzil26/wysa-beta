import { Field } from 'payload'
export const GutterField: Field[] = [
  {
    name: 'verticalGutter',
    type: 'select',
    defaultValue: 'my-5 md:my-20',
    options: [
      { label: 'Top', value: 'mt-5 md:mt-20' },
      { label: 'Bottom', value: 'mb-5 md:mb-20' },
      { label: 'Both', value: 'my-5 md:my-20' },
      { label: 'None', value: 'my-0' },
    ],
  },
]
