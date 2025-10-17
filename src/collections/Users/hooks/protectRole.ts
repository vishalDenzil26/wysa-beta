import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const protectedRoles: FieldHook<{ id: String } & User> = ({ req, data }) => {
  const isAdmin = req.user?.roles?.includes('admin')
  if (!isAdmin) {
    return ['viewer']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('viewer')
  return [...userRoles.values()]
}
