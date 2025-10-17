import { checkRole } from '@/collections/Users/access/checkRole'
import { User } from '@/payload-types'
import { Access } from 'payload'

export const blogUpdateAccess: Access = ({ req, data }) => {
  const user = req.user as User | undefined
  if (!user) return false

  if (checkRole(['admin', 'editor'], user)) {
    return true
  }

  if (checkRole(['author'], user) && !data?.publisher) {
    return true
  }

  if (checkRole(['author'], user)) {
    return data?.publisher === user.id
  }

  if (checkRole(['contributor'], user)) {
    if (data?.publisher === user.id || !data?.publisher) {
      return data?._status !== 'published'
    }
  }

  return false
}
