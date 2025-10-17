import React from 'react'
import { EmbedBlock as EmbedBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
type Props = {
  className?: string
} & EmbedBlockType

const colorVariants = {
  primary: {
    backgroundColor: 'bg-primary-foreground',
  },
  secondary: {
    backgroundColor: 'bg-secondary-foreground',
  },
}

export const EmbedBlock: React.FC<Props> = ({
  className,
  sourceURL,
  width,
  height,
  colorVariant,
  enableIntro,
  introContent,
}) => {
  return (
    <div className="px-6 lg:px-0">
      <div
        className={cn(
          'container lg:max-w-[48rem] py-12 px-20 rounded-[24px] relative mb-20',
          colorVariants[colorVariant].backgroundColor,
        )}
      >
        {enableIntro && introContent && (
          <RichText
            className="mb-6 text-primary prose-h3:mb-0 max-w-sm mx-0"
            data={introContent}
            enableGutter={false}
          />
        )}
        <iframe
          className={cn(className)}
          src={sourceURL}
          width={width ?? '100%'}
          height={height ?? 500}
          allowTransparency={true}
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  )
}
