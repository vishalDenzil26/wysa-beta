import type { Access } from 'payload'

import { checkRole } from './checkRole'
const contributor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor', 'contributor'], user)) {
      return true
    }
  }
  return false
}

export default contributor
