import { checkRole } from '@/collections/Users/access/checkRole'
import { User } from '@/payload-types'
import { Access } from 'payload'

export const blogCreateAccess: Access = ({ req, data }) => {
  const user = req.user as User | undefined
  if (!user) return false

  if (checkRole(['admin', 'editor', 'author', 'contributor'], user)) {
    return true
  }

  return false
}
