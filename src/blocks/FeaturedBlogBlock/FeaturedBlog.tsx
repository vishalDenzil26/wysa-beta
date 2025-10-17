'use client'
import { Media } from '@/components/Media'
import { useProgressBar } from '@/components/ui/progressbar'
import { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { Blog } from '@/payload-types'
import React from 'react'

export const FeaturedBlog: React.FC<{
  media: string | MediaType
  title: string
  category: Blog['category']
  color?: 'none' | 'primary' | 'secondary' | 'muted'
  thumbnailOrientation: 'square' | 'portrait'
  duration: number
  path: string
  sectionTitle?: string

  verticalPadding?: 'py-5 md:py-20' | 'pt-5 md:pt-20' | 'pb-5 md:pb-20' | 'py-0' | null | undefined
}> = ({
  media,
  title,
  category,
  color,
  thumbnailOrientation,
  duration,
  path,
  verticalPadding,
  sectionTitle,
}) => {
  const backgroundColor = {
    none: 'bg-none',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    muted: 'bg-muted',
  }
  let progress = useProgressBar()
  let router = useRouter()

  return (
    <div className={cn('h-full w-full ', color && backgroundColor[color], verticalPadding)}>
      <div className="grid grid-cols-2 gap-x-4 lg:gap-x-24 w-full items-center max-w-6xl mx-auto font-mono px-6 md:px-12 lg:px-20">
        <div className="space-y-2">
          <div>
            <p className="prose text-secondary text-xl lg:text-3xl font-medium">
              {sectionTitle ? sectionTitle : 'Latest News'}
            </p>
          </div>
          <div>
            <small className="text-sm font-mono text-muted-foreground font-medium">
              {category.map((item, i) => (
                <span key={i} className="inline-flex items-center me-1 uppercase">
                  {item['title']}
                  {i !== category.length - 1 && <span>, </span>}
                </span>
              ))}
              {' / '}
              {duration} min read
            </small>
          </div>
          <div>
            <h2 className="prose font-medium sm:text-2xl text-xl lg:text-4xl text-primary">
              {title}
            </h2>
          </div>

          <Link
            href={path}
            className="p-0 flex gap-1 items-center h-auto w-max text-sm font-semibold text-secondary"
            onClick={(e) => {
              e.preventDefault()
              progress.start()
              startTransition(() => {
                router.push(path)
                progress.done()
              })
            }}
          >
            <span className="max-md:underline underline-offset-4 decoration-2">Read more</span>
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
              className="w-3 h-3"
            >
              <path d="M13 5H19V11" />
              <path d="M19 5L5 19" />
            </svg>
          </Link>
        </div>
        <div
          className={cn(
            'w-full relative rounded-2xl overflow-hidden',
            thumbnailOrientation === 'square' ? 'h-56 lg:h-[24rem]' : 'h-[14rem] lg:h-[30rem]',
          )}
        >
          <Media resource={media} imgClassName="object-cover" fill={true} />
        </div>
      </div>
    </div>
  )
}
