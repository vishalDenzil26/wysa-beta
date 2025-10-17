import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { ArticleBanner } from '@/articles/RenderArticleBanner'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import { RenderScript } from '@/components/RenderScript'
import { RenderStyle } from '@/components/RenderStyle'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function BlogTemplate({ slug }: { slug: string }) {
  const { isEnabled: draft } = await draftMode()
  const article = await queryArticleBySlug({ collection: 'blog', slug: slug })
  const url = '/'
  if (!article) {
    return <PayloadRedirects url={url} />
  }
  const {
    bannerImage,
    title,
    category,
    abstract,
    content,
    author,
    breadcrumbColor,
    duration,
    customScripts,
    customCSS,
  } = article

  return (
    <>
      {!!customScripts && <RenderScript script={customScripts} />}
      {!!customCSS && <RenderStyle style={customCSS} />}
      <article className="pb-20">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={`/`} />
        {draft && <LivePreviewListener />}
        <ArticleBanner media={bannerImage} breadcrumbs={null} breadcrumbColor={breadcrumbColor} />
        <div className="container mx-auto mt-20  max-w-4xl">
          <div className="mb-14">
            <h1 className="prose text-5xl font-mono text-primary">{title}</h1>
            <small className="text-sm font-mono text-muted-foreground font-medium">
              {category &&
                category.map((item, i) => (
                  <span key={i} className="inline-flex items-center me-1 uppercase">
                    {item['title']}
                  </span>
                ))}
              {' / '}
              {duration} min read
            </small>
          </div>
          {abstract && <RichText className="font-bold" data={abstract} enableGutter={false} />}
          <div className="mt-4">
            <RichText
              data={content}
              enableGutter={false}
              className={cn('prose-a:text-foreground prose-a:underline')}
            />
          </div>
        </div>
        <div className="container ">
          <div className="mx-auto bg-muted rounded-2xl py-10 px-14 flex flex-col md:flex-row gap-y-2 md:items-center md:justify-between my-24">
            <h5 className="font-mono font-bold text-md">Written by {author}</h5>
            <Button
              variant={'secondary-ghost'}
              className="p-0 gap-1 items-center h-auto w-max max-w-full text-[10px] font-semibold break-words whitespace-normal overflow-hidden flex"
            >
              <span className="truncate">{`More from ${author}`}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 shrink-0"
              >
                <path d="M13 5H19V11" />
                <path d="M19 5L5 19" />
              </svg>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}

// export async function generateMetadata({ params }: Args): Promise<Metadata> {

// const article = await queryArticleBySlug({
//   collection: 'blog',
//   slug: slug ,
// })

// return generateMeta({ doc: article })
// }

const queryArticleBySlug = cache(
  async ({ slug, collection }: { slug: string; collection: 'blog' }) => {
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
      },
    })

    return result.docs?.[0] || null
  },
)
