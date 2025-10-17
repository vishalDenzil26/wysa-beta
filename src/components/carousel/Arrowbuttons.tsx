'use client'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev disabled:opacity-60 disabled:scale-95 appearance-none touch-manipulation flex pointer p-0 m-0 h-[3.6rem] w-[3.6rem] z-10 justify-center items-center rounded-full opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300"
      type="button"
      {...restProps}
    >
      {children ? (
        children
      ) : (
        <svg
          width="36"
          height="36"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <rect
              x="71.5"
              y="71.5"
              width="71"
              height="71"
              rx="35.5"
              transform="rotate(-180 71.5 71.5)"
              stroke="white"
            />
            <path
              d="M31.8284 37.0001L37.1924 42.3641L35.7782 43.7783L28 36.0001L35.7782 28.222L37.1924 29.6362L31.8284 35.0001H44V37.0001H31.8284Z"
              fill="white"
            />
          </g>
        </svg>
      )}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next disabled:opacity-60 disabled:scale-95 appearance-none touch-manipulation flex pointer p-0 m-0 h-[3.6rem] w-[3.6rem] z-10 justify-center items-center rounded-full opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300"
      type="button"
      {...restProps}
    >
      {children ? (
        children
      ) : (
        <svg
          className="embla__button__svg"
          width="36"
          height="36"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="white" />
          <path
            d="M40.1716 34.9999L34.8076 29.6359L36.2218 28.2217L44 35.9999L36.2218 43.778L34.8076 42.3638L40.1716 36.9999H28V34.9999H40.1716Z"
            fill="white"
          />
        </svg>
      )}
    </button>
  )
}
