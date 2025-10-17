import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { BlogCategory, Media as MediaType } from '@/payload-types'
import Link from 'next/link'

export const BlogCard: React.FC<{
  media: string | MediaType
  title: string
  category: BlogCategory[]
  path: string
  duration: number
}> = ({ media, title, category, path, duration }) => {
  return (
    <Link href={path}>
      <div className="flex flex-col justify-between gap-4 font-mono">
        <div className="space-y-1 lg:space-y-2">
          <div className="h-56 lg:h-[24rem] sm:h-[20rem] w-full relative rounded-2xl overflow-hidden">
            <Media resource={media} imgClassName="object-cover" fill={true} />
          </div>
          <div>
            <small className="text-sm font-mono text-muted-foreground font-medium">
              {category.map((item, i) => (
                <span key={i} className="inline-flex items-center me-1 uppercase">
                  {item['title']}
                  {i !== category.length - 1 && <span>, </span>}
                </span>
              ))}
              {' / '}
              {duration} min read
            </small>
          </div>
          <div>
            <h3 className="prose font-medium text-xl md:text-3xl text-primary">{title}</h3>
          </div>
        </div>
        <Button
          variant={'secondary-ghost'}
          className="p-0 gap-1 items-center h-auto w-max text-[12px] md:text-xs font-semibold"
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
    </Link>
  )
}
