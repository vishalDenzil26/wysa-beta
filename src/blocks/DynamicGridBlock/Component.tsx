import type { DynamicGridBlock as DynamicGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { MediaBlock } from '../MediaBlock/Component'
import { CallToActionBlock } from '../CallToAction/Component'
import { DynamicContentBlock } from '../Content/dynamic/Component'
import { FeedbackBlock } from '../FeedbackBlock/Component'
import { RatingBlock } from '../RatingBlock/Component'
import { VideoBlock } from '../VideoBlock/Component'

type Props = {
  className?: string
} & DynamicGridBlockProps

function getGridLayout(
  rows?: number | null,
  columns?: number | null,
  rowGap?: string | null,
  colGap?: string | null,
): string {
  const rowClasses = rows ? `grid-rows-${rows}` : 'grid-rows-1'
  const colClasses = columns ? `grid-cols-${columns}` : 'grid-cols-1'
  const colGapClasses = colGap ? colGap : ''
  const rowGapClasses = rowGap ? rowGap : ''
  return `grid w-full h-full ${rowClasses} ${colClasses} ${colGapClasses} ${rowGapClasses}`
}

export const DynamicGridBlock: React.FC<Props> = ({ className, gridLayout, gridItems }) => {
  const blockComponents = {
    mediaBlock: MediaBlock,
    cta: CallToActionBlock,
    dynamicContentBlock: DynamicContentBlock,
    feedBackBlock: FeedbackBlock,
    ratingBlock: RatingBlock,
    videoBlock: VideoBlock,
  }
  return (
    <div
      className={cn(
        className,
        'w-full mx-auto',
        {
          container: gridLayout?.['position'] === 'default',
        },
        gridLayout?.verticalGutter,
      )}
    >
      <div className={cn(gridLayout?.['background'], gridLayout?.['rounded'])}>
        <div
          className={cn(
            'mx-auto 2xl:max-w-[1260px]',
            getGridLayout(
              gridLayout?.['rows'],
              gridLayout?.['columns'],
              gridLayout?.columnsGap,
              gridLayout?.rowsGap,
            ),
            gridLayout?.['grid-padding-x'],
            gridLayout?.['grid-padding-y'],
            gridLayout?.customClassNames,
          )}
        >
          {gridItems?.map(({ gridItemGroup }, id) => {
            return (
              <div
                key={id}
                className={cn(
                  'w-full h-full',
                  gridLayout?.['alignItems'],
                  gridLayout?.['justifyContent'],
                  gridItemGroup?.customClassNames,
                )}
              >
                {gridItemGroup?.gridItemBlock?.map((block, block_id) => {
                  const { blockType } = block

                  if (blockType && blockType in blockComponents) {
                    const Block = blockComponents[blockType]

                    if (Block) {
                      // @ts-ignore
                      return <Block key={block_id} {...block} />
                    }
                  }
                  return null
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
