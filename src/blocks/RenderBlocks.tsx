import React, { Fragment } from 'react'

import type { Page, Resource } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DynamicGridBlock } from '@/blocks/DynamicGridBlock/Component'
import { FeedbackBlock } from '@/blocks/FeedbackBlock/Component'
import { OnlyTextBlock } from '@/blocks/Content/onlyText/Component'
import { DynamicContentBlock } from '@/blocks/Content/dynamic/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { EmbedBlock } from './EmbedBlock/Component'
import { CategoryTabsBlock } from './CategoryTabsBlock/Component'
import { VideoBlock } from './VideoBlock/Component'
import { EditorBlock } from './Content/editor/Component'
import { InteractiveChatBlock } from './InteractiveChatBlock/Component'
import { ImageSliderBlock } from './ImageSliderBlock/Component'
import { FeaturedBlogBlock } from './FeaturedBlogBlock/Component'
import { BlogListingBlock } from './BlogListing/Component'

const blockComponents = {
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  dynamicGridBlock: DynamicGridBlock,
  cta: CallToActionBlock,
  feedBackBlock: FeedbackBlock,
  onlyTextBlock: OnlyTextBlock,
  dynamicContentBlock: DynamicContentBlock,
  faqBlock: FAQBlock,
  embedBlock: EmbedBlock,
  categoryTabsBlock: CategoryTabsBlock,
  videoBlock: VideoBlock,
  editorBlock: EditorBlock,
  interactiveChatBlock: InteractiveChatBlock,
  imageSliderBlock: ImageSliderBlock,
  featuredBlogBlock: FeaturedBlogBlock,
  blogListingBlock: BlogListingBlock,
}

export const RenderBlocks: React.FC<{
  // @ts-ignore // TODO: Fix this
  blocks: Page['layout'][0][] | Resource['layout'][0][]
  options?: {
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}> = (props) => {
  const { blocks, options } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} options={options} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
