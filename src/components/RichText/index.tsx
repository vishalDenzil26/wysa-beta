import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  CallToActionBlock as CTABlockProps,
  DynamicGridBlock as DynamicGridBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/cn'
import { JSX } from 'react'
import { DynamicGridBlock } from '@/blocks/DynamicGridBlock/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | CodeBlockProps | DynamicGridBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const textColorMap = {
  PRIMARY: 'text-primary',
  SECONDARY: 'text-secondary',
  LIGHT: 'text-white',
  DEFAULT: 'text-foreground',
}

const highlightColorMap = {
  secondary: 'bg-secondary text-white px-2 py-1',
  DEFAULT: 'bg-none',
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => {
      console.log(node)

      return (
        <MediaBlock
          imgClassName="m-0"
          {...node.fields}
          position={node.fields.position}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      )
    },
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    dynamicGridBlock: ({ node }) => <DynamicGridBlock {...node.fields} />,
  },
  heading: ({ node }) => {
    const Tag = node.tag as keyof JSX.IntrinsicElements
    return (
      // @ts-ignore
      <Tag id={node.id} className="scroll-mt-10">
        {node.children.map((child: any, id: number) => {
          const color = child.fields?.color ?? 'DEFAULT'
          const highlight = child.fields?.highlightType ?? 'DEFAULT'
          const className = `${textColorMap[color]} ${highlightColorMap[highlight]}`
          return (
            child.text && (
              <span key={id} className={className}>
                {child.text}
              </span>
            )
          )
        })}
      </Tag>
    )
  },
  textColor: ({ node }) => {
    if (node.text) {
      const color = node.fields?.color ?? 'DEFAULT'
      const className = `${textColorMap[color]}`
      if (node.tag) {
        const Tag = node.tag as keyof JSX.IntrinsicElements
        return <Tag className={className}>{node.text}</Tag>
      }
      return <span className={className}>{node.text}</span>
    }
    return
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        'text-foreground',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
