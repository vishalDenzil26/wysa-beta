import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { OnlyTextBlock as OnlyTextBlockType } from '@/payload-types'

type Props = OnlyTextBlockType

export const OnlyTextBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { width, richText, verticalGutter } = props

  return (
    <div className={cn('container flex items-center justify-center', verticalGutter)}>
      <div className={cn(width, 'max-sm:w-full')}>
        {richText && (
          <RichText className="text-center font-bold" data={richText} enableGutter={false} />
        )}
      </div>
    </div>
  )
}
