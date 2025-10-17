import CategoryTemplate from './CategoryTemplate'
import BlogTemplate from './BlogTemplate'
import { generateMeta } from '@/utilities/generateMeta'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
    innerSlug: string
  }>
  searchParams: Promise<{
    pageNumber?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug, innerSlug } = await params
  const pageNumber = (await searchParams).pageNumber ?? '1'

  if (slug === 'category') {
    return <CategoryTemplate category={innerSlug} pageNumber={pageNumber} />
  }

  return <BlogTemplate slug={innerSlug} />
}

export async function generateMetadata({ params }: Props) {
  const { slug, innerSlug } = await params

  if (slug === 'category') {
    const blog = await queryArticleBySlug({ collection: 'blogCategories', slug: innerSlug })
    return generateMeta({ doc: blog })
  } else {
    const blog = await queryArticleBySlug({ collection: 'blog', slug: innerSlug })
    return generateMeta({ doc: blog })
  }
}

const queryArticleBySlug = cache(
  async ({ slug, collection }: { slug: string; collection: 'blog' | 'blogCategories' }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection,
      draft,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
        _status: { equals: 'published' },
      },
    })

    return result.docs?.[0] || null
  },
)
