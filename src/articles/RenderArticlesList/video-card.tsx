import { VideoDialog } from '@/components/Dialogs/VideoDialog'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Media as MediaType } from '@/payload-types'
const VideoCard: React.FC<{
  media: string | MediaType
  title: string
  source: {
    url: string
    mimeType: string
  }
  duration: number
}> = ({ media, title, source, duration }) => {
  return (
    <VideoDialog src={source.url} mimeType={source.mimeType} title={title}>
      <div className="flex flex-col justify-between gap-4 font-mono cursor-pointer">
        <div className="space-y-2">
          <div className="h-56 lg:h-[24rem] sm:h-[20rem] w-full relative rounded-2xl overflow-hidden">
            <Media resource={media} imgClassName="object-cover" fill={true} />
          </div>
          <div>
            <small className="text-muted-foreground">{duration} min</small>
          </div>
          <div>
            <h3 className="prose font-medium text-xl text-primary">{title}</h3>
          </div>
        </div>
        <Button
          variant={'secondary-ghost'}
          className="p-0 gap-1 items-center h-auto w-max text-[10px] font-semibold"
        >
          Play
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </Button>
      </div>
    </VideoDialog>
  )
}

export default VideoCard
