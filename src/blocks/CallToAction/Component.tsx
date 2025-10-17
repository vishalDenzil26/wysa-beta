import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({
  links,
  title,
  description,
  width,
  height,
  rounded,
  backgroundColor,
  backgroundImage,
  mobileBackgroundImage,
  alignContent,
  justifyContent,
  contentWidth,
  verticalGutter,
  imageGroup,
  customClassNames,
  verticalPadding,
}) => {
  const alignContentOptions = {
    left: {
      outerCol: 'items-start',
      innerCol: 'items-start',
      text: 'text-left',
    },
    center: {
      outerCol: 'items-center',
      innerCol: 'items-center',
      text: 'text-center',
    },
    right: {
      outerCol: 'items-end',
      innerCol: 'items-start',
      text: 'text-left',
    },
  }

  return (
    <div
      className={cn(
        { container: width === 'default' },
        width,
        height,
        verticalGutter,
        'max-sm:h-full',
        customClassNames,
      )}
    >
      <div
        className={cn(
          backgroundColor,
          'w-full h-full relative overflow-hidden',
          rounded,
          verticalPadding,
        )}
      >
        {backgroundImage && (
          <Media
            fill
            imgClassName="object-cover"
            className={cn(mobileBackgroundImage && 'hidden lg:block')}
            resource={backgroundImage}
          />
        )}
        {mobileBackgroundImage && (
          <Media
            fill
            imgClassName="object-cover"
            className={cn('block lg:hidden')}
            resource={mobileBackgroundImage}
          />
        )}
        <div
          className={cn(
            'relative z-2 flex flex-col w-full h-full',
            alignContentOptions[alignContent ?? 'left'].outerCol,
            // height === 'h-screen' ? 'px-8 sm:px-24' : 'px-4 sm:px-8',
            width === 'w-full' ? 'container' : 'px-4 sm:px-8',
          )}
        >
          <div
            className={cn(
              'flex flex-col h-full max-sm:w-full',
              contentWidth,
              justifyContent,
              alignContentOptions[alignContent ?? 'left'].innerCol,
            )}
          >
            <div className={cn(alignContentOptions[alignContent ?? 'left'].text)}>
              {title && (
                <RichText data={title} enableGutter={false} className="prose-headings:mb-1" />
              )}
            </div>
            <div
              className={cn(
                'max-w-full sm:max-w-[38rem] text-center',
                alignContentOptions[alignContent ?? 'left'].text,
              )}
            >
              {description && (
                <RichText className={cn('mb-2.5')} data={description} enableGutter={false} />
              )}
              {imageGroup && imageGroup.length > 0 && (
                <div className="w-full flex items-start justify-between mt-8 mb-6 ">
                  {imageGroup.map((image) => {
                    return (
                      <div
                        key={image.id}
                        className="flex  items-center first:justify-start first:ps-4 md:first:ps-6 justify-center last:justify-end w-48 h-auto"
                      >
                        <div className=" flex flex-col items-center gap-y-3 h-auto">
                          <Media resource={image.image} imgClassName="w-14 h-14 sm:w-20 sm:h-20" />
                          <strong className="text-sm">{image.label}</strong>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8 w-max">
              {(links || []).map(({ link }) => {
                return <CMSLink key={link?.label} size="lg" {...link} className="text-[16px]" />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
