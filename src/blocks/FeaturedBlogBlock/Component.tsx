import type { FeaturedBlogBlock as FeaturedBlogBlockType } from '@/payload-types'
import type { Media } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FeaturedBlog } from './FeaturedBlog'

type LatestArticleData = {
  title: string
  media: string | Media
  category: string
  duration: number
  path: string
}

export const FeaturedBlogBlock: React.FC<FeaturedBlogBlockType> = async ({
  title,
  FeaturedBlogOptions,
}) => {
  const Blog = await fetchLatestArticle()

  const backgroundColor = FeaturedBlogOptions?.backgroundColor
  const thumbnailOrientation = FeaturedBlogOptions?.thumbnailOrientation
  const verticalPadding = FeaturedBlogOptions?.verticalPadding

  if (!Blog) return null

  return (
    <FeaturedBlog
      {...Blog}
      color={backgroundColor!}
      thumbnailOrientation={thumbnailOrientation!}
      verticalPadding={verticalPadding}
      sectionTitle={title ?? undefined}
    />
  )
}

const fetchLatestArticle = async () => {
  const payload = await getPayload({ config: configPromise })
  const articles = await payload.find({
    collection: 'blog',
    depth: 2,
    limit: 1,
    page: 1,
    pagination: false,
    sort: '-createdAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  if (articles.docs.length === 0) {
    return null
  }

  const firstArticle = articles.docs[0]

  return {
    media: firstArticle.thumbNail,
    title: firstArticle.title,
    category: firstArticle?.category ?? [],
    duration: firstArticle.duration,
    path: `/blogs/${firstArticle.category[0]['slug']}/${firstArticle.slug}`,
  }
}
