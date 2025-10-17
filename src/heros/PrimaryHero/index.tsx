import { RightArrow } from '@/components/icons/right-arrow'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { formatSlug } from '@/fields/slug/formatSlug'
import { Page, Resource } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

export const PrimaryHero: React.FC<{
  hero: Page['hero'] | Resource['hero']
  breadcrumbs?: Page['breadcrumbs'] | Resource['breadcrumbs']
}> = (props) => {
  const { hero, breadcrumbs } = props

  const { height, media, title, description, descriptionColor, breadcrumbColor, link } = hero
  let currentPath = '/'
  return (
    <div
      className={`w-full h-full ${height === 'min-h-screen' ? 'min-h-[450px] md:h-screen' : 'min-h-[300px] md:h-[80vh]'} relative`}
    >
      {media && typeof media === 'object' && (
        <React.Fragment>
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        </React.Fragment>
      )}

      <div className="w-full h-full relative container max-md:px-10 flex items-start sm:items-center justify-start">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="absolute top-10">
            <div
              className={cn(
                'flex items-center gap-x-1 font-mono uppercase text-sm sm:text-[12px] font-bold',
                breadcrumbColor,
              )}
            >
              <Link href={currentPath}>Home</Link>
              {breadcrumbs.map((item, id) => {
                const slug = formatSlug(item.label)
                currentPath += slug + '/'
                return (
                  <>
                    <RightArrow />
                    <Link key={id} href={currentPath}>
                      {item.label}
                    </Link>
                  </>
                )
              })}
            </div>
          </div>
        )}
        <div className="w-full max-sm:mt-16">
          {title && (
            <RichText
              className={cn('mb-6 max-sm:prose-h1:text-[44px] max-sm:max-w-[280px] mx-0')}
              data={title}
              enableGutter={false}
            />
          )}
          <p className={`text-md  ${descriptionColor} mb-4 lg:max-w-xl md:max-w-96 lg:text-[20px]`}>
            {description}
          </p>
          {link && <CMSLink {...link} />}
        </div>
      </div>
    </div>
  )
}
