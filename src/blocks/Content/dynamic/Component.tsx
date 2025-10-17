import React from 'react'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { DynamicContentBlock as DynamicContentBlockType } from '@/payload-types'

type Props = DynamicContentBlockType

export const DynamicContentBlock: React.FC<
  Props & {
    id?: string
  }
> = ({
  title,
  description,
  width,
  height,
  rounded,
  backgroundColor,
  backgroundImage,
  mobileBackgroundImage,
  alignContent,
  contentWidth,
  verticalGutter,
  imageGroup,
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
        // 'max-sm:h-full max-lg:px-0',
      )}
    >
      <div
        className={cn(
          backgroundColor,
          'w-full h-full py-14 relative overflow-hidden',
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
            height === 'h-screen' ? 'px-8 sm:px-24' : 'px-4 sm:px-8',
          )}
        >
          <div
            className={cn(
              'flex flex-col h-full max-sm:w-full',
              contentWidth,
              alignContentOptions[alignContent ?? 'left'].innerCol,
            )}
          >
            <div className={cn(alignContentOptions[alignContent ?? 'left'].text)}>
              {title && (
                <RichText
                  className={cn('mb-4 prose-headings:my-0')}
                  data={title}
                  enableGutter={false}
                />
              )}
            </div>
            <div
              className={cn(
                'max-w-full sm:max-w-[38rem] text-center',
                alignContentOptions[alignContent ?? 'left'].text,
              )}
            >
              {description && (
                <RichText
                  className={cn('mb-2 prose-p:my-0 prose-p:text-lg')}
                  data={description}
                  enableGutter={false}
                />
              )}
              {imageGroup && imageGroup.length > 0 && (
                <div className="w-full flex items-center justify-between mt-8 mb-6 ">
                  {imageGroup.map((image) => {
                    return (
                      <div
                        key={image.id}
                        className="flex flex-col first:items-start first:ps-4 md:first:ps-6 items-center last:items-end justify-center gap-y-2 w-48 h-auto"
                      >
                        <div className=" flex flex-col items-center gap-y-3">
                          <Media resource={image.image} imgClassName="w-14 h-14 sm:w-20 sm:h-20" />
                          <strong className="text-sm">{image.label}</strong>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
