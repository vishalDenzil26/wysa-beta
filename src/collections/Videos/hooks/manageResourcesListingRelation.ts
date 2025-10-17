import { Video } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const createResourcesListingRelation: CollectionAfterChangeHook<Video> = async ({
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
            relationTo: 'videos',
            value: doc.id,
          },
        },
      })
    } else if (exisiting.docs.length === 0) {
      await payload.create({
        collection: 'resourcesListing',
        data: {
          articleId: doc.id,
          articleCollectionSlug: 'videos',
          article: {
            relationTo: 'videos',
            value: doc.id,
          },
        },
      })
    }
  }
  return doc
}

export const deleteResourcesListingRelation: CollectionAfterDeleteHook<Video> = async ({
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
