import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import ArticleTemplate from './(templates)/articleTemplate'

export const dynamic = 'force-dynamic'
type Args = Readonly<{
  params: Promise<{
    resourceSlug: string
    articleSlug: string
  }>
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}>

export default async function Page({ params }: Args) {
  const { resourceSlug, articleSlug } = await params
  const url = '/news'

  // @ts-ignore
  const article = await queryArticleBySlug({ collection: resourceSlug, slug: articleSlug })
  if (!article) return <PayloadRedirects url={url} />
  switch (resourceSlug) {
    case 'news': {
      // @ts-ignore
      return <ArticleTemplate data={{ ...article }} resourceType="news" />
    }
    case 'reports': {
      // @ts-ignore
      return <ArticleTemplate data={{ ...article }} resourceType="reports" />
    }
    default:
      break
  }
  return <></>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { articleSlug, resourceSlug } = await params
  if (resourceSlug !== 'news' && resourceSlug !== 'videos' && resourceSlug !== 'reports') {
    return {}
  }
  const article = await queryArticleBySlug({
    // @ts-ignore
    collection: resourceSlug,
    slug: articleSlug,
  })

  return generateMeta({ doc: article })
}

const queryArticleBySlug = cache(
  async ({ slug, collection }: { slug: string; collection: 'news' | 'videos' | 'reports' }) => {
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
