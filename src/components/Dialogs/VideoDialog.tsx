'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  src: string
  title: string
  mimeType: string
  controls?: boolean
  autoPlay?: boolean
}

export function VideoDialog({
  children,
  src,
  title,
  mimeType,
  controls = true,
  autoPlay = true,
}: Props) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (open) {
      const playPromise = videoRef.current?.play()
      if (playPromise) {
        playPromise
          .then(() => console.log('Video playback started'))
          .catch((error) => console.error('Video playback failed:', error))
      }
    } else {
      videoRef.current?.pause()
      //      videoRef.current?.currentTime = 0
    }
  }, [open])

  return (
    <Dialog onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild aria-label={title}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl rounded-3xl">
        <DialogTitle>{title}</DialogTitle>
        <div className="w-full h-[60vh] relative">
          <div className="absolute inset-0 w-full h-full">
            <video
              controls={controls}
              autoPlay={autoPlay}
              title={title}
              className="w-full h-full"
              ref={videoRef}
              preload="auto"
            >
              <source src={src} type={mimeType} />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
