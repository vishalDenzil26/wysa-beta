import { Field } from 'payload'

export const latestArticle: Field[] = [
  {
    name: 'showLatestArticle',
    type: 'radio',
    defaultValue: 'no',
    options: [
      {
        value: 'yes',
        label: 'Yes',
      },
      {
        value: 'no',
        label: 'No',
      },
    ],
  },
  {
    name: 'latestArticleOptions',
    type: 'group',
    admin: {
      condition: (_data, peerData) => {
        if (peerData.showLatestArticle === 'yes') {
          return true
        }
        return false
      },
    },
    fields: [
      {
        type: 'select',
        name: 'backgroundColor',
        defaultValue: 'none',
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Primary',
            value: 'primary',
          },
          {
            label: 'Secodary',
            value: 'secondary',
          },
          {
            label: 'Muted',
            value: 'muted',
          },
        ],
      },
      {
        type: 'select',
        name: 'thumbnailOrientation',
        defaultValue: 'square',
        options: [
          {
            label: 'Square',
            value: 'square',
          },
          {
            label: 'Portrait',
            value: 'portrait',
          },
        ],
      },
      {
        name: 'verticalPadding',
        label: 'Vertiacal Padding',
        type: 'select',
        defaultValue: 'py-5 md:py-20',
        options: [
          { label: 'Top', value: 'pt-5 md:pt-20' },
          { label: 'Bottom', value: 'pb-5 md:pb-20' },
          { label: 'Both', value: 'py-5 md:py-20' },
          { label: 'None', value: 'py-0' },
        ],
      },
    ],
  },
]
