import { Media } from '@/components/Media'
import { News, Report } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { RightArrow } from '@/components/icons/right-arrow'
import Link from 'next/link'
import { formatSlug } from '@/fields/slug/formatSlug'

export const ArticleBanner: React.FC<{
  media: News['bannerImage'] | Report['bannerImage']
  breadcrumbs: News['breadcrumbs'] | Report['breadcrumbs']
  breadcrumbColor: News['breadcrumbColor'] | Report['breadcrumbColor']
}> = ({ media, breadcrumbs, breadcrumbColor }) => {
  let currentPath = '/'
  return (
    <div className={`w-full h-full min-h-[500px] relative px-10`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="absolute top-10">
          <div
            className={cn(
              'flex items-center gap-x-1 font-mono uppercase text-sm sm:text-[12px] font-bold ',
              breadcrumbColor,
            )}
          >
            <Link href={currentPath}>Home</Link>
            {breadcrumbs.map((item, id) => {
              const slug = formatSlug(item.label!)
              currentPath += slug + '/'
              return (
                <div key={id} className="flex items-center">
                  <RightArrow />
                  <Link href={currentPath} className="last:line-clamp-1">
                    {item.label}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {media && typeof media === 'object' && (
        <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
      )}
    </div>
  )
}
