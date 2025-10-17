/* eslint-disable react/button-has-type */
import type { ButtonProps } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center bg-muted py-10 rounded-xl', className)}
    role="navigation"
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul className={cn('flex flex-row items-center gap-3', className)} ref={ref} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li className={cn('', className)} ref={ref} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: 'ghost',
      }),
      'rounded-[10px] w-8 h-12 font-bold',
      isActive
        ? 'bg-secondary-foreground hover:bg-secondary-foreground text-secondary hover:text-secondary'
        : 'bg-none hover:bg-none text-secondary hover:text-secondary',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn('gap-1 ml-2.5 w-12 text-primary', className)}
    size="default"
    {...props}
  >
    <ChevronLeft className="h-8 w-8" />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn('gap-1 mr-2.5 w-12 text-primary', className)}
    size="default"
    {...props}
  >
    <ChevronRight className="h-8 w-8" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center text-secondary', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
