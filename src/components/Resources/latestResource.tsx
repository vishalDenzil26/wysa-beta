import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Category, Media as MediaType } from '@/payload-types'

export const LatestResource: React.FC<{
  media: string | MediaType
  title: string
  category: string | Category
}> = ({ media, title, category }) => {
  return (
    <div className="grid grid-cols-2 gap-x-24 w-full items-center max-w-4xl mx-auto font-mono">
      <div className="space-y-2">
        <div>
          <p className="prose text-secondary text-lg font-medium">Latest News</p>
        </div>
        <div>
          <small className="text-muted-foreground">{category?.['title']} / 4 min read</small>
        </div>
        <div>
          <h2 className="prose font-medium text-3xl text-primary">{title}</h2>
        </div>
        <Button
          variant={'secondary-ghost'}
          className="p-0 gap-1 items-center h-auto w-max text-[10px] font-semibold"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
        </Button>
      </div>
      <div className="h-[30rem] w-full relative rounded-2xl overflow-hidden">
        <Media resource={media} imgClassName="object-cover" fill={true} />
      </div>
    </div>
  )
}
