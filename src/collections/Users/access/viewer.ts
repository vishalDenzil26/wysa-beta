import type { Access } from 'payload'

import { checkRole } from './checkRole'
const viewer: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor', 'contributor'], user)) {
      return true
    }
    return { id: { equals: user.id } }
  }
  return false
}

export default viewer
