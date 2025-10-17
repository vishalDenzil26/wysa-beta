import { Media } from '@/components/Media'
import { News } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { RightArrow } from '../icons/right-arrow'

export const NewsArticleBanner: React.FC<{
  media: News['bannerImage']
  breadcrumbs: News['breadcrumbs']
  breadcrumbColor: News['breadcrumbColor']
}> = ({ media, breadcrumbs, breadcrumbColor }) => {
  return (
    <div className={`w-full h-full min-h-[80vh] relative`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="absolute top-6">
          <div
            className={cn(
              'flex items-center gap-x-1 font-mono uppercase text-[10px] font-bold',
              breadcrumbColor,
            )}
          >
            <span>Home</span>
            {breadcrumbs.map((item, id) => {
              return (
                <React.Fragment key={id}>
                  <RightArrow />
                  <span>{item.label}</span>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}

      {media && typeof media === 'object' && (
        <React.Fragment>
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        </React.Fragment>
      )}
    </div>
  )
}
