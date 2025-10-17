import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { Media as MediaType } from '@/payload-types'
import { LatestArticle } from '@/articles/RenderLatestArticle'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderScript } from '@/components/RenderScript'
import { RenderStyle } from '@/components/RenderStyle'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })
  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'blog-home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}
type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug = 'blog-home' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const url = '/' + slug
  const { isEnabled: draft } = await draftMode()

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const {
    hero,
    layout,
    breadcrumbs,
    latestArticle: latestArticleConfig,
    customCSS,
    customScripts,
  } = page
  const showLatestArticle = latestArticleConfig?.showLatestArticle
  const latestArticleOptions = latestArticleConfig?.latestArticleOptions

  let latestArticle: {
    thumbnail: string | MediaType
    title: string
    category: string
    duration: number
    path: string
    source?: {
      url: string
      mimeType: string
    }
    articleCollectionSlug: string
  } = {
    thumbnail: '',
    title: '',
    category: '',
    duration: 0,
    path: '',
    articleCollectionSlug: '',
  }
  if (showLatestArticle === 'yes') {
    const payload = await getPayload({ config: configPromise })
    const firstArticle = await payload.find({
      collection: 'resourcesListing',
      depth: 2,
      limit: 1,
      page: 1,
      pagination: false,
      sort: '-createdAt',
    })
    latestArticle = {
      thumbnail: firstArticle.docs[0].article.value['thumbNail'],
      title: firstArticle.docs[0].article.value['title'],
      category: firstArticle.docs[0].article.value['category']['title'],
      duration: firstArticle.docs[0].article.value['duration'],
      path: `/resources/${firstArticle.docs[0]['articleCollectionSlug']}/${firstArticle.docs[0].article.value['slug']}`,
      source: firstArticle.docs[0].article.value['sourceFile'] && {
        url: firstArticle.docs[0].article.value['sourceFile']['url'],
        mimeType: firstArticle.docs[0].article.value['sourceFile']['mimeType'],
      },
      articleCollectionSlug: firstArticle.docs[0].article.value['articleCollectionSlug'],
    }
  }
  return (
    <>
      {!!customScripts && <RenderScript script={customScripts} />}
      {!!customCSS && <RenderStyle style={customCSS} />}
      <article>
        {draft && <LivePreviewListener />}
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />
        <RenderHero hero={hero} breadcrumbs={slug !== 'home' ? breadcrumbs : []} />
        {layout && <RenderBlocks blocks={layout} options={{ searchParams }} />}
        {showLatestArticle === 'yes' && (
          <LatestArticle
            media={latestArticle.thumbnail}
            title={latestArticle.title}
            category={latestArticle.category}
            duration={latestArticle.duration}
            articleCollectionSlug={latestArticle.articleCollectionSlug}
            source={latestArticle.source}
            color={latestArticleOptions?.backgroundColor ?? 'none'}
            thumbnailOrientation={latestArticleOptions?.thumbnailOrientation ?? 'square'}
            path={latestArticle.path}
            verticalPadding={latestArticleOptions?.verticalPadding}
          />
        )}
      </article>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs?.[0] || null
})
