import { VideoDialog } from '@/components/Dialogs/VideoDialog'
import { Media } from '@/components/Media'
import { VideoBlock as VideoBlockType } from '@/payload-types'

export const VideoBlock: React.FC<VideoBlockType> = ({
  thumbNail,
  title,
  sourceFile,
  mobileThumbNail,
}) => {
  return (
    <VideoDialog src={sourceFile['url'] as string} mimeType={sourceFile['mimeType']} title={title}>
      <div className="w-full h-full">
        <div className="h-full w-full relative rounded-2xl overflow-hidden">
          <Media
            resource={thumbNail}
            imgClassName="object-cover"
            fill={true}
            className="hidden md:block"
          />
          <Media
            resource={mobileThumbNail ?? thumbNail}
            imgClassName="object-cover"
            fill={true}
            className="md:hidden"
          />
        </div>
      </div>
    </VideoDialog>
  )
}
