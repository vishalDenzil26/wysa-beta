import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    link(),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
