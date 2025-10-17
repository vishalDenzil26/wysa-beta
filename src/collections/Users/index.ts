import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { protectedRoles } from './hooks/protectRole'
import editor from './access/editor'

import admin from './access/admin'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'
import viewer from './access/viewer'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: admin,
    delete: admin,
    read: ({ req }) => {
      const user = req.user as User | undefined
      if (!user) return false

      if (checkRole(['admin'], user)) {
        return true
      }
      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: viewer,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      hooks: {
        beforeChange: [protectedRoles],
      },
      access: {
        update: ({ req }) => checkRole(['admin'], req.user as User),
      },
    },
  ],
  timestamps: true,
}

export default Users
