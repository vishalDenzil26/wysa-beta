import { PayloadRequest, CollectionSlug } from 'payload'
import { getSecretValue } from './secrets'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  resources: '/resources',
  news: '/resources/news',
  reports: '/resources/reports',
  videos: '/resources/videos',
  blog: '/blogs/cateogry-slug',
  blogCategories: '/blogs/category',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
