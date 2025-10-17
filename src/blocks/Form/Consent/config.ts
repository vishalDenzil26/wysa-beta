import { label, name, required, width } from '@/fields/baseFormFields'
import { link } from '@/fields/link'
import { Field } from 'payload'
import { Block } from 'payload'

const consentURL: Field = {
  name: 'consentURL',
  type: 'group',
  label: 'Consent URL',
  fields: [link()],
}

export const CustomConsentBlock: Block = {
  slug: 'customConsent',
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
    consentURL,
    width,
    required,
  ],
  labels: {
    plural: 'Custom Consents',
    singular: 'Custom Consent',
  },
}
