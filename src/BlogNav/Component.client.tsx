'use client'

import React, { startTransition, useState, useEffect, useRef } from 'react'
import type { BlogNav, BlogCategory } from '@/payload-types'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useProgressBar } from '@/components/ui/progressbar'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/carousel/Arrowbuttons'
import { useDotButton } from '@/components/carousel/DotButtons'

export default function BlogNavClient({ categories }: { categories: BlogNav['categories'] }) {
  const progress = useProgressBar()
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const [shouldCenter, setShouldCenter] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (slug: string) => {
    progress.start()
    startTransition(() => {
      router.push('/blogs/category/' + slug)
      progress.done()
    })
  }
  const options: EmblaOptionsType = {
    align: 'start',
    loop: false,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex } = useDotButton(emblaApi)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth
        setShouldCenter(scrollWidth <= clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [categories])

  const { onPrevButtonClick, onNextButtonClick, prevBtnDisabled, nextBtnDisabled } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="bg-primary relative w-full">
      <div className="py-4 overflow-hidden z-2 mx-16" ref={emblaRef}>
        {/* This div is the embla__container */}
        <div
          className="flex gap-2 will-change-transform  me-16"
          ref={containerRef}
          style={{ justifyContent: shouldCenter ? 'center' : 'flex-start' }}
        >
          {categories?.map((item, index) => {
            const category = item.category as BlogCategory
            return (
              <Link
                key={category.id || `${category.slug}-${index}`}
                href={'/blogs/category/' + category.slug}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(category['slug'] as string)
                }}
                className={`text-white flex-shrink-0 max-md:px-3 px-4 py-2 max-md:border-b-2 border-b-4 max-md:text-[12px] transition-all duration-200 uppercase ${
                  lastSegment === category.slug ? 'border-white' : 'border-transparent'
                }`}
              >
                {category.title}
              </Link>
            )
          })}
        </div>
      </div>
      {!shouldCenter && (
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 hover:scale-105 cursor-pointer  ${prevBtnDisabled ? 'opacity-75' : 'opacity-100'}`}
          aria-label="Navigate to previous banner"
        />
      )}
      {!shouldCenter && (
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 hover:scale-105 cursor-pointer  ${nextBtnDisabled ? 'opacity-75' : 'opacity-100'}`}
          aria-label="Navigate to next banner"
        />
      )}
    </div>
  )
}
