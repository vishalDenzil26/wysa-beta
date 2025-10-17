import React from 'react'
import RichText from '@/components/RichText'

import type { EditorBlock as EditorBlockType } from '@/payload-types'

type Props = EditorBlockType

export const EditorBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { content } = props
  return (
    <div className="container my-16 flex items-center justify-center">
      {content && <RichText data={content} enableGutter={false} />}
    </div>
  )
}
