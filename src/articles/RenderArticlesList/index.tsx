'use client'
import { News, Report, Video } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React, { startTransition } from 'react'
import { Card } from './card'
import Link from 'next/link'
import { useProgressBar } from '@/components/ui/progressbar'
import { useRouter, usePathname } from 'next/navigation'
import VideoCard from './video-card'

type Props = {
  showViewAll: boolean
  tabType: 'param' | 'path'
  tabs?: string[]
  listingLabel?: string
  articles: News[] | Report[] | Video[]
  currentCollectionSlug: string
  currentCategory?: string
  children?: React.ReactNode
}

export const ArticlesListing: React.FC<Props> = ({
  showViewAll,
  tabType,
  tabs,
  articles,
  listingLabel,
  currentCollectionSlug,
  currentCategory,
  children,
}) => {
  let progress = useProgressBar()
  let router = useRouter()
  let pathname = usePathname()

  return (
    <div className={cn('space-y-20 mt-14')}>
      {tabs && (
        <div className="flex items-start lg:items-center justify-between w-full flex-col lg:flex-row gap-4">
          <h3 className="text-primary text-2xl lg:text-3xl font-semibold">{listingLabel}</h3>
          <div className="flex items-center lg:justify-between gap-6 flex-wrap">
            {showViewAll && (
              <Link
                className={cn(
                  'text-sm lg:text-base  py-2.5 rounded-xl px-2 whitespace-nowrap font-bold',
                  (!currentCategory || currentCategory === '') &&
                    'bg-secondary-foreground text-secondary',
                )}
                href={tabType === 'path' ? `/resources/${currentCollectionSlug}` : '/resources'}
                onClick={(e) => {
                  e.preventDefault()
                  progress.start()
                  startTransition(() => {
                    router.push(
                      tabType === 'path' ? `/resources/${currentCollectionSlug}` : '/resources',
                      pathname.endsWith('/resources') ? undefined : { scroll: false },
                    )
                    progress.done()
                  })
                }}
              >
                View All
              </Link>
            )}
            {tabs.map((tab) => (
              <Link
                className={cn(
                  'text-sm lg:text-base  py-2.5 px-2 rounded-xl whitespace-nowrap font-bold',
                  currentCategory === tab && 'bg-secondary-foreground text-secondary',
                )}
                href={
                  tabType === 'path'
                    ? `/resources/${currentCollectionSlug}?category=${tab}`
                    : '/resources/' + tab
                }
                onClick={(e) => {
                  e.preventDefault()
                  progress.start()
                  startTransition(() => {
                    router.push(
                      tabType === 'path'
                        ? `/resources/${currentCollectionSlug}?category=${tab}`
                        : '/resources/' + tab,
                      pathname.endsWith('/resources') ? undefined : { scroll: false },
                    )
                    progress.done()
                  })
                }}
                key={tab}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
      {children}
      <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-16 max-w-6xl mx-auto')}>
        {articles.map((article) => {
          return (
            <div key={article.title} className="w-full">
              {(currentCollectionSlug === 'videos' || article.articleCollectionSlug === 'videos') &&
              article.sourceFile ? (
                <VideoCard
                  media={article.thumbNail}
                  title={article.title}
                  duration={article.duration}
                  source={article.sourceFile}
                />
              ) : (
                <Card
                  media={article.thumbNail}
                  title={article.title}
                  category={article.category}
                  duration={article.duration}
                  path={`/resources/${article.articleCollectionSlug ?? currentCollectionSlug}/${article.slug}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
