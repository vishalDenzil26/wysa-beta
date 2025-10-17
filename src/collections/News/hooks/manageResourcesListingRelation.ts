import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { News } from '../../../payload-types'

export const createResourcesListingRelation: CollectionAfterChangeHook<News> = async ({
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const exisiting = await payload.find({
      collection: 'resourcesListing',
      where: {
        articleId: {
          equals: doc.id,
        },
      },
    })
    if (exisiting.docs.length === 1) {
      await payload.update({
        collection: 'resourcesListing',
        id: exisiting.docs[0].id,
        data: {
          article: {
            relationTo: 'news',
            value: doc.id,
          },
        },
      })
    } else if (exisiting.docs.length === 0) {
      await payload.create({
        collection: 'resourcesListing',
        data: {
          articleId: doc.id,
          articleCollectionSlug: 'news',
          article: {
            relationTo: 'news',
            value: doc.id,
          },
        },
      })
    }
  }
  return doc
}

export const deleteResourcesListingRelation: CollectionAfterDeleteHook<News> = async ({
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    await payload.delete({
      collection: 'resourcesListing',
      where: {
        articleId: {
          equals: doc.id,
        },
      },
    })
  }
  return doc
}
