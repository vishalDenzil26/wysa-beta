import RichText from '@/components/RichText'
import EmblaCarousel from '@/components/ui/embla-crousel'
import { FeedbackBlock as FeedbackBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  className?: string
} & FeedbackBlockType

export const FeedbackBlock: React.FC<Props> = ({
  title,
  subText,
  feedBackContent,
  backgroundColor,
}) => {
  return (
    <div className="w-full h-full">
      <div className={cn(backgroundColor, 'w-full h-full px-4 sm:px-14 py-12 rounded-2xl')}>
        <div className={'flex flex-col items-center justify-center'}>
          <div className="text-primary text-center prose max-sm:prose-headings:text-4xl">
            <h2>{title}</h2>
          </div>
          <div className="mt-2 text-center prose max-w-xl">
            <p>{subText}</p>
          </div>
          <EmblaCarousel>
            {feedBackContent?.map((item, id) => {
              return (
                <div key={id} className="embla__slide">
                  <div className="flex flex-col items-center justify-center w-full">
                    <svg
                      className="my-4 w-6 h-6"
                      width="36.000000"
                      height="33.000000"
                      viewBox="0 0 36 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <g style={{ mixBlendMode: 'normal' }}>
                        <path
                          id="Path 1"
                          d="M10.19 33C8.71 19.25 12.35 11.68 18.83 2.52L12.58 0C3.94 7.33 -1.07 19.47 0.19 33L10.19 33ZM27.36 33C25.99 19.25 29.52 11.68 36 2.52L29.86 0C21.1 7.33 16.1 19.47 17.35 33L27.36 33Z"
                          fill="#E7542C"
                          fill-opacity="1.000000"
                          fill-rule="nonzero"
                        />
                      </g>
                    </svg>
                    {item.quote && (
                      <RichText
                        className="prose-p:font-semibold md:prose-p:text-[20px] max-w-full text-center"
                        data={item.quote}
                      />
                    )}
                    <div className="font-bold mt-6 text-primary font-mono">
                      <span>{item.consumerType}</span>
                      <span>, {item.origin}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </EmblaCarousel>
        </div>
      </div>
    </div>
  )
}
