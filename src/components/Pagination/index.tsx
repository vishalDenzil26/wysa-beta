'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/cn'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import qs from 'qs'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  collection: 'news' | 'resources' | 'videos' | 'reports'
}> = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  let existingSearchParams = ''

  for (const [key, value] of searchParams.entries()) {
    if (key !== 'pageNumber') {
      if (existingSearchParams !== '') {
        existingSearchParams += '&'
      }
      existingSearchParams += qs.stringify({ [key]: value })
    }
  }

  if (existingSearchParams !== '') {
    existingSearchParams += '&'
  }

  const { className, page, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const basePath = `/${props.collection}?${existingSearchParams}pageNumber=`

  const navigateToPage = (pageNumber: number) => {
    router.push(`${basePath}${pageNumber}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                navigateToPage(page - 1)
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  navigateToPage(page - 1)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                navigateToPage(page)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  navigateToPage(page + 1)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                navigateToPage(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
