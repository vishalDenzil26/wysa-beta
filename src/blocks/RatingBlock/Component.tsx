import { cn } from '@/utilities/cn'
import { RatingBlock as RatingBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Star } from '@/components/icons/star'

export const RatingBlock: React.FC<RatingBlockType> = ({ rateCount, feedback, source, link }) => {
  return (
    <div
      className={cn(
        'w-full h-full rounded-2xl overflow-hidden px-5 md:px-10 py-5 md:py-20  bg-secondary-foreground',
      )}
    >
      <div className="flex items-end justify-between h-full w-full">
        <div className={'flex flex-col justify-between gap-y-3 h-full w-full'}>
          <div className="flex gap-1 items-center">
            {Array.from(new Array(rateCount)).map((_, id) => {
              return <Star key={id} className="fill-secondary stroke-none" />
            })}
          </div>
          <RichText data={feedback} enableGutter={false} className="prose:mx-none" />
          <p className="text-primary text-sm font-bold">{source}</p>
        </div>
        <div>{link && <CMSLink {...link} />}</div>
      </div>
    </div>
  )
}
