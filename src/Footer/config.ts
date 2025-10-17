import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    hidden: ({ user }) => {
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Nav brand logo',
      required: true,
    },
    {
      name: 'navGroups',
      type: 'array',
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          required: true,
        },
      ],
      maxRows: 6,
    },
    {
      type: 'array',
      name: 'socialMediaPlatforms',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'platform',
              type: 'select',
              options: [
                {
                  value: 'facebook',
                  label: 'Facebook',
                },
                {
                  value: 'instagram',
                  label: 'Instagram',
                },
                {
                  value: 'twitter',
                  label: 'Twitter',
                },
                {
                  value: 'linkedin',
                  label: 'LinkedIn',
                },
                {
                  value: 'youtube',
                  label: 'Youtube',
                },
              ],
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      type: 'group',
      name: 'misc',
      fields: [
        {
          type: 'group',
          name: 'termsAndConditions',
          fields: [link({ appearances: false })],
        },
        {
          type: 'group',
          name: 'privacyPolicy',
          fields: [link({ appearances: false })],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
