import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { Page } from '@/payload-types'

import { Media } from '../../components/Media'
// @ts-ignore // TODO: Fix this
type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    mobileMedia,
    position = 'default',
    rounded = 'none',
    staticImage,
    disableInnerContainer,
    customImageClassName,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'w-full h-full',
        {
          container: position === 'default' && enableGutter,
        },
        className,
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative w-full h-full">
          <Media
            resource={media}
            src={staticImage}
            className={cn(mobileMedia && 'hidden lg:block')}
            imgClassName={cn('w-full h-full object-cover', imgClassName, customImageClassName)}
          />
          {mobileMedia && (
            <Media
              resource={mobileMedia}
              className={cn(customImageClassName, 'block lg:hidden')}
              imgClassName={cn('w-full h-full object-cover', imgClassName, customImageClassName)}
            />
          )}
        </div>
      )}
      {position === 'default' && (
        <>
          <Media
            imgClassName={cn(
              imgClassName,
              rounded,
              customImageClassName,
              mobileMedia && 'hidden lg:block',
            )}
            resource={media}
            src={staticImage}
          />
          {mobileMedia && (
            <Media
              imgClassName={cn(imgClassName, rounded, customImageClassName, 'block lg:hidden')}
              resource={media}
              src={staticImage}
            />
          )}
        </>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: position === 'fullscreen' && !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
