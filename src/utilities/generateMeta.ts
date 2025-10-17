import type { Metadata } from 'next'

import type { News, Page, Resource, Video, Report, Blog, BlogCategory } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getSecretValue } from './secrets'

export const generateMeta = async (args: {
  doc: Page | Resource | News | Video | Report | Blog | BlogCategory
}): Promise<Metadata> => {
  const { doc } = args || {}
  const secrets = await getSecretValue()

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${secrets.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  const title = doc?.meta?.title ? doc?.meta?.title + ' | Wysa' : 'Wysa'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
