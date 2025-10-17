import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { ArticlesListing } from '@/articles/RenderArticlesList'
import { Pagination } from '@/components/Pagination'
import { LatestArticle } from '@/articles/RenderLatestArticle'

import type { Resource, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

// Types
type PageParams = {
  resourceSlug?: string
  pageNumber?: string
  category?: string
}

type LatestArticleData = {
  title: string
  media: string | Media
  category: string
  duration: number
  path: string
  articleCollectionSlug: string
  source?: {
    url: string
    mimeType: string
  }
}

// Utilities
const getListingTabs = (resourcePage: Resource, resourceSlug: string) => {
  if (resourceSlug === 'resources' && resourcePage.listingByPage) {
    return resourcePage.listingByPage.map((item) => item.resourceCollectionType)
  }

  if (resourceSlug !== 'resources' && resourcePage.listingByCategory) {
    return resourcePage.listingByCategory.map((item) => item.Category?.['title'])
  }

  return []
}

const fetchArticles = async (payload: any, params: PageParams) => {
  const { isEnabled: draft } = await draftMode()
  const { resourceSlug = 'resources', pageNumber, category } = params
  const collectionSlug = resourceSlug !== 'resources' ? resourceSlug : 'resourcesListing'

  const query = {}
  if (category) {
    query['category.title'] = { equals: category }
  }
  if (resourceSlug === 'resources') {
    const listing = await payload.find({
      collection: 'resourcesListing',
      draft,
      limit: 10,
      depth: 2,
      sort: '-createdAt',
      where: query,
      page: pageNumber ? parseInt(pageNumber) : 1,
    })

    return {
      docs: listing.docs.map((doc) => ({
        ...doc.article.value,
        articleCollectionSlug: doc.articleCollectionSlug,
      })),
      page: listing.page,
      totalPages: listing.totalPages,
    }
  }

  return payload.find({
    collection: collectionSlug,
    depth: 1,
    limit: 10,
    sort: '-createdAt',
    page: pageNumber ? parseInt(pageNumber) : 1,
    where: query,
  })
}

const fetchLatestArticle = async (
  payload: any,
  params: PageParams,
): Promise<LatestArticleData | null> => {
  const { resourceSlug = 'resources' } = params
  const collectionSlug = resourceSlug !== 'resources' ? resourceSlug : 'resourcesListing'

  const articles = await payload.find({
    collection: collectionSlug,
    depth: 2,
    limit: 1,
    page: 1,
    pagination: false,
    sort: '-createdAt',
  })

  if (articles.docs.length === 0) {
    return null
  }

  const firstArticle = articles.docs[0]
  const articleData = resourceSlug === 'resources' ? firstArticle.article.value : firstArticle
  let articleCollectionSlug =
    resourceSlug === 'resources' ? firstArticle.articleCollectionSlug : collectionSlug

  return {
    media: articleData.thumbNail,
    title: articleData.title,
    articleCollectionSlug: articleCollectionSlug,
    category: articleData?.category?.title ?? '',
    duration: articleData.duration,
    source: articleData.sourceFile && {
      url: articleData.sourceFile.url,
      mimeType: articleData.sourceFile.mimeType,
    },
    path: `/resources/${articleCollectionSlug}/${articleData.slug}`,
  }
}

// Main Component
export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ resourceSlug?: string }>
  searchParams: Promise<{ pageNumber?: string; category?: string }>
}>) {
  const resolvedParams = {
    resourceSlug: (await params).resourceSlug ?? 'resources',
    pageNumber: (await searchParams).pageNumber,
    category: (await searchParams).category,
  }

  const url = `/${resolvedParams.resourceSlug}`
  const payload = await getPayload({ config: configPromise })

  const resourcePage = await queryResourcePageBySlug({
    slug: resolvedParams.resourceSlug,
  })

  if (!resourcePage) {
    return <PayloadRedirects url={url} />
  }

  const listingTabs = getListingTabs(resourcePage, resolvedParams.resourceSlug)
  const articles = await fetchArticles(payload, resolvedParams)

  const latestArticle =
    resourcePage.showLatestArticle === 'yes'
      ? await fetchLatestArticle(payload, resolvedParams)
      : null
  const updatedBreadCrumbs: Resource['breadcrumbs'] = []
  updatedBreadCrumbs.push(...(resourcePage.breadcrumbs ?? []))
  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />
      <RenderHero hero={resourcePage.hero} breadcrumbs={updatedBreadCrumbs} />

      <div className="px-6 lg:px-14">
        <ArticlesListing
          showViewAll={resourcePage.showViewAll === 'yes'}
          tabType={resolvedParams.resourceSlug === 'resources' ? 'param' : 'path'}
          tabs={listingTabs}
          listingLabel={resourcePage.listingLabel}
          articles={articles.docs}
          currentCollectionSlug={
            resolvedParams.resourceSlug !== 'resources'
              ? resolvedParams.resourceSlug
              : 'resourcesListing'
          }
          currentCategory={resolvedParams.category}
        >
          {latestArticle && (
            <LatestArticle
              {...latestArticle}
              color={resourcePage.latestArticleOptions?.backgroundColor ?? 'none'}
              thumbnailOrientation={
                resourcePage.latestArticleOptions?.thumbnailOrientation ?? 'square'
              }
              verticalPadding={resourcePage.latestArticleOptions?.verticalPadding}
            />
          )}
        </ArticlesListing>
      </div>

      {articles.totalPages && articles.page && (
        <div className="container">
          <Pagination
            page={articles.page}
            totalPages={articles.totalPages}
            // @ts-ignore
            collection={resolvedParams.resourceSlug}
          />
        </div>
      )}
    </article>
  )
}

// Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ resourceSlug?: string }>
}): Promise<Metadata> {
  const { resourceSlug = 'resources' } = await params
  const resourcePage = await queryResourcePageBySlug({ slug: resourceSlug })
  return generateMeta({ doc: resourcePage })
}

const queryResourcePageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'resources',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      and: [
        {
          slug: { equals: slug },
        },
        {
          _status: { equals: 'published' },
        },
      ],
    },
  })

  return result.docs?.[0] || null
})
