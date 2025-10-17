'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './nav-buttons'
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'
type PropType = {
  children: React.ReactNode
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoPlay()])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="grid grid-cols-1 sm:grid-cols-[0.1fr_1fr_0.1fr] items-center h-full w-full sm:gap-x-4 relative">
        <div className="relative hidden sm:block">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{children}</div>
        </div>
        <div className="relative hidden sm:block">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="absolute bottom-3 left-0 w-full flex items-center justify-between sm:hidden px-6 sm:px-8">
          <div className="relative">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          </div>
          <div className="relative">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
