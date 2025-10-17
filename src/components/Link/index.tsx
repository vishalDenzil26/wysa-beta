'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React, { startTransition } from 'react'

import type { News, Page, Resource } from '@/payload-types'
import { UpRightArrow } from '../icons/up-right-arrow'
import { useProgressBar } from '../ui/progressbar'
import { useRouter } from 'next/navigation'

type CMSLinkType = {
  appearance?:
    | 'inline'
    | ButtonProps['variant']
    | 'primary-ghost-with-arrow'
    | 'secondary-ghost-with-arrow'
    | 'primary-only-arrow'
    | 'secondary-only-arrow'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'news' | 'resources'
    value: Page | News | Resource | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  onLinkClick?: () => void
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onLinkClick,
  } = props
  let progress = useProgressBar()
  let router = useRouter()
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' && reference?.relationTo !== 'resources' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        aria-label={label ?? ''}
        className={cn(className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={(e) => {
          e.preventDefault()
          progress.start()
          startTransition(() => {
            router.push(href || url || '')
            onLinkClick && onLinkClick()
            progress.done()
          })
        }}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }
  let btnAppearance = appearance
  let withArrow = false
  let onlyArrow = false
  let arrowAppearence = 'text-secondary'
  if (appearance === 'primary-ghost-with-arrow') {
    btnAppearance = 'primary-ghost'
    withArrow = true
  } else if (appearance === 'secondary-ghost-with-arrow') {
    btnAppearance = 'secondary-ghost'
    withArrow = true
  } else if (appearance === 'primary-only-arrow') {
    btnAppearance = 'outline-primary'
    arrowAppearence = 'text-primary hover:text-white'
    onlyArrow = true
  } else if (appearance === 'secondary-only-arrow') {
    btnAppearance = 'outline-secondary'
    arrowAppearence = 'text-secondary hover:text-white'
    onlyArrow = true
  }
  return (
    <Button
      asChild
      className={cn(
        className,
        onlyArrow && 'md:w-12 md:h-12 w-10 h-10 md:p-4 p-2',
        onlyArrow && arrowAppearence,
      )}
      size={size}
      variant={btnAppearance as ButtonProps['variant']}
    >
      <Link
        aria-label={label ?? ''}
        className={cn(className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={(e) => {
          e.preventDefault()
          progress.start()

          startTransition(() => {
            router.push(href || url || '')
            onLinkClick && onLinkClick()
            progress.done()
          })
        }}
      >
        {label && !onlyArrow && (
          <span
            className={cn(
              appearance === 'secondary-ghost-with-arrow' ? 'md:no-underline underline' : '',
            )}
          >
            {label}
          </span>
        )}
        {children && !onlyArrow && children}
        {withArrow && <UpRightArrow />}
        {onlyArrow && (
          <span className="text-lg">
            <UpRightArrow className="w-6 h-6" />
          </span>
        )}
      </Link>
    </Button>
  )
}
