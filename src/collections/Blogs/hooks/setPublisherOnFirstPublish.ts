// ./collections/Blog/hooks/setPublisherOnFirstPublish.ts
import type { CollectionBeforeChangeHook } from 'payload'
import type { User } from '@/payload-types'

export const setPublisherOnFirstPublish: CollectionBeforeChangeHook = ({
  req,
  data,
  operation,
  originalDoc,
}) => {
  const user = req.user as User | undefined
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.publisher) {
      return {
        ...data,
        publisher: user?.id,
      }
    }
  }
  return data
}
