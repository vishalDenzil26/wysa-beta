import { cn } from '@/utilities/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-md bg-gray-300 w-56 h-56', className)} {...props} />
  )
}

export { Skeleton }
