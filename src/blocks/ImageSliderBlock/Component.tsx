'use client'
import React, { useEffect } from 'react'
import type { ImageSliderBlock as ImageSliderBlockProps } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Media } from '@/components/Media'

const options: EmblaOptionsType = {
  loop: true,
  align: 'center',
}

export const ImageSliderBlock: React.FC<ImageSliderBlockProps> = (props) => {
  const slides = props.sliderImages
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
    }),
  ])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    return () => {
      if (autoScroll.isPlaying()) {
        autoScroll.stop()
      }
    }
  }, [emblaApi])

  return (
    <div className="relative container flex justify-center ">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y py-16 flex-nowrap">
          {slides &&
            slides.map((item, index) => (
              <div
                className="flex-shrink-0 w-auto max-h-32 flex  rounded-2xl justify-center items-center relative mx-6 md:mx-20"
                key={index}
              >
                <Media resource={item.image} imgClassName="h-full max-h-32 object-contain" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
