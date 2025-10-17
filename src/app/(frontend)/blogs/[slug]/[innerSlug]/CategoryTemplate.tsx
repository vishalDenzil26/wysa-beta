import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import BlogListing from '../(view)/BlogLising'
import { Pagination } from '@/components/Pagination'
import { RenderScript } from '@/components/RenderScript'
import { RenderStyle } from '@/components/RenderStyle'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Types
type PageParams = {
  pageNumber?: string
  category?: string
}

export default async function CategoryTemplate({
  category,
  pageNumber,
}: {
  category: string
  pageNumber: string
}) {
  const blogs = await fetchArticles({ pageNumber, category })
  const currentCategory = await fetchCategory(category)
  const { customScripts, customCSS } = currentCategory
  const { isEnabled: draft } = await draftMode()
  const url = '/'
  if (!currentCategory) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      {!!customScripts && <RenderScript script={customScripts} />}
      {!!customCSS && <RenderStyle style={customCSS} />}
      <div className="container">
        <PayloadRedirects disableNotFound url={`/`} />
        {draft && <LivePreviewListener />}
        <div className="flex justify-center text-primary md:text-3xl font-semibold mt-8 uppercase">
          {' '}
          {currentCategory['title']}
        </div>
        <BlogListing articles={blogs.docs} category={category} />
        <Pagination
          page={Number(pageNumber)}
          totalPages={blogs.totalPages}
          // @ts-ignore
          collection={`blogs/category/${currentCategory.slug}`}
        />
      </div>
    </>
  )
}

const fetchCategory = async (category: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'blogCategories',
    where: {
      slug: { equals: category },
    },
    depth: 1,
    draft,
    limit: 1,
  })
  return res.docs[0]
}

const fetchArticles = async ({ pageNumber, category }: PageParams) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'blog',
    draft,
    depth: 1,
    limit: 10,
    sort: '-createdAt',
    page: pageNumber ? parseInt(pageNumber) : 1,
    where: {
      'category.slug': {
        equals: category,
      },
      _status: {
        equals: 'published',
      },
    },
  })
}
