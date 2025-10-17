import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { Button } from '@/components/ui/button'
import { RightArrow } from '@/components/icons/right-arrow'
import { MobileRightIcon } from '@/components/icons/mobile-right-icon'
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
    <Button
      className="rounded-full text-secondary max-md:p-2 max-md:h-10 max-md:w-10 hover:text-white w-14 h-14 p-4 border-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      variant={'outline-secondary'}
      {...restProps}
    >
      <MobileRightIcon className="h-3 w-3 md:h-5 md:w-5 rotate-180 md:hidden" />
      <RightArrow className="rotate-180 w-4 h-4 max-md:hidden" />
    </Button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button
      className="rounded-full text-secondary max-md:p-2 max-md:h-10 max-md:w-10 hover:text-white w-14 h-14 p-4 border-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      variant={'outline-secondary'}
      type="button"
      {...restProps}
    >
      <MobileRightIcon className="h-3 w-3 md:h-5 md:w-5 md:hidden" />
      <RightArrow className="w-4 h-4 max-md:hidden" />
    </Button>
  )
}
