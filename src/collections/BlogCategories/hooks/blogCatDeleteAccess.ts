import { checkRole } from '@/collections/Users/access/checkRole'
import { User } from '@/payload-types'
import { Access } from 'payload'

export const blogCatDeleteAccess: Access = async ({ req, id }) => {
  const user = req.user as User | undefined
  if (!user) return false

  if (checkRole(['admin', 'editor'], user)) {
    return true
  }

  if (checkRole(['author', 'contributor'], user)) {
    try {
      const document = await req.payload.findByID({
        collection: 'blogCategories',
        id: id as string,
        depth: 0,
        draft: true,
        overrideAccess: true,
        showHiddenFields: true,
      })

      if (!document?.publisher) {
        return true
      }

      if (document.publisher !== user.id) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  } else {
    return false
  }

  return false
}
