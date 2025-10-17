import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidateBlog: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    console.log(doc)

    const path = `/blogs/cateogry-slug/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    revalidatePath(path)
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/blogs/cateogry-slug/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
